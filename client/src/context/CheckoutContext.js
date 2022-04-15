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
	const addItemWithID = (id) => {
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
		console.log("minicart show dispatch");
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
		addItemWithID,
		removeItemWithID,
		removeItemWithIndex,
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
