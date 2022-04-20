//============

const OrderModel = require("../DataModels/OrderModel");

//============
const getAllOrders = async (req, res) => {
	try {
		const reply = await OrderModel.find();
		res.status(200).json(reply);
	} catch (error) {
		res.status(500).json({ msg: "get all order failed", error });
	}
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
const deleteOrder = async (req, res) => {
	try {
		const reply = await OrderModel.findByIdAndDelete(req.params.id);
		res.status(200).json({ msg: "order delete success", reply });
	} catch (error) {
		res.status(500).json({ msg: "delete order failed", error });
	}
};
//============
//============
//============
//============
//============
//============
module.exports = { getAllOrders, createOrder ,deleteOrder};
//============
