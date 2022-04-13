import { useReducer } from "react";
import { createContext } from "react";
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
	const [state, dispatch] = useReducer(CheckoutContextReducer, initialState);
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
	//============
	//============
	//============
	const contextValues = {
		...state,
		addItem,
		removeItem,
		toggleShowMiniCart,
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
