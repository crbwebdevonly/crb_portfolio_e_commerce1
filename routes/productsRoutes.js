const express = require("express");
const { handleProductsSeed, handleGetAllProducts, handleGetOneProduct } = require("../controllers/productControllers");
const productsRouter = express.Router();
//============
//============
// seed database
productsRouter.post("/seed-products", handleProductsSeed);
//============
productsRouter.get("/getallproducts",handleGetAllProducts)
//============
productsRouter.get("/getoneproduct/:id",handleGetOneProduct)
//============
//============
//============
//============
//============

module.exports = productsRouter;
