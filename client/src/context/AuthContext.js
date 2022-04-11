//============
//============
//============
import { createContext, useReducer } from "react";
import { myAxios } from "../myAxios";
import { AuthContextReducer } from "./AuthContextReducer";

//============
export const AuthContext = createContext();
//============
//============
const initialState = {
	loggedInUser: null,
};
//============
//============
export const AuthContextProvider = ({ children }) => {
	//============
	//============
	const [state, dispatch] = useReducer(AuthContextReducer, initialState);
	//============

	//============
	const doLogin = async (user) => {
          try {
               const reply = await    myAxios.post(
                    "/api/auth/login",
                    user
               );
               // console.log(action.payload, "reducer2");
               console.log(reply);
          } catch (error) {
               console.log(error);
          }
		dispatch({ type: "DO_LOGIN", payload: user });
	};
	//============
	//============
	const doLogout = (user) => {
		dispatch({ type: "DO_LOGOUT" });
	};
	//============
	//============
	const provideValues = { ...state, doLogin, doLogout };
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
