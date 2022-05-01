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
const updateOrder = async (req, res) => {
	try {
		const reply = await OrderModel.findByIdAndUpdate(
			req.params.id,
			req.body,
			{ new: true }
		);
		res.status(200).json(reply);
	} catch (error) {
		res.status(500).json({ msg: "update order failed", error });
	}
};
//============
//============
//============
//============
//============
//============
const getOrdersWithQuery = async (req, res) => {
	// console.log(req.query);
	// let { search, minPrice, maxPrice, itemsPerPage, sort, currentPage } =
	let {
		searchEmail,
		orderStatus,
		minAmount,
		maxAmount,
		dateRange,
		sort,
		itemsPerPage,
		currentPage,
	} = req.query;
	// build query object---maybe not use try catch!!!!???
	minPrice = Number(minPrice) || 0;
	maxPrice = Number(maxPrice) || 0;

	const queryObject = {};
	if (minPrice && !maxPrice) {
		queryObject.price = { $gt: minPrice };
	} else if (minPrice && maxPrice) {
		if (minPrice > maxPrice || minPrice === maxPrice) {
			minPrice = 0;
		}

		queryObject.price = { $gt: minPrice, $lt: maxPrice };
	} else if (!minPrice && maxPrice) {
		queryObject.price = { $lt: maxPrice };
	}
	if (search) {
		queryObject.title = { $regex: search, $options: "i" };
	}
	// console.log(queryObject, "q-obj");
	//============
	const totalHitsCount = await ProductModel.countDocuments(queryObject);
	//============
	//============
	// use let for sorting!! and NO wait
	let result = ProductModel.find(queryObject);
	// use let for sorting!! and NO wait

	if (sort === "priceLow") {
		result = result.sort({ price: 1 });
		// result = result.sort("price");
	}
	if (sort === "priceHigh") {
		result = result.sort({ price: -1 });
		// result = result.sort("-price");
	}
	if (sort === "titleAZ") {
		result = result.sort({ title: 1 });
	}
	if (sort === "titleZA") {
		result = result.sort({ title: -1 });
	}
	if (sort === "new") {
		result = result.sort({ createdAt: -1 });
	}
	if (sort === "old") {
		result = result.sort({ createdAt: 1 });
	}
	// paginate
	const page = Number(currentPage) || 1;
	const limit = Number(itemsPerPage) || 10;
	const skip = (page - 1) * limit;
	//============
	result = result.skip(skip).limit(limit);
	result = await result;
	res.status(200).json({ totalHitsCount, productsList: result });
};
//============
//============
//============
//============
//============
module.exports = {
	getAllOrders,
	createOrder,
	deleteOrder,
	updateOrder,
	getOrdersWithQuery,
};
//============
