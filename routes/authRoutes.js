const {
	handleLogin,
	handleRegister,
} = require("../controllers/authControllers");

const authRouter = require("express").Router();

authRouter.post("/register", handleRegister);
//============
//============
authRouter.post("/login", handleLogin);
//============
//============
//============
//============
//============
//============
module.exports = authRouter;
