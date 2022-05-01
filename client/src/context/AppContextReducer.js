//============
//============
export const AppContextReducer = (state, action) => {
	switch (action.type) {
		case "SET_LOADING_TRUE": {
			return { ...state, loading: true };
		}
		case "SET_LOADING_FALSE": {
			return { ...state, loading: false };
		}
		case "SET_ERROR": {
			return { ...state, error: true, loading: false };
		}
		case "CLEAR_ERROR": {
			return { ...state, error: false, loading: false };
		}
		//============
		//============
		case "FETCH_BEGIN":
			return { ...state, loading: true, error: false };
		case "FETCH_SUCCESS":
			return { ...state, loading: false, error: false };
		case "FETCH_ERROR":
			return { ...state, loading: false, error: true };
		//============
		//============
		//============auth
		case "LOGIN_SUCCESS":
			return { ...state, user: action.payload, error: false };
		case "REGISTER_SUCCESS":
			return { ...state, user: action.payload, error: false };
		case "LOGIN_FAIL":
			return { ...state, user: null, error: true };
		case "DO_LOGOUT":
			return { ...state, user: null, error: false };

		//============
		//============
		//============
		//============filter
		//============
		case "FILTER_CHANGE": {
			let { name, value } = action.payload;
			if (name === "minPrice" || name === "maxPrice")
				value = Number(value);
			if (name === "minPrice") {
				if (value >= state.filter.maxPrice) {
					return {
						...state,
						filter: {
							...state.filter,
							[name]: value,
							maxPrice: 0,
						},
					};
				}
			}
			if (name === "maxPrice") {
				if (value <= state.filter.minPrice) {
					return {
						...state,
						filter: {
							...state.filter,
							[name]: value,
							minPrice: 0,
						},
					};
				}
			}
			return {
				...state,
				filter: {
					...state.filter,
					[name]: value,
				},
			};
		}
		//============
		//============
		case "RESET_FILTER": {
			return {
				...state,
				filter: action.payload,
			};
		}
		//============
		//============paginatorData
		//============
		case "SET_ITEMS_PER_PAGE": {
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
		case "SET_CURRENT_PAGE": {
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
		//============products
		//============
		//============
		//============
		//============
		case "GET_SLIDER_PRODUCTS": {
			return {
				...state,
				sliderProductsList: action.payload,
			};
		}
		//============
		//============
		//============
		case "GET_CURRENT_PAGE_PRODUCTS_LIST_AND_HITS_COUNT_WITH_QUERY": {
			const { totalHitsCount, productsList } = action.payload;

			return {
				...state,
				productsList,
				paginatorData: {
					...state.paginatorData,
					totalHitsCount,
				},
			};
		}
		//============
		//============
		case "SET_CURRENT_PRODUCT_WITH_ID": {
			return {
				...state,
				currentProduct: action.payload,
			};
		}
		//============
		//============
		case "ADD_TO_CART_WITH_ID": {
			let { cartItems, totalQty, totalAmount } = state;

			let addItem = state.sliderProductsList.find(
				(e) => e._id === action.payload
			);
			if (!addItem) {
				addItem = state.productsList.find(
					(e) => e._id === action.payload
				);
			}
			cartItems = [...state.cartItems, addItem];
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
		case "REMOVE_ITEM_FROM_CART_WITH_INDEX": {
			let { cartItems, totalQty, totalAmount } = state;

			cartItems = state.cartItems.filter(
				(e, i) => i !== action.payload
			);
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
		case "TOGGLE_SHOW_MINI_CART": {
			return { ...state, showMiniCart: !state.showMiniCart };
		}
		case "RESET_CART": {
			return { ...state, cartItems: [], totalQty: 0, totalAmount: 0 };
		}
		//============
		//============
		//============

		//============
		//============admin
		case "GET_ALL_USERS": {
			return {
				...state,
				usersList: action.payload,
			};
		}
		//============
		//============
		case "SET_EDIT_PRODUCT": {
			return {
				...state,
				editProduct: action.payload,
			};
		}
		//============
		//============
		case "ENABLE_EDIT_PRODUCT": {
			const { category, description, image, price, rating, title } =
				state.editProduct;
			return {
				...state,
				editProductEnable: true,
				updateProductData: {
					category,
					description,
					image,
					price,
					rating,
					title,
				},
			};
		}
		//============
		//============
		case "CANCEL_EDIT_PRODUCT": {
			return {
				...state,
				editProductEnable: false,
				updateProductData: {},
			};
		}
		//============
		//============
		case "UPDATE_PRODUCT_DATA_CHANGE": {
			let { name, value } = action.payload;
			if (name === "price" || name === "rating") {
				value = Number(value);
			}

			return {
				...state,
				updateProductData: {
					...state.updateProductData,
					[name]: value,
				},
			};
		}
		//============
		//============
		case "NEW_PRODUCT_DATA_CHANGE": {
			let { name, value } = action.payload;
			// check???
			// if (name === "price" || name === "rating") {
			// 	value = Number(value);
			// }

			return {
				...state,
				newProductData: {
					...state.newProductData,
					[name]: value,
				},
			};
		}
		//============
		//============
		case "ADD_NEW_PRODUCT_SUCCESS": {
			return {
				...state,
				newProductData: {
					title: "",
					price: "",
					description: "",
					category: "",
					image: "",
					rating: "",
				},
			};
		}
		//============
		//============ use cancel product
		// case "DELETE_PRODUCT_SUCCESS": {
		// 	return {
		// 		...state,
		// 		editEnable: false,
		// 	};
		// }
		//============
		//============
		//============

		//============orders
		//============
		case "GET_ALL_ORDERS": {
			return {
				...state,
				ordersList: action.payload,
			};
		}
		case "DELETE_ORDER_SUCCESS": {
			return {
				...state,
				ordersList: state.ordersList.filter(
					(e) => e._id !== action.payload
				),
			};
		}
		case "UPDATE_ORDER_SUCCESS": {
			let updatedList = state.ordersList.map((e) => {
				if (e._id === action.payload._id) return action.payload;
				return e;
			});
			return {
				...state,
				ordersList: updatedList,
			};
		}
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
		//============
		//============
		//============
		//============
		//============
		//============
		//============

		default:
			return state;
	}
};
//============
//============
//============
