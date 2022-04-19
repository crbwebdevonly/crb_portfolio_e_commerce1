const express = require("express");
const {
	handleProductsSeed,
	handleGetAllProducts,
	handleGetOneProduct,
	handleUpdateProduct,
	handleAddNewProduct,
} = require("../controllers/productControllers");
const productsRouter = express.Router();
//============
//============
// seed database
productsRouter.post("/seed-products", handleProductsSeed);
//============
productsRouter.post("/add-new-product", handleAddNewProduct);
//============
productsRouter.get("/getallproducts", handleGetAllProducts);
//============
productsRouter.get("/getoneproduct/:id", handleGetOneProduct);
//============
productsRouter.put("/updateproduct/:id", handleUpdateProduct);
//============
//============
//============
//============

module.exports = productsRouter;
