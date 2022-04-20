import { useContext, useReducer } from "react";
import { useEffect } from "react";
import { createContext } from "react";
import { toast } from "react-toastify";
import { myAxios } from "../myAxios";
import { AuthContext } from "./AuthContext";
import { CustomerContextReducer } from "./CustomerContextReducer";

//============
//============
export const CustomerContext = createContext();
//============
//============
const initialState = {
	loading: false,
	error: false,
	//============
	//============
	productsList: [],
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
			};
			console.log(orderData);
			toast.success("order placed");
		} catch (error) {
			toast.error(error.message);
			return;
		}
		// place order

		try {
			const reply = await myAxios.post("/api/orders/createorder",orderData);
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
	const contextValues = {
		...state,
		getAllProducts,
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
