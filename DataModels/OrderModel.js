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
		orderItemsID: [{ type: String, required: true }],
		orderTotalAmount: { type: Number, required: true },
		orderTotalQuantity: { type: Number, required: true },
		stringifiedOrderItems: { type: String, required: true },
		stringifiedCustomer: { type: String, required: true },
	},
	{ timestamps: true }
);
//============
//============
module.exports = mongoose.model("OrderModel", OrderSchema);
//============
