const jwt = require('jsonwebtoken');

const roles = ["kitchen", "waiter"]

function authUser(req, res, next) {

    try {
        jwt.verify(req.headers.authorization, process.env.SECRET, (err, jwtObj) => {//decodes token payload
            if (err) {
                return res.status(401).json({ message: "Authentication failed" });
            } else {
                // res.userData = jwtObj.user; // pass payload data via response header

                let pathRole = req.url.replaceAll('/', " ").trim().split(" ")[0].toLowerCase();  //CHANGE MARK

                if (roles.includes(pathRole) && pathRole !== jwtObj.loggedInRole.toLowerCase()) { //if role in url fits to role in token payload -> token bound to role!
                    res.sendStatus(401);
                } else {
                    next();
                }
            }
        });
    } catch (e) {
        res.sendStatus(500);
    }

}

function checkToken(req, res) {

    try {
        jwt.verify(req.body.token, process.env.SECRET, (err, jwtObj) => {
            res.status(200).json({ isValid: !err });
        });
    } catch (e) {
        res.status(200).json({ isValid: false });
    }

}


module.exports = {
    authUser,
    checkToken
}



//https://www.youtube.com/watch?v=jI4K7L-LI58