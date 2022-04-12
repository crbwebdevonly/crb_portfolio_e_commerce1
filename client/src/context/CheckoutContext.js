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
		dispatch({ type: "ADD_ITEM", payload: item });
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
	const contextValues = { ...state, addItem };
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
