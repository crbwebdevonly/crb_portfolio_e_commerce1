const { handleLogin } = require("../controllers/authControllers");

const authRouter = require("express").Router();

authRouter.get("/register", (req, res) => {
     const mode = process.env.NODE_ENV
	res.json({ msg: `aut register hit--${mode}` });
});
//============
//============
authRouter.post("/login",handleLogin)
//============
//============
//============
//============
//============
//============
module.exports = authRouter;
