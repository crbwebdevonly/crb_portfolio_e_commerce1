const {
	handleLogin,
	handleRegister,
	handleGetAllUsers,
	handleGetOneUser,
	handleUpdateUser,
	handleDeleteUser,
     getUsersStats,
     handleLogout,
} = require("../controllers/authControllers");

const authRouter = require("express").Router();

//============
//============

authRouter.get("/users-stats", getUsersStats);
authRouter.get("/getallusers", handleGetAllUsers);
authRouter.post("/getoneuser", handleGetOneUser);
authRouter.put("/updateuser/:id", handleUpdateUser);
authRouter.delete("/deleteuser/:id", handleDeleteUser);
authRouter.post("/register", handleRegister);
authRouter.post("/login", handleLogin);
authRouter.get("/logout", handleLogout);
//============
//============
//============
//============
//============
//============
//============
//============
module.exports = authRouter;
