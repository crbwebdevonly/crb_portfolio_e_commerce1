//============

const { response } = require("express");
const UserModel = require("../DataModels/UserModel");

//============
//============
//============
const handleGetAllUsers = async (req, res) => {
	try {
		const users = await UserModel.find();
		res.status(200).json(users);
	} catch (error) {
		res.status(500).json({ msg: "error-getting all-users", error });
	}
};
//============
//============
//============
const handleGetOneUser = async (req, res) => {
	try {
		const user = await UserModel.findById(req.body.userId);
		res.status(200).json(user);
	} catch (error) {
		res.status(500).json({ msg: "error-getting ONE-user", error });
	}
};

//============
//============
//============
//============
//============
//============
//============
//============
//============
//============
//============
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
module.exports = {
	handleGetAllUsers,
	handleGetOneUser,
	handleLogin,
	handleRegister,
};
//============
//============
