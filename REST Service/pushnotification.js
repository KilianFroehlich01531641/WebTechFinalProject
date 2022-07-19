const express = require('express');
const router = express.Router();
const pool = require('./pool.js');


const webpush = require("web-push");

const publicKey = process.env.publicKey;
const privateKey = process.env.privateKey;

webpush.setVapidDetails(
	"mailto:example@test.com",
	publicKey,
	privateKey
);

let payload ={
	"notification": {
		"body": "New item ready to pickup",
		"title": "Order Notification",
	}
};

//PUSHAPI
// router.post("/subscribe", (req, res)=>{
// 	pool.query("insert into subscriptions values($1, $2, $3)", [req.body.endpoint, req.body.expirationTime, req.body.keys])
// 	.then(result=>{
// 		res.send({
// 			message: "Subscription added to DB",
// 		});
// 	})
// 	.catch(err=>{
// 		res.send(err);
// 	});
// })

router.post("/subscribe", async (req, res) => {
    try {
        const client = await pool.connect()
        await client.query('BEGIN')
        let select = await client.query('select * from subscriptions where endpoint = $1 and keys = $2', [req.body.endpoint, req.body.keys])
        if (select.rowCount === 0) {
            await client.query("insert into subscriptions values($1, $2, $3)", [req.body.endpoint, req.body.expirationTime, req.body.keys])
            await client.query('COMMIT').then(result => {
                res.send({
                    message: "Subscription added to DB",
                });
            }).catch(err => {
                res.status(406).json({
					"message": "Subcription not added to the DB",
				});
            });
        } else {
            await client.query('ROLLBACK')
        res.send({
            message: "Subscription could not be added to DB",
        });
        }

    } catch (err) {
        res.status(406).json({
			"message": "Subcription not added to the DB",
		});
    }
})

router.post("/message", (req, res)=>{
	pool.query("select * from subscriptions", [])
	.then(result=>{
		console.log(req.body);
		payload = {
			"notification": {
				"body": "New " + req.body.itemname + " ready to pickup",
				"title": "Order Notification",
			}
		}
		result.rows.forEach(element=>{
			element.keys = JSON.parse(element.keys);
			console.log((element));
			webpush.sendNotification(element, JSON.stringify(payload))
			.catch(err=>{
				//managing the updating of the expired subs is a bit much for this course so I just delete them
				pool.query("delete from subscriptions where endpoint = $1", [err.endpoint]);
			});
		});
		res.send({
			"message": "Messages have been send.",
		});
	})
	.catch(err=>{
		res.status(404).json({
			"message": "No messages were broadcastet.",
		});
	});
})


module.exports = router;