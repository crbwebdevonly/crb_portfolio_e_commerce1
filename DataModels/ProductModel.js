const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
	title: { type: String, required: true, trim: true },
	price: { type: Number, required: true },
	description: { type: String, required: true, trim: true },
	image: { type: String },
	rating: { type: Number, default: 0 },
	category: { type: String, trim: true },
});

module.exports = mongoose.model("ProductModel", ProductSchema);
