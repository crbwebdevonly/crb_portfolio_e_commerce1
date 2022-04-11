//============

const { response } = require("express");
const UserModel = require("../DataModels/UserModel");

//============
const handleLogin = async (req, res) => {
	const loginUser = req.body;
	const { email, password } = req.body;
	try {
		const findUser = await UserModel.findOne({ email });
		if (!findUser) {
			return res.status(400).json({ msg: "login user not found" });
		}
		if (findUser.password === password) {
			return res
				.status(200)
				.json({ msg: "login success", user: findUser });
		} else {
			return res.status(400).json({
				msg: "login fail - password NOT match",
				user: findUser,
			});
		}
	} catch (error) {
		res.status(500).json({ msg: "error-login-user", error });
	}
};
//============
//============
//============
//============
const handleRegister = async (req, res) => {
	const { email, password } = req.body;
	const newUser = { email: email.trim(), password: password.trim() };
	try {
		const reply = await UserModel.create(newUser);
		res.status(201).json(reply);
	} catch (error) {
		res.status(500).json({ msg: "error-register-user", error });
	}
};
//============
//============
//============
//============
module.exports = { handleLogin, handleRegister };
//============
//============
