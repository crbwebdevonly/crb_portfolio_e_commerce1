import { fakeProducts } from "../fakeProducts";

export const CustomerContextReducer = (state, action) => {
	if (action.type === "FETCH_BEGIN")
		return { ...state, loading: true, error: false };
	if (action.type === "FETCH_SUCCESS")
		return { ...state, loading: false, error: false };
	if (action.type === "FETCH_ERROR")
		return { ...state, loading: false, error: true };
	//============
	//============
	if (action.type === "SET_LOADING_TRUE") return { ...state, loading: true };

	if (action.type === "SET_LOADING_FALSE")
		return { ...state, loading: false };
	if (action.type === "SET_ERROR")
		return { ...state, error: true, loading: false };
	if (action.type === "CLEAR_ERROR") return { ...state, error: false };
	//============
	//============
	//============
	let { cartItems, showMiniCart, totalQty, totalAmount } = state;
	//============
	//============
	if (action.type === "GET_ALL_PRODUCTS") {
		return {
			...state,
			productsList: action.payload,
			loading: false,
			error: false,
		};
	}
	//============
	//============
	//============
	if (action.type === "SET_CURRENT_PRODUCT") {
		return {
			...state,
			currentProduct: action.payload,
		};
	}
	//============
	//============
	//============
	//============
	if (action.type === "FILTER_QUERY_CHANGE") {
		return {
			...state,
			filterQuery: {
				...state.filterQuery,
				[action.payload.name]: action.payload.value,
			},
		};
	}
	//============
	//============
	//============
	//============
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
		const addItem = state.productsList.find(
			(e) => e._id === action.payload
		);
		cartItems = [...cartItems, addItem];
		totalQty = cartItems.length;
		let amt = 0;
		totalAmount = cartItems.forEach((e) => {
			amt += e.price;
		});
		totalAmount = Number(amt.toFixed(2));
		return { ...state, cartItems, totalQty, totalAmount };
	}
	//============
	//============
	if (action.type === "REMOVE_ITEM_WITH_ID") {
		console.log("reducer-remove", action.payload);

		cartItems = cartItems.filter((e) => e.id !== action.payload);
		totalQty = cartItems.length;
		let amt = 0;
		totalAmount = cartItems.forEach((e) => {
			amt += e.price;
		});
		totalAmount = Number(amt.toFixed(2));

		return { ...state, cartItems, totalQty, totalAmount };
	}
	if (action.type === "REMOVE_ITEM_WITH_INDEX") {
		cartItems = cartItems.filter((e, i) => i !== action.payload);
		totalQty = cartItems.length;
		let amt = 0;
		totalAmount = cartItems.forEach((e) => {
			amt += e.price;
		});
		totalAmount = Number(amt.toFixed(2));

		return { ...state, cartItems, totalQty, totalAmount };
	}
	if (action.type === "TOGGLE_MINI_CART") {
		return { ...state, showMiniCart: !showMiniCart };
	}
	if (action.type === "RESET_CART") {
		return { ...state, cartItems: [], totalQty: 0, totalAmount: 0 };
	}
	if (action.type === "ORDER_SUBMIT_SUCCESS") {
		return { ...state, cartItems: [], totalQty: 0, totalAmount: 0 };
	} else return state;
};
