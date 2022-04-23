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
//============
//============
const handleGetSliderDataID = async (req, res) => {
	// send 5 random products--title,id,price
	const hitsCount = await ProductModel.countDocuments();
	let query = ProductModel.find();
     query.select("_id ")
     query.exec((error,result)=>{
          if(error) {
               	return res.status(500).json({ msg: "error getting slider dataID", error });
               }
               else 	res.status(200).json(result);
     })

	// try {
	// 	const allProducts = await ProductModel.find();
	// 	res.status(200).json(allProducts);
	// } catch (error) {
	// 	res.status(500).json({ msg: "error getting all products", error });
	// }
};
//============
//============
//============
//============
const handleGetSliderProducts = async (req, res) => {
     
     try {
          const result = await ProductModel.find().where('_id').in(req.body).exec();
		res.status(200).json(result);
	} catch (error) {
		res.status(500).json({ msg: "error getting slide products", error });
	}
};
//============
//============
//============
//============
//============
const handleGetProductsWithQuery = async (req, res) => {
	console.log(req.query);
	let { search, minPrice, maxPrice, itemsPerPage, sort, currentPage } =
		req.query;
	// build query object---maybe not use try catch!!!!???
	minPrice = Number(minPrice) || 0;
	maxPrice = Number(maxPrice) || 0;

	const queryObject = {};
	if (minPrice && !maxPrice) {
		queryObject.price = { $gt: minPrice };
	} else if (minPrice && maxPrice) {
		if (minPrice > maxPrice || minPrice === maxPrice) {
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
	//============
	const hitsCount = await ProductModel.countDocuments(queryObject);
	//============
	//============
	// use let for sorting!! and NO wait
	let result = ProductModel.find(queryObject);
	// use let for sorting!! and NO wait

	if (sort === "priceLow") {
		result = result.sort({ price: 1 });
		// result = result.sort("price");
	}
	if (sort === "priceHigh") {
		result = result.sort({ price: -1 });
		// result = result.sort("-price");
	}
	if (sort === "titleAZ") {
		result = result.sort({ title: 1 });
	}
	if (sort === "titleZA") {
		result = result.sort({ title: -1 });
	}
	// paginate
	const page = Number(currentPage) || 1;
	const limit = Number(itemsPerPage) || 10;
	const skip = (page - 1) * limit;
	//============
	result = result.skip(skip).limit(limit);
	result = await result;
	res.status(200).json({ hitsCount, result });
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
	handleGetSliderDataID,
	handleGetSliderProducts,
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
