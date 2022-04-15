import { fakeProducts } from "../fakeProducts";

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
		totalAmount = amt.toFixed(2);
		return { ...state, cartItems, totalQty, totalAmount };
	}
	//============
	//============
	if (action.type === "ADD_ITEM_WITH_ID") {
		const addItem = fakeProducts.find((e) => e.id === action.payload);
		cartItems = [...cartItems, addItem];
		totalQty = cartItems.length;
		let amt = 0;
		totalAmount = cartItems.forEach((e) => {
			amt += e.price;
		});
		totalAmount = amt.toFixed(2);
		return { ...state, cartItems, totalQty, totalAmount };
	}
	//============
	if (action.type === "REMOVE_ITEM_WITH_ID") {
		console.log("reducer-remove", action.payload);

		cartItems = cartItems.filter((e) => e.id !== action.payload);
		totalQty = cartItems.length;
		let amt = 0;
		totalAmount = cartItems.forEach((e) => {
			amt += e.price;
		});
		totalAmount = amt.toFixed(2);
		return { ...state, cartItems, totalQty, totalAmount };
	}
	if (action.type === "REMOVE_ITEM_WITH_INDEX") {
		cartItems = cartItems.filter((e, i) => i !== action.payload);
		totalQty = cartItems.length;
		let amt = 0;
		totalAmount = cartItems.forEach((e) => {
			amt += e.price;
		});
		totalAmount = amt.toFixed(2);
		return { ...state, cartItems, totalQty, totalAmount };
	}
	if (action.type === "TOGGLE_MINI_CART") {
		return { ...state, showMiniCart: !showMiniCart };
	}
	if (action.type === "RESET") {
		return { ...action.payload };
	} else return state;
};
