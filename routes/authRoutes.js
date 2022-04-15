const {
	handleLogin,
	handleRegister,
	handleGetAllUsers,
} = require("../controllers/authControllers");

const authRouter = require("express").Router();

//============
//============
authRouter.get("/getallusers", handleGetAllUsers);
authRouter.post("/register", handleRegister);
authRouter.post("/login", handleLogin);
//============
//============
//============
//============
//============
//============
//============
//============
module.exports = authRouter;
