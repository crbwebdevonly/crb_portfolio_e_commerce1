//============
//============
const mongoose = require("mongoose");
//============
//============
const OrderSchema = mongoose.Schema(
	{
		customerID: { type: String, required: true },
		status: {
			type: String,
			required: true,
			enum: ["processing", "completed", "check-issue"],
			default: "processing",
		},
		issue: {
			type: [String],
		},
		orderItems: { type: [String], required: true },
		orderTotalAmount: { type: Number, required: true },
		orderTotalQuantity: { type: Number, required: true },
	},
	{ timestamps: true }
);
//============
//============
module.exports = mongoose.model("OrderModel", OrderSchema);
//============
