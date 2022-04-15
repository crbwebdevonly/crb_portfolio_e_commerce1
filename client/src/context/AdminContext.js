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
	//============
	//============
	//============
	//============
	//============
	//============
	//============
	//============
	const contextValues = { ...state, getAllUsers };
	return (
		<AdminContext.Provider value={contextValues}>
			{children}
		</AdminContext.Provider>
	);
};
//============
//============
