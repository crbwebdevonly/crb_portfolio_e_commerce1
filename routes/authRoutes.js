const authRouter = require("express").Router();

authRouter.get("/register", (req, res) => {
     const mode = process.env.NODE_ENV
	res.json({ msg: `aut register hit--${mode}` });
});
module.exports = authRouter;
