const express = require('express');
const router = express.Router();
const pool = require('./pool.js');


//getting the orders in the waiter view
router.get("/orders", (req, res) => {
    pool.query("select * from orders where status='open'")
        .then(result => {
            res.json(result.rows);
        })
        .catch(err => {
            res.status(404).json({
                "message": "Server error",
            });
        });
})

router.get("/items/:id", (req, res) => {
    pool.query("select * from menuitems where itemid = $1", [req.params.id])
        .then(result => {
            res.json(result.rows);
        })
        .catch(err => {
            res.status(404).json({
                "message": "Server error",
            });
        })
})

router.get("/orders/:id", (req, res) => {
    pool.query("select itemid, number, status, comment from orderitems where orderid = $1", [req.params.id])
        .then(result => {
            res.json(result.rows);
        })
        .catch(err => {
            res.status(404).json({
                "message": "Server error",
            });
        })
})

router.get("/consultations", (req, res) => {
    pool.query("select * from consultations where status = 'open'")
        .then(result => {
            res.json(result.rows);
        })
        .catch(err => {
            res.status(404).json({
                "message": "Server error",
            });
        })
})

router.put("/consultations/:id", (req, res) => {
    console.log(req.params.id);
    pool.query("update consultations set status = 'processed' where id = $1", [req.params.id])
        .then(result => {
            res.json({
                "message": "status updated successfully",
                rowsUpdated: result.rowCount
            })
        })
        .catch(err => {
            res.status(404).json({
                "message": "Server error",
            });
        }
        );
})

router.delete("/consultations/:id", (req, res) => {
    pool.query("delete from consultations where id = $1", [req.params.id])
        .then(result => {
            res.json({
                "message": "item deleted",
                rowsUpdated: result.rowCount
            })
        })
        .catch(err => {
            res.status(404).json({
                "message": "Server error",
            });
        });
})

const itemQuery =
    `select menuitems.title, menuitems.description, orderitems.number, orderitems.status, orderitems.comment, orders.tableid
from menuitems
inner join orderitems on menuitems.itemid=orderitems.itemid
inner join orders on orders.orderid=orderitems.orderid
where orderitems.status = $1`

router.get("/items", (req, res) => {
    pool.query(itemQuery, ["ready for pickup"])
        .then(result => {
            res.json(result.rows)
        })
        .catch(err => {
            res.status(404).json({
                "message": "Server error",
            });
        })
})

router.get("/itemspickups", (req, res) => {
    pool.query(itemQuery, ["in transit"])
        .then(result => {
            res.json(result.rows)
        })
        .catch(err => {
            res.status(404).json({
                "message": "Server error",
            });
        })
})

router.put("/items/:id", (req, res) => {
    pool.query("update orderitems set status = $2 where number = $1", [req.params.id, req.body.status])
        .then(result => {
            res.json(result.rows)
        })
        .catch(err => {
            res.status(404).json({
                "message": "Server error",
            });
        })
})

router.get("/users", (req, res) => {
    pool.query("select * from users where 'Waiter' = any(role)")
        .then(result => {
            res.json(result.rows)
        })
        .catch(err => {
            res.status(404).json({
                "message": "Server error",
            });
        })
})


module.exports = router;