const {
	createOrder,
	getAllOrders,
	deleteOrder,
	updateOrder,
} = require("../controllers/ordersControllers");

//============
const ordersRouter = require("express").Router();
//============
//============
//============
//============
//============
ordersRouter.post("/createorder", createOrder);
ordersRouter.get("/getallorders", getAllOrders);
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
