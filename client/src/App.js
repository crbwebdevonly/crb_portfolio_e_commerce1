import { useEffect } from "react";
import { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import AdminEditUser from "./components/AdminEditUser";
import AdminOrdersList from "./components/AdminOrdersList";
import AdminProductsList from "./components/AdminProductsList";
import AdminStats from "./components/AdminStats";
import AdminUserList from "./components/AdminUserList";
import DeleteMe from "./components/DeleteMe";
import MiniCart from "./components/MiniCart";
import NavBar from "./components/NavBar";
import AdminPage from "./pages/AdminPage";
import AdminUsersPage from "./pages/AdminUsersPage";
import CheckoutPage from "./pages/CheckoutPage";
import HomePage from "./pages/HomePage";
import LoginRegisterPage from "./pages/LoginRegisterPage";
import PageNotFound from "./pages/PageNotFound";
import PaymentPage from "./pages/PaymentPage";
import ProductsListPage from "./pages/ProductsListPage";
import SingleProductPage from "./pages/SingleProductPage";
//============
//============
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminAddNewUser from "./components/AdminAddNewUser";
import AdminProductsPage from "./pages/AdminProductsPage";
import AdminEditProduct from "./components/AdminEditProduct";
import AdminAddNewProduct from "./components/AdminAddNewProduct";
import { useAppContext } from "./context/AppContext";
import TestPage from "./pages/TestPage";
import styled from "styled-components";
import AdminOrdersPage from "./pages/AdminOrdersPage";
import AdminEditOrder from "./components/AdminEditOrder";
import UserProfilePage from "./pages/UserProfilePage";
//============
//============

function App() {
	//============
	//============
	//============
	//============
	const { user, showMiniCart } = useAppContext();
	//============
	// console.log(user, "app user");
	//============
	//============

	//============
	//============
	useEffect(() => {
		//   first

		return () => {
			//     second
		};
	}, [user]);

	//============
	//============
	//============
	//============
	//============
	//============
	const AuthRedirect = ({ children }) => {
		if (user) return { ...children };
		else return <Navigate to="/" />;
	};
	//============
	//============

	const AuthAdminRedirect = ({ children }) => {
		// causing useeffect infinit loop at initial fetch
		return { ...children };
		if (user?.isAdmin) return { ...children };
		// else return <Navigate to="/login-register" />;
		else
			return (
				<div className="alert alert-warning text-center">
					You must login as Admin
				</div>
			);
	};
	//============
	//============
	const LoginRedirect = ({ children }) => {
		if (user) return <Navigate to="/" />;
		else return { ...children };
	};
	//============
	//============

	return (
		<>
			<StyledWrapper>
				{/* <DeleteMe /> */}
				<ToastContainer position="bottom-right" autoClose={1000} />
				<NavBar />
				{showMiniCart && <MiniCart />}
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/profile" element={<UserProfilePage />} />
					<Route
						path="login-register"
						element={<LoginRegisterPage />}
					/>
					<Route
						path="/productslist"
						element={<ProductsListPage />}
					/>
					<Route
						path="/product-item/:productId"
						element={<SingleProductPage />}
					/>
					{/* <Route path="/testpage" element={<TestPage />} /> */}
					<Route path="/admin" element={<AdminPage />}>
						<Route index element={<AdminStats />} />
						<Route path="stats" element={<AdminStats />} />
						<Route path="users" element={<AdminUsersPage />}>
							{/* <Route path="users" element={<AdminUserList />}> */}
							<Route index element={<AdminUserList />} />

							<Route
								path=":userId"
								element={<AdminEditUser />}
							/>
							<Route
								path="add-new-user"
								element={<AdminAddNewUser />}
							/>
						</Route>
						<Route
							path="products"
							element={<AdminProductsPage />}
						>
							<Route
								index
								element={<AdminProductsList />}
							/>
							{/* <Route index element={<ProductsListPage />} /> */}
							<Route
								path="edit-product/:productId"
								element={<AdminEditProduct />}
							/>
							<Route
								path="add-new-product"
								element={<AdminAddNewProduct />}
							/>
						</Route>
						<Route
							path="orders"
							element={<AdminOrdersPage />}
						>
							<Route index element={<AdminOrdersList />} />
							<Route
								path="edit-order/:orderId"
								element={<AdminEditOrder />}
							/>
						</Route>
					</Route>
					<Route
						path="/login-register"
						element={<LoginRegisterPage />}
					/>
					<Route path="/checkout" element={<CheckoutPage />} />
					<Route path="/payment" element={<PaymentPage />} />
					<Route path="*" element={<PageNotFound />} />
				</Routes>
			</StyledWrapper>
		</>
	);
}

export default App;

const StyledWrapper = styled.div`
	/* global styler */

	a {
		text-decoration: none;
		color: inherit;
	}
`;
