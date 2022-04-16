const {
	handleLogin,
	handleRegister,
	handleGetAllUsers,
	handleGetOneUser,
} = require("../controllers/authControllers");

const authRouter = require("express").Router();

//============
//============
authRouter.get("/getallusers", handleGetAllUsers);
authRouter.post("/getoneuser", handleGetOneUser);
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
