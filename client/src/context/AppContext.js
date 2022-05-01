import { useCallback } from "react";
import { useContext, useReducer } from "react";
import { createContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { myAxios } from "../myAxios";
import { AppContextReducer } from "./AppContextReducer";

const AppContext = createContext();
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
const removeUserFromLocalStorage = () => {
	const user = localStorage.removeItem("crb-portfolio-EcommerceApp-user");
};
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
//============
const initial_ordersFilter = {
	searchEmail: "",
	orderStatus: "any",
	minAmount: 0,
	maxAmount: 0,
	dateRange: "all",
	sort: "new",
};
//============
//============
//============
//============
//============
const initialAppState = {
	loading: false,
	error: false,
	//============
	//============auth
	user: getUserFromLocalStorage() || null,

	//============filter-products
	filter: initialFilter,
	//============
	paginatorData: { itemsPerPage: 10, currentPage: 1, totalHitsCount: null },
	//============
	//============products
	sliderProductsList: [],
	productsList: [],
	currentProduct: {},
	//============
	//============cart
	cartItems: [],
	showMiniCart: false,
	totalQty: 0,
	totalAmount: 0,
	//============
	//============
	//============

	//============admin
	//============
	//============
	menuItems: ["stats", "users", "products", "orders"],
	//============
	//============users
	usersList: [],
	//============
	//============products
	editProduct: {},
	editProductEnable: false,
	updateProductData: {},
	newProductData: {
		title: "",
		price: "",
		description: "",
		category: "",
		image: "",
		rating: "",
	},
	//============
	//============orders
	ordersList: [],
	ordersFilter: initial_ordersFilter,
	ordersPaginatorData: {
		itemsPerPage: 10,
		currentPage: 1,
		totalHitsCount: null,
	},

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
	order: {},
	//============
	//============
	//============
};
//============
//============

export const AppContextProvider = ({ children }) => {
	//============
	const [state, dispatch] = useReducer(AppContextReducer, initialAppState);
	//============
	const navigate = useNavigate();
	//============
	//============
	//============
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
	const delyedClearError = () => {
		setTimeout(() => {
			dispatch({ type: "CLEAR_ERROR" });
		}, 2000);
	};
	//============
	//============
	const blinkError = () => {
		dispatch({ type: "SET_ERROR" });
		delyedClearError();
	};
	//============
	//============
	//============
	//============Auth
	const doLogin = async (user) => {
		try {
			const reply = await myAxios.post("/api/auth/login", user);
			dispatch({ type: "LOGIN_SUCCESS", payload: reply.data.user });
			setUserInLocalStorage(reply.data.user);
		} catch (error) {
			dispatch({ type: "LOGIN_FAIL" });
			toast.error("Login failed");
			blinkError();
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
	const doRegister = async (newUser) => {
		try {
			const reply = await myAxios.post("/api/auth/register", newUser);
			dispatch({ type: "REGISTER_SUCCESS", payload: reply.data });
		} catch (error) {
			toast.error("Registration failed");
			blinkError();
		}
	};
	//============
	//============
	//============filter
	//============
	//============
	const handleFilterChange = (e) => {
		const name = e.target.name;
		let value = e.target.value;
		dispatch({ type: "FILTER_CHANGE", payload: { name, value } });
	};
	//============
	//============
	const ClearFilter = () => {
		dispatch({ type: "RESET_FILTER", payload: initialFilter });
	};
	//============
	//============
	const ClearFilter_on_dismount = () => {
		ClearFilter();
	};
	//============
	//============
	const ClearFilter_and_reFetch_products = () => {
		ClearFilter();
		// must re-fetch products-with-initial-filter-query
		getCurrentPageProductsListWithQuery("initial");
	};
	//============
	//============
	//============
	//============
	//============
	//============
	const handleApplyFilter = () => {
		//
		//must change currentpage to 1.
		// refetch-occurs from useeffect on page
		// refetch products if page is already 1
		if (state.paginatorData.currentPage === 1)
			getCurrentPageProductsListWithQuery();
		else setCurrentPage(1);
	};
	//============
	//============
	//============paginator
	//============
	const setItemsPerPage = (arg) => {
		dispatch({ type: "SET_ITEMS_PER_PAGE", payload: arg });
		// must also change current page to 1??
		setCurrentPage(1);
	};
	//============
	//============
	const setCurrentPage = (arg) => {
		dispatch({ type: "SET_CURRENT_PAGE", payload: arg });
	};
	//============
	//============

	//============
	//============products
	//============
	//============
	//============
	const getSliderProducts = async () => {
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
	// //============
	// //============
	const getCurrentPageProductsListWithQuery = async (filterQuery) => {
		const { search, minPrice, maxPrice, sort } =
			filterQuery === "initial" ? initialFilter : state.filter;

		const { itemsPerPage, currentPage } = state.paginatorData;

		let qstring = `/api/products/getproductswithquery?search=${search}&minPrice=${minPrice}&maxPrice=${maxPrice}&sort=${sort}&currentPage=${currentPage}&itemsPerPage=${itemsPerPage}`;

		dispatch({ type: "FETCH_BEGIN" });

		try {
			const reply = await myAxios.get(qstring);
			dispatch({
				type: "GET_CURRENT_PAGE_PRODUCTS_LIST_AND_HITS_COUNT_WITH_QUERY",
				payload: reply.data,
			});
			dispatch({ type: "FETCH_SUCCESS" });
		} catch (error) {
			dispatch({ type: "FETCH_ERROR" });
		}
	};
	// //============
	// //============
	const load_Initial_Products_and_clear_filter = () => {
		ClearFilter();
		getCurrentPageProductsListWithQuery();
	};
	// //============
	// //============
	// //============
	// 	//============
	// const getCurrentPageProductsListWithQuery = useCallback( async (filterQuery) => {
	// 	const { search, minPrice, maxPrice, sort } = state.filter;
	// 	// console.log(filterQuery);

	// 	const { itemsPerPage, currentPage } = state.paginatorData;

	// 	let qstring = `/api/products/getproductswithquery?search=${search}&minPrice=${minPrice}&maxPrice=${maxPrice}&sort=${sort}&currentPage=${currentPage}&itemsPerPage=${itemsPerPage}`;

	// 	dispatch({ type: "FETCH_BEGIN" });

	// 	try {
	// 		const reply = await myAxios.get(qstring);
	// 		dispatch({
	// 			type: "GET_CURRENT_PAGE_PRODUCTS_LIST_AND_HITS_COUNT_WITH_QUERY",
	// 			payload: reply.data,
	// 		});
	// 		dispatch({ type: "FETCH_SUCCESS" });
	// 	} catch (error) {
	// 		dispatch({ type: "FETCH_ERROR" });
	// 		// console.log(error);
	// 	}
	// },[state.filter, state.paginatorData]);
	//============
	// //============
	//============
	//============
	const setCurrentProduct = (id) => {
		// no fetch
		dispatch({ type: "FETCH_BEGIN" });
		const findProduct = findProductItem(id);
		if (findProduct) {
			dispatch({
				type: "SET_CURRENT_PRODUCT_WITH_ID",
				payload: findProduct,
			});
			dispatch({ type: "FETCH_SUCCESS" });
		} else {
			dispatch({ type: "FETCH_ERROR" });
			setTimeout(() => {
				navigate("/productslist");
			}, 2000);
		}
	};
	//============
	//============cart
	const addToCart_with_ID = (id) => {
		// search both productsList and sliderProductsList
		// no fetch
		// updates totals
		dispatch({ type: "ADD_TO_CART_WITH_ID", payload: id });
		toast.success("Item added to cart");
	};
	//============
	//============
	const removeItemFromCartWithIndex = (index) => {
		dispatch({
			type: "REMOVE_ITEM_FROM_CART_WITH_INDEX",
			payload: index,
		});
	};
	//============
	//============
	const toggleShowMiniCart = () => {
		dispatch({ type: "TOGGLE_SHOW_MINI_CART" });
	};
	//============
	//============
	const resetCart = () => {
		dispatch({ type: "RESET_CART" });
	};
	//============
	//============
	const placeOrder = async () => {
		let orderData = {};
		// validate
		try {
			if (state.cartItems < 1) {
				throw new Error("Empty Cart");
			}
			if (!state.user) {
				throw new Error("You must login");
			}
			const orderItemsID = state.cartItems.map((e) => e._id);
			orderData = {
				customerID: state.user._id,
				orderItemsID,
				orderTotalAmount: state.totalAmount,
				orderTotalQuantity: state.totalQty,
				stringifiedOrderItems: JSON.stringify(state.cartItems),
				stringifiedCustomer: JSON.stringify(state.user),
			};
		} catch (error) {
			toast.error(error.message);
			if (!state.user) {
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
	//============admin
	//============
	const getAllUsers = async () => {
		dispatch({ type: "FETCH_BEGIN" });
		try {
			const reply = await myAxios.get("/api/auth/getallusers");
			dispatch({ type: "GET_ALL_USERS", payload: reply.data });
			dispatch({ type: "FETCH_SUCCESS" });
		} catch (error) {
			dispatch({ type: "FETCH_ERROR" });
		}
	};
	//============
	//============
	const setEditProduct = async (id) => {
		dispatch({ type: "FETCH_BEGIN" });
		try {
			const reply = await myAxios.get(
				`/api/products/getoneproduct/${id}`
			);
			dispatch({ type: "SET_EDIT_PRODUCT", payload: reply.data });
			dispatch({ type: "FETCH_SUCCESS" });
		} catch (error) {
			dispatch({ type: "FETCH_ERROR" });
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
		dispatch({
			type: "UPDATE_PRODUCT_DATA_CHANGE",
			payload: { name, value },
		});
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
			toast.error("error updating product");
			cancelEditProduct();
			blinkError();
		}
	};
	//============
	//============
	//============
	//============
	const handleNewProductDataChange = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		dispatch({
			type: "NEW_PRODUCT_DATA_CHANGE",
			payload: { name, value },
		});
	};
	//============
	//============
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
			return;
		}

		// post data
		try {
			const reply = await myAxios.post(
				"/api/products/add-new-product",
				validData
			);
			dispatch({ type: "ADD_NEW_PRODUCT_SUCCESS" });
			toast.success("added new Product");
			navigate("/admin/products");
		} catch (error) {
			toast.error("error adding new product" + error.response);
			blinkError();
		}
	};
	//============
	//============
	//============
	//============
	const deleteProduct = async (id) => {
		try {
			const reply = await myAxios.delete(
				`/api/products/delete-product/${id}`
			);
			// dispatch({ type: "DELETE_PRODUCT_SUCCESS" });
			cancelEditProduct();
			toast.warning(" Product deleted");
			navigate("/admin/products");
		} catch (error) {
			toast.error("error deleting");
			blinkError();
		}
	};
	//============
	//============

	//============
	//============orders
	//============
	//============
	//============
	const getAllOrders = async () => {
		dispatch({ type: "FETCH_BEGIN" });
		try {
			const reply = await myAxios.get(`/api/orders/getallorders`);
			dispatch({ type: "GET_ALL_ORDERS", payload: reply.data });
			dispatch({ type: "FETCH_SUCCESS" });
		} catch (error) {
			dispatch({ type: "SET_ERROR" });
		}
	};
	//============
	//============
	//============
	//============
	const deleteOrder = async (id) => {
		dispatch({ type: "FETCH_BEGIN" });

		try {
			const reply = await myAxios.delete(
				`/api/orders/deleteorder/${id}`
			);
			dispatch({ type: "DELETE_ORDER_SUCCESS", payload: id });
			dispatch({ type: "FETCH_SUCCESS" });

			toast.warning(" Order deleted");
		} catch (error) {
			toast.error("error deleting");
			blinkError();
		}
	};
	//============
	//============
	//============
	const updateOrder = async (id, updateData) => {
		dispatch({ type: "FETCH_BEGIN" });

		try {
			const reply = await myAxios.put(
				`/api/orders/updateorder/${id}`,
				updateData
			);
			dispatch({ type: "UPDATE_ORDER_SUCCESS", payload: reply.data });
			dispatch({ type: "FETCH_SUCCESS" });

			toast.warning(" Order updated");
		} catch (error) {
			toast.error("error updating");
			blinkError();
		}
	};
	//============
	//============
	//============ordersfilter
	//============
	//============
	const handleOrdersFilterChange = (e) => {
		const name = e.target.name;
		let value = e.target.value;
		dispatch({ type: "ORDERS_FILTER_CHANGE", payload: { name, value } });
	};
	//============
	//============
	const ClearOrdersFilter = () => {
		dispatch({ type: "RESET_ORDERS_FILTER", payload: initialFilter });
	};
	//============
	//============
	const ClearOrdersFilter_on_dismount = () => {
		ClearOrdersFilter();
	};
	//============
	//============
	const ClearOrdersFilter_and_reFetch_products = () => {
		ClearOrdersFilter();
		// must re-fetch products-with-initial-filter-query
		getCurrentPageOrdersListWithQuery("initial");
	};
	//============
	//============
	// //============
	// //============
	const getCurrentPageOrdersListWithQuery = async (filterQuery) => {
		const {
			searchEmail,
			orderStatus,
			minAmount,
			maxAmount,
			dateRange,
			sort,
		} =
			filterQuery === "initial"
				? initial_ordersFilter
				: state.ordersFilter;

		const { itemsPerPage, currentPage } = state.ordersPaginatorData;

		let qstring = `/api/orders/getorderswithquery?searchEmail=${searchEmail}&orderStatus={orderStatus}&minAmount=${minAmount}&maxAmount=${maxAmount}&dateRange={dateRange}&sort=${sort}&currentPage=${currentPage}&itemsPerPage=${itemsPerPage}`;

		dispatch({ type: "FETCH_BEGIN" });

		try {
			const reply = await myAxios.get(qstring);
			dispatch({
				type: "GET_CURRENT_PAGE_PRODUCTS_LIST_AND_HITS_COUNT_WITH_QUERY",
				payload: reply.data,
			});
			dispatch({ type: "FETCH_SUCCESS" });
		} catch (error) {
			dispatch({ type: "FETCH_ERROR" });
		}
	};
	// //============
	// //============
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
	//============
	//============
	//============
	//============
	//============
	//============
	const contextValues = {
		...state,

		//============auth
		doLogin,
		doLogout,
		doRegister,
		//============filter
		handleFilterChange,
		ClearFilter_on_dismount,
		ClearFilter_and_reFetch_products,
		handleApplyFilter,
		//============paginator
		setItemsPerPage,
		setCurrentPage,
		//============products
		getSliderProducts,
		getCurrentPageProductsListWithQuery,
		setCurrentProduct,
		load_Initial_Products_and_clear_filter,
		//============cart
		addToCart_with_ID,
		removeItemFromCartWithIndex,
		toggleShowMiniCart,
		resetCart,
		placeOrder,
		//============admin
		getAllUsers,
		setEditProduct,
		setEnableEditProduct,
		cancelEditProduct,
		handleupdateProductDataChange,
		applyProductUpdate,
		handleNewProductDataChange,
		addNewProduct,
		deleteProduct,
		getAllOrders,
		deleteOrder,
		updateOrder,
	};
	//============
	//============
	return (
		<AppContext.Provider value={contextValues}>
			{children}
		</AppContext.Provider>
	);
};

//============
//============
export const useAppContext = () => {
	const context = useContext(AppContext);
	if (context === undefined) throw new Error("App Context---crb");
	return context;
};
//============
//============
