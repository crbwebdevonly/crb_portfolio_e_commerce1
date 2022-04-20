//============
const ordersRouter = require("express").Router();
//============
//============
//============
//============
//============
ordersRouter.post("/createorder")
ordersRouter.get("/getallorders")
ordersRouter.get("/getoneorder/:id")
ordersRouter.put("/updateorder/:id")
ordersRouter.delete("/deleteorder/:id")

//============
//============
//============
module.exports = ordersRouter
//============
//============
//============
