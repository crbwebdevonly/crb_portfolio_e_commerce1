const {
	handleLogin,
	handleRegister,
} = require("../controllers/authControllers");

const authRouter = require("express").Router();

authRouter.get("/register", handleRegister);
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
