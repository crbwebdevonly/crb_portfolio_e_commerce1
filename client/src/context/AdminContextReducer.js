export const AdminContextReducer = (state, action) => {
	switch (action.type) {
		case "FETCH_BEGIN":
			return { ...state, loading: true, error: false };
		case "FETCH_SUCCESS":
			return { ...state, loading: false, error: false };
		case "FETCH_ERROR":
			return { ...state, loading: false, error: true };
		//============
		//============
		//============
		case "SET_LOADING_TRUE":
			return { ...state, loading: true };

		case "SET_LOADING_FALSE":
			return { ...state, loading: false };
		case "SET_ERROR":
			return { ...state, error: true, loading: false };
		case "CLEAR_ERROR":
			return { ...state, error: false };

		case "GET_ALL_USERS": {
			return {
				...state,
				usersList: action.payload,
				loading: false,
				error: false,
			};
		}
		case "GET_ALL_PRODUCTS": {
			return {
				...state,
				productsList: action.payload,
				loading: false,
				error: false,
			};
		}

		case "SET_EDIT_PRODUCT": {
			return {
				...state,
				editProduct: action.payload,
				loading: false,
				error: false,
			};
		}
		case "CANCEL_EDIT_PRODUCT": {
			return {
				...state,
				editEnable: false,
				updateProductData: {},
			};
		}
		case "ENABLE_EDIT_PRODUCT": {
			const { category, description, image, price, rating, title } =
				state.editProduct;
			return {
				...state,
				editEnable: true,
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
		case "UPDATE_PRODUCT_DATA_CHANGE": {
			let { name, value } = action.payload;
			// value = value.trim();
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
		case "NEW_PRODUCT_DATA_CHANGE": {
			let { name, value } = action.payload;
			
			return {
				...state,
				newProductData: {
					...state.newProductData,
					[name]: value,
				},
			};
		}
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
          case "DELETE_PRODUCT_SUCCESS": {
			return {
				...state,
				editEnable: false,
			};
		}

		default:
			return state;
			break;
	}
};
