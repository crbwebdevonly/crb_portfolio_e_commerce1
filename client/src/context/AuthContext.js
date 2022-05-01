//============
//============
//============
import { createContext, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { myAxios } from "../myAxios";
import { AuthContextReducer } from "./AuthContextReducer";

//============
export const AuthContext = createContext();
//============
//============
//============
const getUserFromLocalStorage = () => {
	const user = localStorage.getItem("crb-portfolio-EcommerceApp-user");
	return JSON.parse(user);
};
//============
//============
const setUserInLocalStorage = (user) => {
	const setUser = localStorage.setItem(
		"crb-portfolio-EcommerceApp-user",
		JSON.stringify(user)
	);
	return user;
};
//============
//============
//============
//============
const removeUserFromLocalStorage = () => {
	const user = localStorage.removeItem("crb-portfolio-EcommerceApp-user");
};
//============
//============
//============
const initialState = {
	user: getUserFromLocalStorage() || null,
	error: false,
};
//============
//============
export const AuthContextProvider = ({ children }) => {
	//============
	//============
	const [state, dispatch] = useReducer(AuthContextReducer, initialState);
	//============
	const navigate = useNavigate();

	//============
	//============
	//============
	const doLogin = async (user) => {
		try {
			const reply = await myAxios.post("/api/auth/login", user);
			dispatch({ type: "LOGIN_SUCCESS", payload: reply.data.user });
			setUserInLocalStorage(reply.data.user);
		} catch (error) {
			dispatch({ type: "LOGIN_FAIL" });
			setError();
		}
	};
	//============
	//============
	const doLogout = (user) => {
		dispatch({ type: "DO_LOGOUT" });
		removeUserFromLocalStorage();

		navigate("/");
	};
	//============
	//============
	const setError = () => {
		dispatch({ type: "SET_ERROR" });
		setTimeout(() => {
			dispatch({ type: "CLEAR_ERROR" });
		}, 2000);
	};
	//============
	//============
	const doRegister = async (newUser) => {
		try {
			const reply = await myAxios.post("/api/auth/register", newUser);
			console.log(reply);
			dispatch({ type: "REGISTER_SUCCESS", payload: reply.data });
		} catch (error) {
			setError();
		}
	};
	//============
	//============
	//============
	//============
	// const doCreateNewUser = async (newUser) => {
	// 	try {
	// 		const reply = await myAxios.post("/api/auth/register", newUser);
	// 		dispatch({ type: "CREATE_NEW_USER_SUCCESS", payload: reply.data });
	// 	} catch (error) {
	// 		setError();
	// 	}
	// };
	//============
	//============
	//============
	//============
	//============
	//============
	const provideValues = { ...state, doLogin, doLogout, doRegister };
	//============
	//============
	return (
		<AuthContext.Provider value={provideValues}>
			{children}
		</AuthContext.Provider>
	);
};
//============
//============
//============
//============
//============
