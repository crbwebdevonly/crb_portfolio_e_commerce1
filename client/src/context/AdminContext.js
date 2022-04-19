import { useState } from "react";
import { useReducer } from "react";
import { createContext } from "react";
import { myAxios } from "../myAxios";
import { AdminContextReducer } from "./AdminContextReducer";

export const AdminContext = createContext();
//============
//============
//============
//============
//============
//============
//============
//============
//============
export const AdminContextProvider = ({ children }) => {
	//============
	//============
	const initialState = {
		error: false,
		loading: false,
		menuItems: ["stats", "users", "products", "orders"],
		usersList: [],
		productsList: [],
		editProduct: {},
		updateProductData: {},
		editEnable: false,
	};
	//============
	//============
	const [state, dispatch] = useReducer(AdminContextReducer, initialState);
	//============
	//============
	//============
	//============
	//============
	const getAllUsers = async () => {
		try {
			const reply = await myAxios.get("/api/auth/getallusers");
			// console.log(reply);
			dispatch({ type: "GET_ALL_USERS", payload: reply.data });
		} catch (error) {
			// console.log(error);
			dispatch({ type: "SET_ERROR" });
		}
	};
	//============
	//============
	//============
	//============
	//============
	//============
	const getAllProducts = async () => {
		dispatch({ type: "SET_LOADING_TRUE" });
		try {
			const reply = await myAxios.get("/api/products/getallproducts");
			dispatch({ type: "GET_ALL_PRODUCTS", payload: reply.data });
		} catch (error) {
			// console.log(error);
			dispatch({ type: "SET_ERROR" });
		}
	};
	//============
	//============
	const setEditProduct = async (id) => {
		dispatch({ type: "SET_LOADING_TRUE" });

		try {
			const reply = await myAxios.get(
				`/api/products/getoneproduct/${id}`
			);
			dispatch({ type: "SET_EDIT_PRODUCT", payload: reply.data });
		} catch (error) {
			dispatch({ type: "SET_ERROR" });
		}
	};
	//============
	//============
	const setEnableEditProduct = () => {
		dispatch({ type: "ENABLE_EDIT_PRODUCT" });
	};
	//============
	//============
	const cancelEditProduct = () => {
		dispatch({ type: "CANCEL_EDIT_PRODUCT" });
	};
	//============
	//============
	const handleupdateProductDataChange = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		console.log(name, "name", value);
		dispatch({
			type: "UPDATE_PRODUCT_DATA_CHANGE",
			payload: { name, value },
		});
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
	const contextValues = {
		...state,
		getAllUsers,
		getAllProducts,
		setEditProduct,
		setEnableEditProduct,
		cancelEditProduct,
		handleupdateProductDataChange,
	};
	return (
		<AdminContext.Provider value={contextValues}>
			{children}
		</AdminContext.Provider>
	);
};
//============
//============
