const express = require("express");
const {
	handleProductsSeed,
	handleGetAllProducts,
	handleGetOneProduct,
	handleUpdateProduct,
	handleAddNewProduct,
     handleDeleteProduct,
     handleGetProductsWithQuery,
} = require("../controllers/productControllers");
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
productsRouter.post("/add-new-product", handleAddNewProduct);
//============
productsRouter.get("/getallproducts", handleGetAllProducts);
productsRouter.get("/getproductswithquery", handleGetProductsWithQuery);
//============
productsRouter.get("/getoneproduct/:id", handleGetOneProduct);
//============
productsRouter.put("/updateproduct/:id", handleUpdateProduct);
//============
productsRouter.delete("/delete-product/:id", handleDeleteProduct);
//============
//============
//============

module.exports = productsRouter;
