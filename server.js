const express = require("express");
const path = require("path");
const morgan = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");
const authRouter = require("./routes/authRoutes");
const fs = require("fs");
dotenv.config();

const myServer = express();

//============middlewares
//============
myServer.use(express.json());
myServer.use(morgan("tiny"));
myServer.use(cors());
//============
//============
// const client = "ecommerce_frontend";
//============
//============routes
//============
// this is causing error on deployed site/ only see send message/ webside not visible
// myServer.get("/", (req, res) => {
// 	res.json({msg:"get home"});
// });
//============
//============

myServer.use("/auth", authRouter);
//============
//============database
//============
//============
//============
//============
//============
//============
//============heroku deployment
//============
if (process.env.NODE_ENV === "production") {
	myServer.use(express.static(path.join(__dirname, "/client/build")));
	myServer.get("*", (req, res) => {
		res.sendFile(path.join(__dirname, "/client/build", "index.html"));
	});
}
if (process.env.NODE_ENV === "development") {
	console.log("development mode..crb");
}
//============
//============
//============
let PORT = process.env.PORT || 5000;
myServer.listen(PORT, () => {
	console.log(`crb server listining @${PORT}....`);
	//
	// let content = `REACT_APP_PORT = ${PORT}`;
	// fs.writeFile(path.join(__dirname, "/client", ".env"), content, (err) => {
	// 	if (err) {
	// 		console.error(err);
	// 		return;
	// 	}
	// 	//file written successfully
	// });
});
//============
//============
