const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
	title: { type: String, required: true },
	price: { type: Number, required: true },
	description: { type: String, required: true },
	image: { type: String },
	rating: { type: Number, default: 0 },
	category: { type: String },
});

module.exports = mongoose.model("ProductModel", ProductSchema);
