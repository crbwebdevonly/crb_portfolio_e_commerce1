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
	//============
	//============
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
	//============
	// if (action.type === "GET_SLIDER_DATA_ID") {
	// 	return {
	// 		...state,
	// 		sliderData: {
	// 			...state.sliderData,
	// 			allProductsID: action.payload,
	// 		},
	// 		loading: false,
	// 		error: false,
	// 	};
	// }
	//============
	//============
	//============
	//============
	if (action.type === "GET_SLIDER_PRODUCTS") {
		return {
			...state,
			sliderProductsList: action.payload,
			loading: false,
			error: false,
		};
	}
	//============
	//============
	//============
	//============
	if (action.type === "GET_ALL_PRODUCTS_WITH_QUERY") {
		return {
			...state,
			productsList: action.payload.result,
			loading: false,
			error: false,
			paginatorData: {
				...state.paginatorData,
				hitsCount: action.payload.hitsCount,
			},
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
	//============
	if (action.type === "SET_CURRENT_PRODUCT_V2") {
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
		let { name, value } = action.payload;
		if (name === "minPrice" || name === "maxPrice") value = Number(value);
		if (name === "minPrice") {
			if (value >= state.filterQuery.maxPrice) {
				return {
					...state,
					filterQuery: {
						...state.filterQuery,
						[name]: value,
						maxPrice: 0,
					},
				};
			}
		}
		if (name === "maxPrice") {
			if (value <= state.filterQuery.minPrice) {
				return {
					...state,
					filterQuery: {
						...state.filterQuery,
						[name]: value,
						minPrice: 0,
					},
				};
			}
		}
		return {
			...state,
			filterQuery: {
				...state.filterQuery,
				[name]: value,
			},
		};
	}
	//============
	//============
	if (action.type === "RESET_FILTER_QUERY") {
		return {
			...state,
			filterQuery: action.payload,
		};
	}
	//============
	//============
	//============
	//============
	if (action.type === "SET_ITEMS_PER_PAGE") {
		return {
			...state,
			paginatorData: {
				...state.paginatorData,
				itemsPerPage: action.payload,
			},
		};
	}
	//============
	//============
	//============
	//============
	if (action.type === "SET_CURRENT_PAGE") {
		return {
			...state,
			paginatorData: {
				...state.paginatorData,
				currentPage: action.payload,
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
	if (action.type === "ADD_TO_CART_WITH_ID_V1") {
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
	//============
	//============
	if (action.type === "ADD_TO_CART_WITH_ID_V3") {
		let addItem = state.sliderProductsList.find(
			(e) => e._id === action.payload
		);
		if (!addItem) {
			addItem = state.productsList.find(
				(e) => e._id === action.payload
			);
		}
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
	//============
	//============
	if (action.type === "ADD_TO_CART_WITH_FETCH_V2") {
		cartItems = [...cartItems, action.payload];
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
	//============
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
