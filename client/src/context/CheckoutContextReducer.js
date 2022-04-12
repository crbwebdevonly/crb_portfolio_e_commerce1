export const CheckoutContextReducer = (state, action) => {
	if (action.type === "ADD_ITEM") {
		let { cartItems, totalQty, totalAmount } = state;
		cartItems = [...cartItems, action.payload];
		totalQty = cartItems.length;
		let amt = 0;
		totalAmount = cartItems.forEach((e) => {
			amt += e.price;
		});
		totalAmount = amt;

		return { ...state, cartItems, totalQty, totalAmount };
	} else return state;
};
