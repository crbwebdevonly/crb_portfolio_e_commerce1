import { useContext, useReducer } from "react";
import { createContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { myAxios } from "../myAxios";
import { AppContextReducer } from "./AppContextReducer";
// filebase
//
import { ref, uploadBytes } from "firebase/storage";
import { firebaseStorage } from "../firebaseConfig";
import { uploadBytesResumable, getDownloadURL } from "firebase/storage";
// filebase

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
const initialAdminStats = {
	usersStats: { total: 0, today: 0, week: 0 },
	ordersStats: {
		completed: 0,
		issue: 0,
		processing: 0,
		aggregateTotalSales: 0,
		aggregateMonthlySales: { amount: 0, count: 0 },
		aggregateWeeklySales: { amount: 0, count: 0 },
		aggregateTodaySales: { amount: 0, count: 0 },
	},
	productsStats: { total: 0, today: 0, week: 0, month: 0 },
};
//============
//============
// const initialEditOrder = {
//      _id:"",
//      createdAt:"",
//      customerID:"",
//      status:"",
//      issue:"",
//      orderItemsID,
//      orderTotalAmount,
//      orderTotalQuantity,
//      stringifiedOrderItems,
//      stringifiedCustomer,
// }
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
	customerProfileOrdersList: [],

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
	menuItems: ["Stats", "Users", "Products", "Orders"],
	adminStats: initialAdminStats,
	//============
	//============users
	usersList: [],
	//============
	//============products
	editProduct: {},
	editProductEnable: false,
	updateProductData: {},
	// newProductData: {
	// 	title: "",
	// 	price: "",
	// 	description: "",
	// 	category: "",
	// 	// image: "",
	// 	rating: "",
	// },
	//============
	//============orders
	editOrder: {},
	ordersList: [],
	ordersFilter: initial_ordersFilter,
	order_arg: null,
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
		resetCart();

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
	const doCustomerProfileUpdate = async (newProfile = {}) => {
		dispatch({ type: "FETCH_BEGIN" });

		try {
			if (newProfile.imageFile) {
				newProfile.image =
					await uploadImageToFirebase_getPromisedURL({
						userId: state.user._id,
						imageFile: newProfile.imageFile,
					});
			}
			const reply = await myAxios.put(
				`/api/auth/updateuser/${state.user._id}`,
				newProfile
			);
			doLogin(reply.data);
			navigate("/profile");
			toast.success("Update user success");
			dispatch({ type: "FETCH_SUCCESS" });
		} catch (error) {
			// dispatch({ type: "SET_ERROR" })
			blinkError();
			toast.error("Update user failed");
		}
	};
	//============
	//============
	//============
	const doAdminCreateNewUser = async (newProfile = {}) => {
		dispatch({ type: "FETCH_BEGIN" });
		const { email, password } = newProfile;
		const newUser = {
			email,
			password,
		};

		try {
			const reply = await myAxios.post("/api/auth/register", newUser);

			if (newProfile.imageFile) {
				newProfile.image =
					await uploadImageToFirebase_getPromisedURL({
						userId: reply.data._id,
						imageFile: newProfile.imageFile,
					});
				const reply_2 = await myAxios.put(
					`/api/auth/updateuser/${reply.data._id}`,
					newProfile
				);
			}

			navigate("/admin/users");
			toast.success("user created successfully");
			dispatch({ type: "FETCH_SUCCESS" });
		} catch (error) {
			blinkError();
			toast.error("Create New user failed");
		}
	};
	//============
	//============
	//============
	const getCustomerProfileOrderList = async () => {
		dispatch({ type: "FETCH_BEGIN" });

		try {
			const reply = await myAxios.post(
				"/api/orders/getCustomersOrdersList",
				{ userId: state.user._id }
			);
			dispatch({
				type: "GET_CUSTOMER_PROFILE_ORDERS_LIST",
				payload: reply.data,
			});

			dispatch({ type: "FETCH_SUCCESS" });
		} catch (error) {
			dispatch({ type: "FETCH_ERROR" });
			// blinkError();
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
				customerEmail: state.user.email,
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
			toast.warning("product updated");
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
	const addNewProduct = async (newProductData) => {
		// console.log(newProductData, "received");
		// return;
		// check valid
		let validData = null;
		let { price, rating, imageFile, ...rest } = newProductData;
		try {
			for (const v of Object.values(newProductData)) {
				if (!v) throw new Error("No Empty values allowed");
			}
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
		let reply;
		try {
			reply = await myAxios.post(
				"/api/products/add-new-product",
				validData
			);
			console.log(reply.data.reply._id);
			if (imageFile) {
				let image = await uploadImageToFirebase_getPromisedURL({
					productId: reply.data.reply._id,
					imageFile: imageFile,
				});
				const reply_2 = await myAxios.put(
					`/api/products/updateproduct/${reply.data.reply._id}`,
					{ image }
				);
			}

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
	const setEditOrder = (id) => {
		dispatch({ type: "FETCH_BEGIN" });

		const editOrder = state.ordersList.find((e) => e._id === id);
		if (!editOrder) {
			dispatch({ type: "SET_ERROR" });
			return;
		}

		dispatch({ type: "SET_EDIT_ORDER", payload: editOrder });
		dispatch({ type: "FETCH_SUCCESS" });
	};
	//============

	//============
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
			dispatch({
				type: "UPDATE_ORDER_SUCCESS_v2",
				payload: reply.data,
			});
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
		// also changes current order page to 1
		dispatch({
			type: "RESET_ORDERS_FILTER",
			payload: initial_ordersFilter,
		});
	};
	//============
	//============
	const ClearOrdersFilter_on_dismount = () => {
		ClearOrdersFilter();
	};
	//============
	//============
	const ClearOrdersFilter_and_reFetch_orders = () => {
		ClearOrdersFilter();
		// must re-fetch products-with-initial-filter-query
		getCurrentPageOrdersListWithQuery("initial");
	};
	//============
	//============
	//============orders paginator
	//============
	const setOrdersItemsPerPage = (arg) => {
		dispatch({ type: "SET_ORDERS_ITEMS_PER_PAGE", payload: arg });
		// must also change current page to 1??
		setOrdersCurrentPage(1);
	};
	//============
	//============
	const setOrdersCurrentPage = (arg) => {
		dispatch({ type: "SET_ORDERS_CURRENT_PAGE", payload: arg });
	};
	//============
	//============
	// //============
	// //============
	const getCurrentPageOrdersListWithQuery_orginal = async (filterQuery) => {
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

		let qstring = `/api/orders/getorderswithquery?searchEmail=${searchEmail}&orderStatus=${orderStatus}&minAmount=${minAmount}&maxAmount=${maxAmount}&dateRange=${dateRange}&sort=${sort}&currentPage=${currentPage}&itemsPerPage=${itemsPerPage}`;

		dispatch({ type: "FETCH_BEGIN" });

		try {
			const reply = await myAxios.get(qstring);
			dispatch({
				type: "GET_CURRENT_PAGE_ORDERS_LIST_AND_HITS_COUNT_WITH_QUERY",
				payload: reply.data,
			});
			dispatch({ type: "FETCH_SUCCESS" });
		} catch (error) {
			dispatch({ type: "FETCH_ERROR" });
		}
	};
	// //============
	// //============
	// //============
	// //============
	const getCurrentPageOrdersListWithQuery = async (
		order_arg = state.order_arg
	) => {
		let {
			searchEmail,
			orderStatus,
			minAmount,
			maxAmount,
			dateRange,
			sort,
		} =
			order_arg === "initial"
				? initial_ordersFilter
				: state.ordersFilter;
		let { itemsPerPage, currentPage } = state.ordersPaginatorData;

		if (order_arg === "issue") {
			orderStatus = "check-issue";
			currentPage = 1;
		}

		let qstring = `/api/orders/getorderswithquery?searchEmail=${searchEmail}&orderStatus=${orderStatus}&minAmount=${minAmount}&maxAmount=${maxAmount}&dateRange=${dateRange}&sort=${sort}&currentPage=${currentPage}&itemsPerPage=${itemsPerPage}`;

		dispatch({ type: "FETCH_BEGIN" });
		try {
			const reply = await myAxios.get(qstring);
			dispatch({
				type: "GET_CURRENT_PAGE_ORDERS_LIST_AND_HITS_COUNT_WITH_QUERY",
				payload: reply.data,
			});
			dispatch({ type: "FETCH_SUCCESS" });
		} catch (error) {
			dispatch({ type: "FETCH_ERROR" });
		}
		setOrder_Arg(null);
	};
	// //============
	// //============
	//============
	//============admin stats page data
	//============
	const getAdminStats = async () => {
		dispatch({ type: "FETCH_BEGIN" });

		const usersStatsURL = "/api/auth/users-stats";
		const ordersStatsURL = "/api/orders/orders-stats";
		const productsStatsURL = "/api/products/products-stats";
		const statsURL = {
			usersStatsURL: "/api/auth/users-stats",
			ordersStatsURL: "/api/orders/orders-stats",
			productsStatsURL: "/api/products/products-stats",
		};
		const multiRequest = Object.values(statsURL).map((e) =>
			myAxios.get(e)
		);
		try {
			const reply = await Promise.all(multiRequest);
			dispatch({
				type: "GET_ADMIN_STATS",
				payload: reply.map((e) => e.data),
			});
			dispatch({ type: "FETCH_SUCCESS" });
		} catch (error) {
			dispatch({ type: "FETCH_ERROR" });
		}
	};
	//============
	//============
	const setOrder_Arg = (arg) => {
		dispatch({ type: "SET_ORDER_ARG", payload: arg });
	};
	//============
	//============
	const handleIssueClick = () => {
		setOrder_Arg("issue");
		// dispatch({ type: "SET_ORDER_ARG", payload: "issue" });

		dispatch({ type: "FETCH_BEGIN" });
		navigate("/admin/orders");
		// getCurrentPageOrdersListWithQuery("issue");
		// dispatch({ type: "FETCH_SUCCESS" });
	};
	//============
	//============
	const handleGoToCustomersOrdersPageClick = (userId) => {
		setOrder_Arg(userId);
		navigate("/admin/orders");
	};
	//============
	//============
	//============
	//============
	const getCustomersOrdersWithCustomerId = async (userId) => {
		dispatch({ type: "FETCH_BEGIN" });

		try {
			const reply = await myAxios.post(
				"/api/orders/getCustomersOrdersList",
				userId
			);
			dispatch({ type: "SET_USER_ORDERS_LIST", payload: reply.data });
			dispatch({ type: "FETCH_SUCCESS" });
		} catch (error) {
			dispatch({ type: "FETCH_ERROR" });
		}
		setOrder_Arg(null);
	};
	//============
	//============
	//============
	//============
	// const uploadImageToFirebase = ({ folder, id, imageFile }) => {
	// 	// upload first to get image url
	// 	const imageRef = ref(firebaseStorage, `${folder}/${id}`);
	// 	// const imageRef = ref(firebaseStorage, `profile-images/${id}`);
	// 	// 'file' comes from the Blob or File API
	// 	// uploadBytes(imageRef, imageURL).then((snapshot) => {
	// 	// 	console.log("Uploaded a blob or file!", snapshot);
	// 	// });

	// 	const uploadTask = uploadBytesResumable(imageRef, imageFile);

	// 	// Register three observers:
	// 	// 1. 'state_changed' observer, called any time the state changes
	// 	// 2. Error observer, called on failure
	// 	// 3. Completion observer, called on successful completion
	// 	uploadTask.on(
	// 		"state_changed",
	// 		(snapshot) => {
	// 			// Observe state change events such as progress, pause, and resume
	// 			// Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
	// 			const progress =
	// 				(snapshot.bytesTransferred / snapshot.totalBytes) *
	// 				100;
	// 			// console.log("Upload is " + progress + "% done");
	// 			switch (snapshot.state) {
	// 				case "paused":
	// 					// console.log("Upload is paused");
	// 					break;
	// 				case "running":
	// 					// console.log("Upload is running");
	// 					break;
	// 			}
	// 		},
	// 		(error) => {
	// 			// Handle unsuccessful uploads
	// 			toast.error("image upload error");
	// 		},
	// 		() => {
	// 			// Handle successful uploads on complete
	// 			// For instance, get the download URL: https://firebasestorage.googleapis.com/...
	// 			getDownloadURL(uploadTask.snapshot.ref).then(
	// 				(downloadURL) => {
	// 					// console.log("File available at", downloadURL);
	// 					doCustomerProfileUpdate({
	// 						image: downloadURL,
	// 					});
	// 				}
	// 			);
	// 		}
	// 	);
	// };
	// //============
	// //============
	const uploadImageToFirebase_getPromisedURL = ({
		userId,
		productId,
		imageFile,
	}) => {
		return new Promise((resolve, reject) => {
			// upload first to get image url
			let folder = userId ? "profile-images" : "product-images";
			let id = userId ? userId : productId;
			console.log(
				userId,
				"<<uID",
				productId,
				"<<pID",
				imageFile,
				"received arg"
			);
			console.log(folder, "id>>", id, "folder and id");
			const imageRef = ref(firebaseStorage, `${folder}/${id}`);
			// const imageRef = ref(firebaseStorage, `profile-images/${id}`);
			// 'file' comes from the Blob or File API
			// uploadBytes(imageRef, imageURL).then((snapshot) => {
			// 	console.log("Uploaded a blob or file!", snapshot);
			// });

			const uploadTask = uploadBytesResumable(imageRef, imageFile);

			// Register three observers:
			// 1. 'state_changed' observer, called any time the state changes
			// 2. Error observer, called on failure
			// 3. Completion observer, called on successful completion
			uploadTask.on(
				"state_changed",
				(snapshot) => {
					// Observe state change events such as progress, pause, and resume
					// Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
					const progress =
						(snapshot.bytesTransferred /
							snapshot.totalBytes) *
						100;
					// console.log("Upload is " + progress + "% done");
					switch (snapshot.state) {
						case "paused":
							// console.log("Upload is paused");
							break;
						case "running":
							// console.log("Upload is running");
							break;
					}
				},
				(error) => {
					// Handle unsuccessful uploads
					return reject("error-uploading");
				},
				() => {
					// Handle successful uploads on complete
					// For instance, get the download URL: https://firebasestorage.googleapis.com/...
					getDownloadURL(uploadTask.snapshot.ref).then(
						(downloadURL) => {
							// console.log("File available at", downloadURL);
							return resolve(downloadURL);
						}
					);
				}
			);
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
		doAdminCreateNewUser,
		doCustomerProfileUpdate,
		getCustomerProfileOrderList,
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
		getAdminStats,
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
		setEditOrder,
		deleteOrder,
		updateOrder,
		//============ordersfilter
		handleOrdersFilterChange,
		ClearOrdersFilter,
		ClearOrdersFilter_on_dismount,
		ClearOrdersFilter_and_reFetch_orders,
		setOrdersItemsPerPage,
		setOrdersCurrentPage,
		getCurrentPageOrdersListWithQuery,
		getCustomersOrdersWithCustomerId,
		//============
		setOrder_Arg,
		handleIssueClick,
		handleGoToCustomersOrdersPageClick,
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
