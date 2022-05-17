const {
	handleLogin,
	handleRegister,
	handleGetAllUsers,
	handleGetOneUser,
	handleUpdateUser,
	handleDeleteUser,
     getUsersStats,
     handleLogout,
     verifyLoggedInAdmin,
     verifyLoggedInUser,
} = require("../controllers/authControllers");

const authRouter = require("express").Router();

//============
//============

authRouter.get("/users-stats",verifyLoggedInAdmin, getUsersStats);
authRouter.get("/getallusers",verifyLoggedInAdmin, handleGetAllUsers);
authRouter.put("/updateuser/:id",verifyLoggedInUser, handleUpdateUser);
authRouter.delete("/deleteuser/:id",verifyLoggedInUser, handleDeleteUser);
// 

authRouter.post("/getoneuser", handleGetOneUser); 
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
