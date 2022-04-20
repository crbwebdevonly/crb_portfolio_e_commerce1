//============

const OrderModel = require("../DataModels/OrderModel");

//============
const getAllOrders = async (req, res) => {
	try {
	} catch (error) {}
};
//============
//============
//============
const createOrder = async (req, res) => {
	try {
		const reply = await OrderModel.create(req.body);
		res.status(200).json({ msg: "order placed success", reply });
	} catch (error) {
		res.status(500).json({ msg: "create order failed", error });
	}
};
//============
//============
//============
//============
//============
//============
//============
module.exports = { getAllOrders, createOrder };
//============
