import { useContext, useReducer } from "react";
import { useEffect } from "react";
import { createContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { myAxios } from "../myAxios";
import { AuthContext } from "./AuthContext";
import { CustomerContextReducer } from "./CustomerContextReducer";

//============
//============
export const CustomerContext = createContext();
//============
//============
const initialFilterQuery = {
	search: "",
	minPrice: 0,
	maxPrice: 0,
	sort: "priceLow",
};
//============
//============
//============
const initialState = {
	loading: false,
	error: false,
	//============
	//============
	productsList: [],
	currentProduct: {},
	//============
	//============
	filterQuery: initialFilterQuery,
	//============
	//============
	cartItems: [],
	showMiniCart: false,
	totalQty: 0,
	totalAmount: 0,
	//============
	//============
	order: {},
	//============
	//============
};
//============
//============
export const CustomerContextProvider = ({ children }) => {
	//============
	//============
	const { user } = useContext(AuthContext);
	//============
	//============
	const [state, dispatch] = useReducer(CustomerContextReducer, initialState);
	//============
	//============
	const navigate = useNavigate();
	//============
	//============
	useEffect(() => {
		//   first
		if (!user) {
			resetCart();
		}

		return () => {
			//     second
		};
	}, [user]);

	//============
	//============

	//============
	//============
	//============
	//============
	//============
	const delyedClearError = () => {
		setTimeout(() => {
			dispatch({ type: "CLEAR_ERROR" });
		}, 2000);
	};
	//============
	//============
	const blinkError = () => {
		dispatch({ type: "FETCH_ERROR" });
		delyedClearError();
	};
	//============
	//============
	//============
	//============
	const getAllProducts = async () => {
		dispatch({ type: "FETCH_BEGIN" });

		try {
			const reply = await myAxios.get("/api/products/getallproducts");
			dispatch({ type: "GET_ALL_PRODUCTS", payload: reply.data });
			dispatch({ type: "FETCH_SUCCESS" });
		} catch (error) {
			dispatch({ type: "FETCH_ERROR" });
			// console.log(error);
		}
	};
	//============
	//============
	//============
	const handleFilterQueryChange = (e) => {
		const name = e.target.name;
		let value = e.target.value;
		dispatch({ type: "FILTER_QUERY_CHANGE", payload: { name, value } });
	};
	//============
	//============
	const handleClearFilter = () => {
		dispatch({ type: "RESET_FILTER_QUERY", payload: initialFilterQuery });
		getProductsWithQuery("clearFilter");
	};
	//============
	//============
	const getProductsWithQuery = async (arg) => {
		const query =
			arg === "clearFilter" ? initialFilterQuery : state.filterQuery;
		console.log(query, "query");
		const { search, minPrice, maxPrice, sort } = query;
		let qstring = `/api/products/getproductswithquery?search=${search}&minPrice=${minPrice}&maxPrice=${maxPrice}&sort=${sort}`;

		dispatch({ type: "FETCH_BEGIN" });

		try {
			const reply = await myAxios.get(qstring);
			dispatch({ type: "GET_ALL_PRODUCTS", payload: reply.data });
			dispatch({ type: "FETCH_SUCCESS" });
		} catch (error) {
			dispatch({ type: "FETCH_ERROR" });
			// console.log(error);
		}
	};
	//============
	//============
	//============
	//============
	const setCurrentProduct = (id) => {
		dispatch({ type: "FETCH_BEGIN" });
		try {
			const findProduct = state.productsList.find((e) => e._id === id);
			if (!findProduct) {
				throw new Error("Product NOT found");
			}
			dispatch({ type: "SET_CURRENT_PRODUCT", payload: findProduct });

			dispatch({ type: "FETCH_SUCCESS" });
		} catch (error) {
			dispatch({ type: "FETCH_ERROR" });
			setTimeout(() => {
				navigate("/productslist");
			}, 1000);
		}
	};
	//============
	//============
	//============
	//============
	//============
	const addItem = (item) => {
		console.log("add-dispatch");

		dispatch({ type: "ADD_ITEM", payload: item });
	};
	//============
	//============
	const addItemWithID = (id) => {
		console.log("add-dispatch-id", id);
		dispatch({ type: "ADD_ITEM_WITH_ID", payload: id });
	};
	//============
	//============
	const removeItemWithID = (id) => {
		dispatch({ type: "REMOVE_ITEM_WITH_ID", payload: id });
	};
	//============
	//============
	const removeItemWithIndex = (index) => {
		dispatch({ type: "REMOVE_ITEM_WITH_INDEX", payload: index });
	};
	//============
	//============
	const toggleShowMiniCart = () => {
		dispatch({ type: "TOGGLE_MINI_CART" });
	};
	//============
	//============
	const resetCart = () => {
		dispatch({ type: "RESET_CART", payload: initialState });
	};
	//============
	//============
	//============
	//============
	//============
	const placeOrder = async () => {
		let orderData = {};
		// validate
		try {
			if (state.cartItems < 1) {
				throw new Error("Empty Cart");
			}
			if (!user) {
				throw new Error("You must login");
			}
			const orderItemsID = state.cartItems.map((e) => e._id);
			orderData = {
				customerID: user._id,
				orderItemsID,
				orderTotalAmount: state.totalAmount,
				orderTotalQuantity: state.totalQty,
				stringifiedOrderItems: JSON.stringify(state.cartItems),
				stringifiedCustomer: JSON.stringify(user),
			};
			console.log(orderData);
		} catch (error) {
			toast.error(error.message);
			return;
		}
		// place order

		try {
			const reply = await myAxios.post(
				"/api/orders/createorder",
				orderData
			);
			// dispatch({type:"ORDER_SUBMIT_SUCCESS"})
			toast.success("order placed");
			setTimeout(() => {
				resetCart();
				navigate("/");
			}, 2000);
		} catch (error) {
			toast.error("error-placing order");
			toast.error(error.response.msg);
		}
	};
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
	const contextValues = {
		...state,
		getAllProducts,
		handleFilterQueryChange,
		handleClearFilter,
		getProductsWithQuery,
		setCurrentProduct,
		addItem,
		addItemWithID,
		removeItemWithID,
		removeItemWithIndex,
		toggleShowMiniCart,
		resetCart,
		placeOrder,
	};
	//============
	//============
	return (
		<CustomerContext.Provider value={contextValues}>
			{children}
		</CustomerContext.Provider>
	);
};
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
