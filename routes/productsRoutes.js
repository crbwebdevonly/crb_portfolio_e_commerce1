const express = require("express");
const { verifyLoggedInAdmin } = require("../controllers/authControllers");
const {
	handleProductsSeed,
	handleGetAllProducts,
	handleGetOneProduct,
	handleUpdateProduct,
	handleAddNewProduct,
	handleDeleteProduct,
	handleGetProductsWithQuery,
	handleGetSliderDataID,
	handleGetSliderProducts,
	getProductsStats,
} = require("../controllers/productControllers");
const productsRouter = express.Router();
//============
//============
// seed database
productsRouter.post("/seed-products", verifyLoggedInAdmin, handleProductsSeed);
//============
//============
//============
//============
//============
productsRouter.post(
	"/add-new-product",
	verifyLoggedInAdmin,
	handleAddNewProduct
);
//============
productsRouter.get("/products-stats", verifyLoggedInAdmin, getProductsStats);
productsRouter.get("/getallproducts", handleGetAllProducts);
productsRouter.get("/getsliderdataid", handleGetSliderDataID);
productsRouter.post("/getsliderproducts", handleGetSliderProducts);
productsRouter.get("/getproductswithquery", handleGetProductsWithQuery);
//============
productsRouter.get("/getoneproduct/:id", handleGetOneProduct);
//============
productsRouter.put(
	"/updateproduct/:id",
	verifyLoggedInAdmin,
	handleUpdateProduct
);
//============
productsRouter.delete(
	"/delete-product/:id",
	verifyLoggedInAdmin,
	handleDeleteProduct
);
//============
//============
//============

module.exports = productsRouter;
