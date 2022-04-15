import { useState } from "react";
import { createContext } from "react";

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
		menuItems: ["stats", "Users", "Products", "Orders"],
	};
	//============
	//============
	const [state, setState] = useState(initialState);
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
	//============
	const contextValues = { ...state };
	return (
		<AdminContext.Provider value={contextValues}>
			{children}
		</AdminContext.Provider>
	);
};
//============
//============
