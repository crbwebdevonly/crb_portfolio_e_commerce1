import { useContext, useReducer } from "react";
import { useEffect } from "react";
import { createContext } from "react";
import { AuthContext } from "./AuthContext";
import { CheckoutContextReducer } from "./CheckoutContextReducer";

//============
//============
export const CheckoutContext = createContext();
//============
//============
const initialState = {
	cartItems: [],
	showMiniCart: false,
	totalQty: 0,
	totalAmount: 0,
};
//============
//============
export const CheckoutContextProvider = ({ children }) => {
	//============
	//============
	const { user } = useContext(AuthContext);
	//============
	//============
	const [state, dispatch] = useReducer(CheckoutContextReducer, initialState);
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
	//============
	const addItem = (item) => {
		console.log("add-dispatch");

		dispatch({ type: "ADD_ITEM", payload: item });
	};
	//============
	//============
	const removeItem = (id) => {
		dispatch({ type: "REMOVE_ITEM", payload: id });
	};
	//============
	//============
	const toggleShowMiniCart = () => {
		dispatch({ type: "TOGGLE_MINI_CART" });
	};
	//============
	//============
	const resetCart = () => {
		dispatch({ type: "RESET", payload: initialState });
	};
	//============
	//============
	//============
	const contextValues = {
		...state,
		addItem,
		removeItem,
		toggleShowMiniCart,
		resetCart,
	};
	//============
	//============
	return (
		<CheckoutContext.Provider value={contextValues}>
			{children}
		</CheckoutContext.Provider>
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
