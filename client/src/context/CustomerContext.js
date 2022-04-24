import { useContext, useReducer } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { createContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { myAxios } from "../myAxios";
import { AuthContext } from "./AuthContext";
import { CustomerContextReducer } from "./CustomerContextReducer";

//============
//============
export const CustomerContext = createContext();
//============
//============
const initialFilterQuery = {
	search: "",
	minPrice: 0,
	maxPrice: 0,
	sort: "priceLow",
};
//============
//============
//============
const initialState = {
	loading: false,
	error: false,
	//============
	//============
	sliderProductsList: [],
	//============
	//============
	//============
	productsList: [],
	currentProduct: {},
	//============
	//============
	filterQuery: initialFilterQuery,
	//============
	//============
	paginatorData: { itemsPerPage: 10, currentPage: 1, hitsCount: null },
	//============
	//============
	cartItems: [],
	showMiniCart: false,
	totalQty: 0,
	totalAmount: 0,
	//============
	//============
	order: {},
	//============
	//============
};
//============
//============
export const CustomerContextProvider = ({ children }) => {
	//============
	//============
	const { user } = useContext(AuthContext);
	//============
	//============
	const [state, dispatch] = useReducer(CustomerContextReducer, initialState);
	//============
	//============
	const [filterRefreshTrigger, setFilterRefreshTrigger] = useState(false);
	//============
	//============
	const navigate = useNavigate();
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
	// useEffect(() => {
	// 	//   refetch products upon paginator data changes
	// 	// and filter apply
	// 	getProductsWithQuery();
	//      // issue=> this is being triggered at app start into homepage
	//      // which is causing inifinite loop
	//      // make it so it doesn't run on homepage load
	//      // solution may be to move this useeffect into ptoductspage component

	// 	return () => {
	// 		//     second
	// 	};
	// }, [
	// 	state.paginatorData.itemsPerPage,
	// 	state.paginatorData.currentPage,
	// 	filterRefreshTrigger,
	// ]);

	//============
	//============
	//============
	const findProductItem = (id) => {
		let findItem = state.sliderProductsList.find((e) => e._id === id);
		if (!findItem) {
			findItem = state.productsList.find((e) => e._id === id);
		}
		return findItem;
	};
	//============
	//============
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
	//============
	const getSliderDataID_v2 = async () => {
		// get list of all ids and choose 5 at random...then set sliderData
		dispatch({ type: "FETCH_BEGIN" });

		try {
			const reply = await myAxios.get("/api/products/getsliderdataid");
			//
			const total = reply.data.length;
			let randSet = new Set();
			while (randSet.size < 5) {
				let n = Math.floor(Math.random() * total);
				randSet.add(n);
			}
			const arrayID = [];
			randSet.forEach((e) => arrayID.push(reply.data[e]));
			//
			const reply2 = await myAxios.post(
				"/api/products/getsliderproducts",
				arrayID
			);

			dispatch({ type: "GET_SLIDER_PRODUCTS", payload: reply2.data });
			dispatch({ type: "FETCH_SUCCESS" });
		} catch (error) {
			dispatch({ type: "FETCH_ERROR" });
		}
	};
	//============
	//============
	//============
	//============
	const getSliderProducts = async (arrayID) => {
		// dispatch({ type: "FETCH_BEGIN" });
		// try {
		// 	const reply = await myAxios.get(
		// 		"/api/products/getsliderproducts"
		// 	);
		// 	dispatch({ type: "GET_SLIDER_DATA_ID", payload: reply.data });
		// 	dispatch({ type: "FETCH_SUCCESS" });
		// } catch (error) {
		// 	dispatch({ type: "FETCH_ERROR" });
		// }
	};
	//============
	//============
	//============
	//============
	//============
	//============
	const getAllProducts = async () => {
		dispatch({ type: "FETCH_BEGIN" });

		try {
			const reply = await myAxios.get("/api/products/getallproducts");
			dispatch({ type: "GET_ALL_PRODUCTS", payload: reply.data });
			dispatch({ type: "FETCH_SUCCESS" });
		} catch (error) {
			dispatch({ type: "FETCH_ERROR" });
			// console.log(error);
		}
	};
	//============
	//============
	//============
	const handleFilterQueryChange = (e) => {
		const name = e.target.name;
		let value = e.target.value;
		dispatch({ type: "FILTER_QUERY_CHANGE", payload: { name, value } });
	};
	//============
	//============
	//============
	//============
	const handleApplyFilter = (e) => {
		//
		// change currentpage to 1.....page change trigers re-fetch
		setCurrentPage(1);
		// refresh trigger ??needed?? yes--when current page is already 1
		setFilterRefreshTrigger((p) => !p);
	};
	//============
	//============
	const handleClearFilter = () => {
		setCurrentPage(1);
		dispatch({ type: "RESET_FILTER_QUERY", payload: initialFilterQuery });
		getProductsWithQuery("clearFilter");
	};
	//============
	//============
	const getProductsWithQuery = async (arg) => {
		const query =
			arg === "clearFilter" ? initialFilterQuery : state.filterQuery;
		const { search, minPrice, maxPrice, sort } = query;
		const { itemsPerPage, currentPage, hitsCount } = state.paginatorData;

		let qstring = `/api/products/getproductswithquery?search=${search}&minPrice=${minPrice}&maxPrice=${maxPrice}&sort=${sort}&currentPage=${currentPage}&itemsPerPage=${itemsPerPage}`;

		dispatch({ type: "FETCH_BEGIN" });

		try {
			const reply = await myAxios.get(qstring);
			dispatch({
				type: "GET_ALL_PRODUCTS_WITH_QUERY",
				payload: reply.data,
			});
			dispatch({ type: "FETCH_SUCCESS" });
		} catch (error) {
			dispatch({ type: "FETCH_ERROR" });
			// console.log(error);
		}
	};
	//============
	//============
	const setItemsPerPage = (arg) => {
		dispatch({ type: "SET_ITEMS_PER_PAGE", payload: arg });
		// must also change current page to 1
		setCurrentPage(1);
	};
	//============
	//============
	//============
	//============
	const setCurrentPage = (arg) => {
		dispatch({ type: "SET_CURRENT_PAGE", payload: arg });
	};
	//============
	//============
	//============
	//============
	const setCurrentProduct = async (id) => {
		dispatch({ type: "FETCH_BEGIN" });
		try {
			const reply = await myAxios.get(
				`/api/products/getoneproduct/${id}`
			);
			if (!reply) {
				throw new Error("Product NOT found");
			}

			dispatch({ type: "SET_CURRENT_PRODUCT", payload: reply.data });

			dispatch({ type: "FETCH_SUCCESS" });
		} catch (error) {
			dispatch({ type: "FETCH_ERROR" });
			setTimeout(() => {
				navigate("/productslist");
			}, 1000);
		}
	};
	//============
	//============
	//============
	//============
	const setCurrentProduct_v2 = (id) => {
		// no fetch
		dispatch({ type: "FETCH_BEGIN" });
		const findProduct = findProductItem(id);
		if (findProduct) {
			dispatch({
				type: "SET_CURRENT_PRODUCT_V2",
				payload: findProduct,
			});
			dispatch({ type: "FETCH_SUCCESS" });
		} else dispatch({ type: "FETCH_ERROR" });
	};
	//============
	//============
	//============
	// //============
	// //============
	// const addItem = (item) => {
	// 	console.log("add-dispatch");

	// 	dispatch({ type: "ADD_ITEM", payload: item });
	// };
	// //============
	// //============
	// const addToCart_with_ID_v1_use_on_product_item = (id) => {
	// 	dispatch({ type: "ADD_TO_CART_WITH_ID_V1", payload: id });
	// 	toast.success("Item added to cart");
	// };
	// //============
	// //============
	// //============
	// //============
	const addToCart_with_ID_v3 = (id) => {
		// search both productsList and sliderProductsList
		// no fetch
		dispatch({ type: "ADD_TO_CART_WITH_ID_V3", payload: id });
		toast.success("Item added to cart");
	};
	//============
	//============

	// //============
	// //============
	// const addToCart_with_fetch_v2 = async (id) => {
	// 	dispatch({ type: "FETCH_BEGIN" });
	// 	try {
	// 		const reply = await myAxios.get(
	// 			`/api/products/getoneproduct/${id}`
	// 		);
	// 		if (!reply) {
	// 			throw new Error("error adding to cart-Product NOT found");
	// 		}

	// 		dispatch({
	// 			type: "ADD_TO_CART_WITH_FETCH_V2",
	// 			payload: reply.data,
	// 		});

	// 		dispatch({ type: "FETCH_SUCCESS" });
	// 	} catch (error) {
	// 		dispatch({ type: "FETCH_ERROR" });
	// 		setTimeout(() => {
	// 			navigate("/productslist");
	// 		}, 1000);
	// 	}
	// };
	// //============
	// //============
	//============
	//============
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
		dispatch({ type: "TOGGLE_MINI_CART" });
	};
	//============
	//============
	const resetCart = () => {
		dispatch({ type: "RESET_CART", payload: initialState });
	};
	//============
	//============
	//============
	//============
	//============
	const placeOrder = async () => {
		let orderData = {};
		// validate
		try {
			if (state.cartItems < 1) {
				throw new Error("Empty Cart");
			}
			if (!user) {
				throw new Error("You must login");
			}
			const orderItemsID = state.cartItems.map((e) => e._id);
			orderData = {
				customerID: user._id,
				orderItemsID,
				orderTotalAmount: state.totalAmount,
				orderTotalQuantity: state.totalQty,
				stringifiedOrderItems: JSON.stringify(state.cartItems),
				stringifiedCustomer: JSON.stringify(user),
			};
		} catch (error) {
			toast.error(error.message);
			if (!user) {
				setTimeout(() => {
					navigate("login-register");
				}, 1500);
			}
			return;
		}
		// place order

		try {
			const reply = await myAxios.post(
				"/api/orders/createorder",
				orderData
			);
			// dispatch({type:"ORDER_SUBMIT_SUCCESS"})
			toast.success("order placed");
			setTimeout(() => {
				resetCart();
				navigate("/");
			}, 2000);
		} catch (error) {
			toast.error("error-placing order");
			toast.error(error.response.msg);
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
	const contextValues = {
		...state,

		filterRefreshTrigger,
		getAllProducts,
		getSliderDataID_v2,
		handleFilterQueryChange,
		handleApplyFilter,
		handleClearFilter,
		getProductsWithQuery,
		setItemsPerPage,
		// setCurrentProduct,
          setCurrentProduct_v2,
		setCurrentPage,
		// addItem,
		// addItemWithID,
		// addToCart_v2,
		// addToCart_with_ID_v1_use_on_product_item,
		// addToCart_with_fetch_v2,
		addToCart_with_ID_v3,

		removeItemWithID,
		removeItemWithIndex,
		toggleShowMiniCart,
		resetCart,
		placeOrder,
	};
	//============
	//============
	return (
		<CustomerContext.Provider value={contextValues}>
			{children}
		</CustomerContext.Provider>
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
