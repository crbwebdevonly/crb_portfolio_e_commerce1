//============
//============
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
//============
//============
//============

const UserModel = require("../DataModels/UserModel");

//============
//============
const demoAdminID = "62553e08b142025551b84281";
const demoUserID = "625dc1942d81623df53fd12b";
//============
//============
//============
//============
//============
const getUsersStats = async (req, res) => {
	const usersStats = {};
	let query = {};
	try {
		let total = await UserModel.count(query);
		usersStats.total = total;
		const date = new Date();
		const y = date.getFullYear();
		const m = date.getMonth();
		const d = date.getDate();
		const hr = date.getHours();
		query.createdAt = {
			$gte: new Date(new Date(y, m, d, hr - 24)),
			$lte: new Date(),
		};
		let today = await UserModel.count(query);
		usersStats.today = today;
		query.createdAt = {
			$gte: new Date(new Date(y, m, d - 7, hr)),
			$lte: new Date(),
		};
		usersStats.week = await UserModel.count(query);
		res.status(200).json({ usersStats });
	} catch (error) {
		res.status(500).json({ msg: "error-usersStats", error });
	}
};
//============
//============
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
const handleUpdateUser = async (req, res) => {
	// prevent demo user/admin update

	if (req.params.id === demoAdminID || req.params.id === demoUserID) {
		return res
			.status(400)
			.json({ msg: "cannot -update , this account is protected" });
	}
	try {
		if (req.verifiedUserId === req.params.id || req.verifiedUserIsAdmin) {
			let updateData = req.body;
			let { password } = req.body;
			if (password) {
				let hashedPassword = await bcrypt.hash(password, 10);
				updateData.password = hashedPassword;
			}
			const user = await UserModel.findByIdAndUpdate(
				req.params.id,
				updateData,
				{ new: true }
			);
			if (!user) {
				return res.status(400).json({
					msg: "error updating user- not found",
				});
			}

			res.status(200).json(user);
		} else throw new Error("NOt -Authorised");
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
		if (req.verifiedUserId === req.params.id || req.verifiedUserIsAdmin) {
			const reply = await UserModel.deleteOne({ _id: req.params.id });
			res.status(200).json({ msg: "user delete success", reply });
		} else throw new Error("NOt -Authorised");
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
	// return res.status(500).json({ msg: "test k500" });
	// return res.status(400).json({ msg: "test k400" });

	const loginUser = req.body;
	const { email, password } = req.body;
	try {
		// throw new Error("e-test");
		if (!email || !password) {
			return res
				.status(400)
				.json({ msg: "must provide email and password details" });
		}

		const findUser = await UserModel.findOne({ email });
		if (!findUser) {
			return res.status(400).json({ msg: "login user not found" });
		}
		const match = await bcrypt.compare(password, findUser.password);

		if (findUser.password === password || match) {
			console.log("logged in, bcryptmatch==", match);
			const { _id, isAdmin } = findUser;
			const jwtToken = jwt.sign(
				{ userId: _id, isAdmin },
				process.env.JWT_SECRET
			);
			return res
				.cookie("jwtToken_crb_portfolio_ecommerce1", jwtToken, {
					httpOnly: true,
				})
				.status(200)
				.json({ msg: "login success", user: findUser });
		} else {
			return res.status(400).json({
				msg: "login fail - password NOT match",
				user: findUser,
			});
		}
	} catch (error) {
		res.status(500).json({ msg: "error-login-user", e: error?.message });
	}
};
//============
//============
//============
//============
const handleRegister = async (req, res) => {
	let { email, password } = req.body;
	let hashedPassword = await bcrypt.hash(password, 10);
	const newUser = { email: email.trim(), password: hashedPassword };
	try {
		const reply = await UserModel.create(newUser);
		res.status(201).json(reply);
	} catch (error) {
		res.status(500).json({ msg: "error-register-user", error });
	}
};
//============
//============
const handleLogout = (req, res) => {
	return (
		res
			.clearCookie("jwtToken_crb_portfolio_ecommerce1")
			// .cookie("jwtToken_crb_portfolio_ecommerce1", "logged out", {
			// 	httpOnly: true,
			// })
			.status(200)
			.json({ msg: "logout success" })
	);
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
const decodeJwtToken = (req, res, next) => {
	// console.log(req.cookies, "reqcookies");
	const jwtToken = req.cookies["jwtToken_crb_portfolio_ecommerce1"];
	//     const decodedToken =
	jwt.verify(jwtToken, process.env.JWT_SECRET, (error, decodedToken) => {
		if (error) {
			req.verifiedUserId = "";
			req.verifiedUserIsAdmin = false;
		} else if (decodedToken.userId) {
			req.verifiedUserId = decodedToken.userId;
			req.verifiedUserIsAdmin = decodedToken.isAdmin;
		}
		// console.log(decodedToken, "decode myjwt");
		next();
	});
};

//============
//============
const verifyLoggedInUser = (req, res, next) => {
	// console.log(req.verifiedUserId, "id verifyLoggedIn");
	// console.log(req.verifiedUserIsAdmin, "admin verifyLoggedIn");
	// next();
	if (req.verifiedUserId) next();
	else
		return res
			.status(401)
			.json({ msg: "NOT logged in, Please login " });
};
//============
//============
//============
//============
const verifyLoggedInAdmin = (req, res, next) => {
	// console.log(req.verifiedUserId, "id");
	// console.log(req.verifiedUserIsAdmin, "admin");
	if (req.verifiedUserIsAdmin) next();
	else
		return res
			.status(401)
			.json({ msg: "NOT ADMIN, UnAuthorised, Please login as ADMIN" });
};
//============
//============
//============
//============
//============
//============
module.exports = {
	getUsersStats,
	handleGetAllUsers,
	handleGetOneUser,
	handleUpdateUser,
	handleDeleteUser,
	handleLogin,
	handleLogout,
	handleRegister,
	decodeJwtToken,
	verifyLoggedInUser,
	verifyLoggedInAdmin,
};
//============
//============
