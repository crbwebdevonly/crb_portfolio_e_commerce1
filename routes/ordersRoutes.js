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
ordersRouter.get("/orders-stats", getOrdersStats);
ordersRouter.post("/createorder", createOrder);
ordersRouter.get("/getallorders", getAllOrders);
ordersRouter.post("/getCustomersOrdersList", getCustomersOrdersList);
ordersRouter.get("/getorderswithquery",getOrdersWithQuery);
ordersRouter.get("/getoneorder/:id");
ordersRouter.put("/updateorder/:id", updateOrder);
ordersRouter.delete("/deleteorder/:id", deleteOrder);

//============
//============
//============
module.exports = ordersRouter;
//============
//============
//============
