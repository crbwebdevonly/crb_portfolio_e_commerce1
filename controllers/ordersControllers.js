//============

const { aggregate } = require("../DataModels/OrderModel");
const OrderModel = require("../DataModels/OrderModel");

//============
//============
const getOrdersStats = async (req, res) => {
	let ordersStats = {};
	let date = new Date();
	const y = date.getFullYear();
	const m = date.getMonth();
	const d = date.getDate();
	const h = date.getHours();
	try {
		let s = await OrderModel.aggregate([
			{ $group: { _id: "$status", count: { $sum: 1 } } },
		]);
		ordersStats.completed = -1;
		ordersStats.issue = -1;
		ordersStats.processing = -1;

		s.forEach((e) => {
			console.log(e);
			if (e._id === "completed") {
				ordersStats.completed = e.count;
			}
			if (e._id === "check-issue") {
				ordersStats.issue = e.count;
			}
			if (e._id === "processing") {
				ordersStats.processing = e.count;
			}
		});
		//
		let ts = await OrderModel.aggregate([
			{ $group: { _id: null, amount: { $sum: "$orderTotalAmount" } } },
		]);
		ordersStats.aggregateTotalSales = ts[0].amount;

		let ms = await OrderModel.aggregate([
			{
				$match: {
					createdAt: { $gte: new Date(y, m - 1, d), $lte: date },
				},
			},
			{
				$group: {
					_id: null,
					amount: { $sum: "$orderTotalAmount" },
					count: { $sum: 1 },
				},
			},
		]);
		ordersStats.aggregateMonthlySales = ms.length<1? {amount:0,count:0} : ms[0];

		let ws = await OrderModel.aggregate([
			{
				$match: {
					createdAt: { $gte: new Date(y, m, d - 7), $lte: date },
				},
			},
			{
				$group: {
					_id: null,
					amount: { $sum: "$orderTotalAmount" },
					count: { $sum: 1 },
				},
			},
		]);
		ordersStats.aggregateWeeklySales= ws.length<1? {amount:0,count:0} :  ws[0];

		let t = await OrderModel.aggregate([
			{
				$match: {
					createdAt: {
						$gte: new Date(y, m, d, h - 24),
						$lte: date,
					},
				},
			},
			{
				$group: {
					_id: null,
					amount: { $sum: "$orderTotalAmount" },
					count: { $sum: 1 },
				},
			},
		]);
          console.log(ws,"week",t,"today");
		ordersStats.aggregateTodaySales = t.length<1? {amount:0,count:0} : t[0];

		res.status(200).json({ ordersStats });
	} catch (error) {
		res.status(500).json({ msg: "error getting stats-products", error });
	}
};
//============
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
const getOrdersWithQuery = async (req, res) => {
	console.log(req.query);
	let {
		searchEmail,
		orderStatus,
		minAmount: minPrice,
		maxAmount: maxPrice,
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
		queryObject.orderTotalAmount = { $gt: minPrice };
	} else if (minPrice && maxPrice) {
		if (minPrice > maxPrice || minPrice === maxPrice) {
			minPrice = 0;
		}

		queryObject.orderTotalAmount = { $gt: minPrice, $lt: maxPrice };
	} else if (!minPrice && maxPrice) {
		queryObject.orderTotalAmount = { $lt: maxPrice };
	}
	if (searchEmail) {
		queryObject.customerEmail = {
			$regex: searchEmail,
			$options: "i",
		};
	}
	// console.log(queryObject, "q-obj");
	//============query date range
	if (dateRange !== "all") {
		const date = new Date();
		const hour = date.getHours(); //Get the hour (0-23)
		const minutes = date.getMinutes(); //Get the minute (0-59)
		const day = date.getDate(); //day number 1-31
		const month = date.getMonth(); //0-11
		const year = date.getFullYear();
		let startDate = new Date();
		let endDate = new Date(year - 100, month, day);
		if (dateRange === "1hr") {
			endDate = new Date(
				new Date(year, month, day).setHours(hour - 1, minutes, 00)
			);
		}
		if (dateRange === "1day") {
			endDate = new Date(
				new Date(year, month, day - 1).setHours(hour, minutes, 00)
			);
		}
		if (dateRange === "2day") {
			endDate = new Date(year, month, day - 2);
		}
		if (dateRange === "3day") {
			endDate = new Date(year, month, day - 3);
		}
		if (dateRange === "week") {
			endDate = new Date(year, month, day - 7);
		}
		if (dateRange === "month") {
			endDate = new Date(year, month - 1, day);
		}
		// console.log(startDate, "start", endDate, "end");

		queryObject.createdAt = { $gte: endDate, $lte: startDate };
	}
	//============
	//============
	//============query order-satus
	if (
		orderStatus === "processing" ||
		orderStatus === "completed" ||
		orderStatus === "check-issue"
	) {
		queryObject.status = orderStatus;
	}

	//============
	//============
	//============
	const totalHitsCount = await OrderModel.countDocuments(queryObject);
	//============
	//============
	// use let for sorting!! and NO wait
	let result = OrderModel.find(queryObject);
	// use let for sorting!! and NO wait

	if (sort === "amountLow") {
		result = result.sort({ orderTotalAmount: 1 });
	}
	if (sort === "amountHigh") {
		result = result.sort({ orderTotalAmount: -1 });
	}
	// if (sort === "titleAZ") {
	// 	result = result.sort({ title: 1 });
	// }
	// if (sort === "titleZA") {
	// 	result = result.sort({ title: -1 });
	// }
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
	res.status(200).json({ totalHitsCount, ordersList: result });
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
module.exports = {
	getOrdersStats,
	getAllOrders,
	createOrder,
	deleteOrder,
	updateOrder,
	getOrdersWithQuery,
};
//============
