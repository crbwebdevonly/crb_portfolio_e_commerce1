//============
//============
//============
//============
//============

import { useCallback, useState } from "react";
import { useContext } from "react";
import { createContext } from "react";

//============
const FilterContext = createContext();
//============
//============
//============
const initialFilter = {
	search: "",
	minPrice: 0,
	maxPrice: 0,
	sort: "priceLow",
};
//============
//============
export const FilterContextProvider = ({ children }) => {
	//============
	//============
	const [filter, setfilter] = useState(initialFilter);
	//============
	//============
	//============
	//============
	//============
	const handleFilterQueryChange = (e) => {
		setfilter((p) => {
			let newFilterValues = {};
			const name = e.target.name;
			let value = e.target.value;
			console.log(name, value);
			if (name === "minPrice" || name === "maxPrice")
				value = Number(value);
			if (name === "minPrice") {
				if (value >= p.maxPrice) {
					return (newFilterValues = {
						...p,

						[name]: value,
						maxPrice: 0,
					});
				}
			}
			if (name === "maxPrice") {
				if (value <= p.minPrice) {
					return (newFilterValues = {
						...p,

						[name]: value,
						minPrice: 0,
					});
				}
			}
			newFilterValues = { ...p, [name]: value };
			return newFilterValues;
		});
	};
	//============
	//============
     
	//============
	const handleClearFilter = useCallback(() => {
		setfilter(initialFilter);
	}, []);

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
	//============
	//============
	//============
	const contextValues = {
		...filter,
		handleFilterQueryChange,
		handleClearFilter,
	};
	//============
	return (
		<FilterContext.Provider value={contextValues}>
			{children}
		</FilterContext.Provider>
	);
};
//============
//============
//============

export const useFilterContext = () => {
	const context = useContext(FilterContext);
	if (context === undefined) {
		throw new Error("useFilterContext was used outside of its Provider");
	}
	return context;
};
