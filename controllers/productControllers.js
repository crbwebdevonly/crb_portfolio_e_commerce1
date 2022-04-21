//============

const ProductModel = require("../DataModels/ProductModel");

//============
//============
//============
//============
const handleProductsSeed = async (req, res) => {
	try {
		const reply = await ProductModel.insertMany(req.body);
		res.status(200).json({ msg: "seeding Products Success", reply });
	} catch (error) {
		res.status(500).json({ msg: "error seeding products", error });
	}
};
//============
//============
//============
//============
const handleAddNewProduct = async (req, res) => {
	try {
		const reply = await ProductModel.create(req.body);
		res.status(200).json({ msg: "create Product Success", reply });
	} catch (error) {
		res.status(500).json({ msg: "error creating product", error });
	}
};
//============
//============
const handleGetAllProducts = async (req, res) => {
	try {
		const allProducts = await ProductModel.find();
		res.status(200).json(allProducts);
	} catch (error) {
		res.status(500).json({ msg: "error getting all products", error });
	}
};
//============
//============
//============
const handleGetProductsWithQuery = async (req, res) => {
	console.log(req.query);
	let { search, minPrice, maxPrice, itemsPerPage, sorting, currentPage } =
		req.query;
	// build query object---maybe not use try catch!!!!???
	const queryObject = {};
	if (minPrice && !maxPrice) {
		queryObject.price = { $gt: minPrice };
	} else if (minPrice && maxPrice) {
		if (minPrice > maxPrice) {
			// delete queryObject.minPrice;
			minPrice = 0;
		}
		queryObject.price = { $gt: minPrice, $lt: maxPrice };
	} else if (!minPrice && maxPrice) {
		queryObject.price = { $lt: maxPrice };
	}
	if (search) {
		queryObject.title = { $regex: search, $options: "i" };
	}
	console.log(queryObject, "q-obj");
	// use let for sorting!!
	let result = await ProductModel.find(queryObject);
	// try {
	// 	if (search) {
	// 		result = await ProductModel.find({
	// 			title: { $regex: search ,$options: "i"},
	// 		});
	// 	}
	// 	res.status(200).json(result);
	// } catch (error) {
	// 	res.status(500).json({ msg: "error getting all products", error });
	// }

	res.status(200).json(result);
};
//============
//============
//============
//============
const handleGetOneProduct = async (req, res) => {
	try {
		const reply = await ProductModel.findById(req.params.id);
		if (!reply) {
			return res.status(400).json({ msg: "product NOT found" });
		}
		res.status(200).json(reply);
	} catch (error) {
		res.status(500).json({ msg: "error getting ONE product", error });
	}
};
//============
//============
//============
const handleUpdateProduct = async (req, res) => {
	let updateData = req.body;
	for (v of Object.values(updateData)) {
		if (!v) {
			res.status(400).json({
				msg: "update-error, empty value NOT allowed",
			});
			return;
		}
	}
	try {
		const reply = await ProductModel.findByIdAndUpdate(
			req.params.id,
			updateData,
			{ new: true }
		);
		if (!reply) {
			return res.status(400).json({ msg: "product NOT found" });
		}
		res.status(200).json(reply);
	} catch (error) {
		res.status(500).json({ msg: "error updating product", error });
	}
};
//============
//============
//============
const handleDeleteProduct = async (req, res) => {
	try {
		const reply = await ProductModel.findByIdAndDelete(req.params.id);
		if (!reply) {
			return res.status(400).json({ msg: "delete product NOT found" });
		}
		res.status(200).json({ msg: "delete product success" });
	} catch (error) {
		res.status(500).json({ msg: "error deleting product", error });
	}
};
//============
//============
//============
//============
//============
//============
//============
//============
//============
//============
module.exports = {
	handleProductsSeed,
	handleGetAllProducts,
	handleGetProductsWithQuery,
	handleGetOneProduct,
	handleUpdateProduct,
	handleAddNewProduct,
	handleDeleteProduct,
};
//============
//============
//============
//============
//============
