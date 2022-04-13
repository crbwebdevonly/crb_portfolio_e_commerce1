export const CheckoutContextReducer = (state, action) => {
	let { cartItems, showMiniCart, totalQty, totalAmount } = state;

	if (action.type === "ADD_ITEM") {
		console.log("add-reducer");
		cartItems = [...cartItems, action.payload];
		totalQty = cartItems.length;
		let amt = 0;
		totalAmount = cartItems.forEach((e) => {
			amt += e.price;
		});
		totalAmount = amt;
		return { ...state, cartItems, totalQty, totalAmount };
	}
	if (action.type === "REMOVE_ITEM") {
		cartItems = cartItems.filter((e) => e.id !== action.payload);
		totalQty = cartItems.length;
		let amt = 0;
		totalAmount = cartItems.forEach((e) => {
			amt += e.price;
		});
		totalAmount = amt;
		return { ...state, cartItems, totalQty, totalAmount };
	}
	if (action.type === "TOGGLE_MINI_CART") {
		return { ...state, showMiniCart: !showMiniCart };
	}
	if (action.type === "kkk_ITEM") {
		return { ...state, cartItems, totalQty, totalAmount };
	} else return state;
};
