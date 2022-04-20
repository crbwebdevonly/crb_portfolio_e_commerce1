const { createOrder } = require("../controllers/ordersControllers");

//============
const ordersRouter = require("express").Router();
//============
//============
//============
//============
//============
ordersRouter.post("/createorder", createOrder);
ordersRouter.get("/getallorders");
ordersRouter.get("/getoneorder/:id");
ordersRouter.put("/updateorder/:id");
ordersRouter.delete("/deleteorder/:id");

//============
//============
//============
module.exports = ordersRouter;
//============
//============
//============
