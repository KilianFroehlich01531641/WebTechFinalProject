const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config(); //https://www.youtube.com/watch?v=KFbSHtsJNIA

const app = express();
app.use(express.static('public')); // host public folder
app.use(cors()); // allow all origins -> Access-Control-Allow-Origin: *

const bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies


const loginRoutes = require('./login');
app.use("/login", loginRoutes);

app.get("/", (req, res) => {
	res.setHeader('Content-Type', 'text/html');
	res.status(200).send("FINAL PROJECT: This is a simple database-backed application");
});


const { authUser, checkToken } = require('./basicAuth');

app.post("/checkToken", (req, res) => checkToken(req, res)); //currently not used
app.use(authUser); //check authenticatoin

const pushNotifyRouter = require('./pushnotification');
app.use('/', pushNotifyRouter);

let kitchenRoutes = require('./kitchen');
app.use('/kitchen', kitchenRoutes);

let waiterRoutes = require('./waiter');
app.use('/waiter', waiterRoutes);


app.all("*", (req, res) => {
	console.log("send not found page");
	res.setHeader('content-type', 'image/jpg');
	res.statusCode = 404;
	res.sendFile('404.jpg', { root: path.join(__dirname) });
})

app.use((err, req, res, next) => {
	res.status(500).send('Error Handler!');
})

app.listen(process.env.PORT);
console.log("Server running at: http://localhost:" + process.env.PORT);