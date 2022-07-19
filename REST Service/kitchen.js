const express = require('express');
const router = express.Router();
const pool = require('./pool.js');


// router.get("/", (req, res, next) => { console.log("kitchen"); next() })

const qGetMenuItems = `
SELECT *
FROM menuitems
ORDER BY itemid asc
`

const qGetMenuCategories = `
SELECT *
FROM menucategories
`

const qToggleMenuItemStatus = `
UPDATE menuitems
SET status =
	CASE
		WHEN status = 'available' THEN 'not available'
		ELSE 'available'
	END
WHERE itemid = $1
`

const qPutMenuItemCategories = `
UPDATE menuitems
SET categories = $1
WHERE itemid = $2
`

const qGetOrders = `
select *
from orders
where status = 'open'
order by orderid asc
`

const qGetExtensiveOrders = `
select o.orderid, o.orderdate, o.tableid, o.totalamount,
array_agg(i.itemid order by number asc) as itemids,
array_agg(i.number order by number asc) as itemnumbers,
array_agg(i.status order by number asc) as itemstatuses,
array_agg(i.comment order by number asc) as itemcomments,
array_agg(m.title order by number asc) as itemtitles,
array_agg(m.price order by number asc) as itemprices,
array_agg(m.status order by number asc) as menuitemstatuses
from  orders o,
	  orderitems i,
	  menuitems m
where o.orderid = i.orderid
and i.itemid = m.itemid
and i.status in ('ordered', 'in production')
and o.status = 'open'
group by o.orderid, o.orderdate, o.tableid, o.totalamount
order by o.orderdate asc
`

const qGetItems = `
select i.itemid, o.orderdate, o.orderid, i.number as itemNumber, i.status, i.comment, m.title, m.description,
m.price, s.arr as categories, m.allergens, m.status as menuItemStatus
from  orders o,
	  orderitems i,
	  menuitems m left join
	  (select u.itemid, array_agg(c.title order by c.title asc) as arr
	   from (select unnest(menuitems.categories), itemid
			 from menuitems) u,
	         menucategories as c
	   where u.unnest = c.categoryid
	   group by u.itemid
	   order by u.itemid asc) s
	   on s.itemid = m.itemid
where o.orderid = i.orderid
and i.itemid = m.itemid
and i.status in ('ordered', 'in production')
order by itemnumber
`

var qSetTargetMinusOne = `
update orderitems
set number = -1
where number = $1
`

var qIncrementBetweenNewAndOldPosition = `
update orderitems
set number = number + 1
where number >= $2 and number <= $1
`

var qDecrementBetweenNewAndOldPosition = `
update orderitems
set number = number - 1
where number >= $1 and number <= $2
`

var qSetTargetToNewPosition = `
update orderitems
set number = $1
where number = -1
`

var qSetComment = `
update orderitems
set comment = $2
where number = $1
`

var qSetOrderitemStatus = `
update orderitems
set status = $2
where number = $1
`


router.get("/menuitems", (req, res) => {
    pool.query(qGetMenuItems)
        .then((result) => res.json(result.rows)) //TODO how to assert right type?
        .catch((err) => res.status(404).json({
            "message": "Server error",
        }))
})

router.get("/menucategories", (req, res) => {
    pool.query(qGetMenuCategories)
        .then((result) => res.json(result.rows)) //how to assert right type?
        .catch((err) => res.status(404).json({
            "message": "Server error",
        }))
})

//update status
router.put("/menuitems/:id", (req, res) => {
    pool.query(qToggleMenuItemStatus, [req.params.id])
        .then((result) => res.json({
            "message": "status updated successfully",
            rowsUpdated: result.rowCount
        }))
        .catch((err) => res.status(404).json({
            "message": "Server error",
        }))
})

//update category
router.put("/menuitems/:id/categories", (req, res) => {
    pool.query(qPutMenuItemCategories, [req.body, req.params.id])
        .then((result) => res.json({
            "message": "categories updated successfully",
            rowsUpdated: result.rowCount
        }))
        .catch((err) => res.status(404).json({
            "message": "Server error",
        }))
})

router.get("/orders", (req, res) => {
    pool.query(qGetOrders)
        .then((result) => res.json(result.rows))
        .catch((err) => res.status(404).json({
            "message": "Server error",
        }))
})

router.get("/extensiveorders", (req, res) => {
    pool.query(qGetExtensiveOrders)
        .then((result) => res.json(result.rows))
        .catch((err) => res.status(404).json({
            "message": "Server error",
        }))
})

router.get("/items", (req, res) => {
    pool.query(qGetItems)
        .then((result) => res.json(result.rows))
        .catch((err) => res.status(404).json({
            "message": "Server error",
        }))
})

//set comment or status
router.put("/orderitems/:number", (req, res) => {
    if (req.body.comment || req.body.comment === "")
        pool.query(qSetComment, [req.params.number, req.body.comment])
            .then((result) => res.json(result.rows))
            .catch((err) => res.status(404).json({
            "message": "Server error",
        }))
    else if (req.body.status)
        pool.query(qSetOrderitemStatus, [req.params.number, req.body.status])
            .then((result) => res.json(result.rows))
            .catch((err) => res.status(404).json({
            "message": "Server error",
        }))
})

//TODO !! dont return err/stacktrace !!

//reorder orderitems
router.put("/items/reorder", async (req, res) => {
    let from = req.query.from;
    let to = req.query.to;
    if (from && to && from > 0 && to > 0) {
        if (from != to) {
            const client = await pool.connect()
            try {
                await client.query('BEGIN')
                await client.query(qSetTargetMinusOne, [from])
                await client.query(from > to ? qIncrementBetweenNewAndOldPosition : qDecrementBetweenNewAndOldPosition, [from, to])
                await client.query(qSetTargetToNewPosition, [to])
                await client.query('COMMIT')
                res.json({ message: "reordering succeeded" });
            } catch (e) {
                await client.query('ROLLBACK')
                res.json({ message: "reorder failed" });
                console.log(e);
            } finally {
                client.release()
            }
        } else {
            res.json({ message: "no rows were changed; item stays at its position" });
        }
    } else {
        res.status(400).json({ message: "invalid reorder query; use 'from' and 'to' parameters and assign positiv integer values" });
    }

})

module.exports = router;

// https://expressjs.com/en/5x/api.html#router