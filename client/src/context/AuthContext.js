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
const initialState = {
	user: null,
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
		} catch (error) {
			dispatch({ type: "LOGIN_FAIL" });
			setError();
		}
	};
	//============
	//============
	const doLogout = (user) => {
		dispatch({ type: "DO_LOGOUT" });
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
