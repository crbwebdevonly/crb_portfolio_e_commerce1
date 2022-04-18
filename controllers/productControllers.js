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
//============
//============
//============
//============
//============
//============
//============
//============
//============
module.exports = { handleProductsSeed };
//============
//============
//============
//============
//============
