import { useState } from "react";
import { useReducer } from "react";
import { createContext } from "react";
import { toast } from "react-toastify";
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
		//============
		error: false,
		loading: false,
		//============
		//============
		menuItems: ["stats", "users", "products", "orders"],
		//============
		//============
		usersList: [],
		//============
		//============
		productsList: [],
		editProduct: {},
		editEnable: false,
		updateProductData: {},
		newProductData: {
			title: "",
			price: "",
			description: "",
			category: "",
			image: "",
			rating: "",
		},
		isValidNewProductData: false,
		//============
		//============
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
		// console.log(name, "name", value);
		dispatch({
			type: "UPDATE_PRODUCT_DATA_CHANGE",
			payload: { name, value },
		});
	};
	//============
	//============
	//============
	//============
	const handleNewProductDataChange = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		// console.log(name, "name", value);
		dispatch({
			type: "NEW_PRODUCT_DATA_CHANGE",
			payload: { name, value },
		});
	};
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
	const applyProductUpdate = async (id) => {
		dispatch({ type: "FETCH_BEGIN" });
		try {
			const reply = await myAxios.put(
				`/api/products/updateproduct/${id}`,
				state.updateProductData
			);
			dispatch({ type: "SET_EDIT_PRODUCT", payload: reply.data });
			cancelEditProduct();
			dispatch({ type: "FETCH_SUCCESS" });
		} catch (error) {
			cancelEditProduct();
			dispatch({ type: "FETCH_ERROR" });
			delyedClearError();
		}
	};
	//============
	//============
	const addNewProduct = async () => {
		// check valid
		let validData = null;
		try {
			for (const v of Object.values(state.newProductData)) {
				if (!v) throw new Error("No Empty values allowed");
			}
			let { price, rating, ...rest } = state.newProductData;
			price = Number(price);
			rating = Number(rating);
			if (isNaN(price) || isNaN(rating)) {
				throw new Error("price / rating must be numbers");
			}
			validData = { ...rest, price, rating };
		} catch (error) {
			toast.error(error.message);
			blinkError();
		}

		// post data
		try {
			const reply = await myAxios.post(
				"/api/products/add-new-product",
				validData
			);
               toast.success("added new Product")
		} catch (error) {
			toast.error(error.response);
			blinkError();
		}
	};
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
		applyProductUpdate,
		handleNewProductDataChange,
		addNewProduct,
	};
	return (
		<AdminContext.Provider value={contextValues}>
			{children}
		</AdminContext.Provider>
	);
};
//============
//============
