const {
	verifyLoggedInAdmin,
	verifyLoggedInUser,
} = require("../controllers/authControllers");
const {
	createOrder,
	getAllOrders,
	deleteOrder,
	updateOrder,
	getOrdersWithQuery,
	getOrdersStats,
	getCustomersOrdersList,
} = require("../controllers/ordersControllers");

//============
const ordersRouter = require("express").Router();
//============
//============
//============
//============
//============
ordersRouter.get("/orders-stats", verifyLoggedInAdmin, getOrdersStats);
ordersRouter.post("/createorder", verifyLoggedInUser, createOrder);
ordersRouter.get("/getallorders", verifyLoggedInAdmin, getAllOrders);
ordersRouter.post(
	"/getCustomersOrdersList",
	verifyLoggedInUser,
	getCustomersOrdersList
);
ordersRouter.get(
	"/getorderswithquery",
	verifyLoggedInAdmin,
	getOrdersWithQuery
);
ordersRouter.get("/getoneorder/:id");
ordersRouter.put("/updateorder/:id", verifyLoggedInAdmin, updateOrder);
ordersRouter.delete("/deleteorder/:id", verifyLoggedInAdmin, deleteOrder);

//============
//============
//============
module.exports = ordersRouter;
//============
//============
//============
