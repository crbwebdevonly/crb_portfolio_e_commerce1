//============

const { response } = require("express");
const UserModel = require("../DataModels/UserModel");

//============
//============
const demoAdminID = "62553e08b142025551b84281";
const demoUserID = "625dc1942d81623df53fd12b";
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
const handleUpdateUser = async (req, res) => {
	// prevent demo user/admin update

	if (req.params.id === demoAdminID || req.params.id === demoUserID) {
		return res
			.status(400)
			.json({ msg: "cannot -update , this account is protected" });
	}
	try {
		const user = await UserModel.findByIdAndUpdate(
			req.params.id,
			req.body,
			{ new: true }
		);
		if (!user) {
			res.status(400).json({
				msg: "error updating user- not found",
			});
		}
		res.status(200).json(user);
	} catch (error) {
		res.status(500).json({ msg: "error updating user", error });
	}
};
//============
//============
const handleDeleteUser = async (req, res) => {
	if (req.params.id === demoAdminID || req.params.id === demoUserID) {
		return res
			.status(400)
			.json({ msg: "cannot -delete , this account is protected" });
	}
	try {
		const reply = await UserModel.deleteOne({ _id: req.params.id });
		res.status(200).json({ msg: "user delete success", reply });
	} catch (error) {
		res.status(500).json({ msg: "error-deleting-user", error });
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
	handleUpdateUser,
	handleDeleteUser,
	handleLogin,
	handleRegister,
};
//============
//============
