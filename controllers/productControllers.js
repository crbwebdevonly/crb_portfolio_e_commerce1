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
     let updateData = req.body
	try {
		const reply = await ProductModel.findByIdAndUpdate(req.params.id,updateData);
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
	handleGetOneProduct,
};
//============
//============
//============
//============
//============
