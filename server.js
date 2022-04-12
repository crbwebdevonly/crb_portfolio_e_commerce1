const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const morgan = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");
const authRouter = require("./routes/authRoutes");
dotenv.config();

const myServer = express();

//============
//============
//============
//============
//============
//============
//============middlewares
//============
//============
//============
//============
myServer.use(express.json());
myServer.use(cors());
//============
//============
//============
//============routes
//============
//============
if (process.env.NODE_ENV === "development") {
	myServer.use(morgan("tiny"));
	console.log("//============");
	console.log("//============");
	console.log("development mode..crb");
	console.log("//============");
	console.log("//============");
}
//============
//============
//============

myServer.use("/api/auth", authRouter);
//============
//============
//============
//============
//============
//============
//============
//============
//============database
//============
//============
mongoose.connect(process.env.DB_CONNECTION_STRING, () => {
	console.count("//=====================");
	console.log("database connected....crb");
	console.count("//=====================");
	startServer();
});
//============
//============
//============
//============
//============heroku deployment
//============
//============
//============
//============
if (process.env.NODE_ENV === "production") {
	myServer.use(express.static(path.join(__dirname, "/client/build")));
	myServer.get("*", (req, res) => {
		res.sendFile(path.join(__dirname, "/client/build", "index.html"));
	});
}

//============
//============
//============
//============
//============
//============
//============
//============
//============
let PORT = process.env.PORT || 5000;
const startServer = () => {
	myServer.listen(PORT, () => {
		console.log(`crb server listining @${PORT}....`);
		console.log("//============");
		console.log("//============");
		//
	});
};
//============
//============
