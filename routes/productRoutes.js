const express = require("express");
const { handleProductsSeed } = require("../controllers/productControllers");
const productsRouter = express.Router();
//============
//============
// seed database
productsRouter.post("/seed-products", handleProductsSeed);
//============
//============
//============
//============
//============
//============
//============

module.exports = productsRouter;
