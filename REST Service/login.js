const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt'); //https://www.youtube.com/watch?v=rYdhfm4m7yg

const pool = require('./pool.js');
const jwt = require('jsonwebtoken');

// login route creating/returning a token on successful login
router.post('/', (req, res) => {

    let query = {
        text: 'select distinct * from users where name = $1 and $2 = any(role)',
        values: [req.body.user, req.body.role],
    };

    // issue query
    pool.query(query)
        .then(async results => {

            // handle no match (login failed)
            if (results.rowCount == 0) {
                res.status(401).json({ "message": "login failed" }) //no username with corresponding role
            }
            else {

                resultUser = results.rows[0];

                // creation of hash (-> registration)
                // let salt = await bcrypt.genSalt(10); //the more rounds are passed, the longer it will take
                // let hashedPassword = await bcrypt.hash("enrico", salt);
                // console.log(hashedPassword)

                if (await bcrypt.compare(req.body.password, resultUser.password)) {

                    const token = jwt.sign({ user: resultUser.name, loggedInRole: req.body.role }, process.env.SECRET, { expiresIn: "1h" }); //create token with encoded payload
                    // token with userData (accessible when decoding token), jwtkey, expiry time

                    // console.log("new token:", token, resultUser.name, req.body.role);
                    res.status(200).json({
                        "message": "login successful",
                        login: resultUser.login,
                        token: token //send token
                    });
                } else { //invalid password
                    res.status(401).json({
                        "message": "login failed"
                    });
                }
            }
        })
        .catch(error => { // handle error accessing db
            res.status(500).json({"message": "Invalid DB information."})
        });

});

module.exports = router;


//create token: https://www.youtube.com/watch?v=mbsmsi7l3r4
//bcrypt: https://www.youtube.com/watch?v=DmrjFKTLOYo