import { useEffect } from "react";
import { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import AdminEditUser from "./components/AdminEditUser";
import AdminOrdersList from "./components/AdminOrdersList";
import AdminProductsList from "./components/AdminProductsList";
import AdminStats from "./components/AdminStats";
import AdminUserList from "./components/AdminUserList";
import MiniCart from "./components/MiniCart";
import NavBar from "./components/NavBar";
import { AdminContextProvider } from "./context/AdminContext";
import { AuthContext } from "./context/AuthContext";
import { CheckoutContext } from "./context/CheckoutContext";
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
//============

function App() {
	//============
	//============
	const { showMiniCart } = useContext(CheckoutContext);
	//============
	//============
	const { user } = useContext(AuthContext);
	//============
	console.log(user, "app user");
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
		if (user?.isAdmin) return { ...children };
		else return <Navigate to="/login-register" />;
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
			<NavBar />
			{showMiniCart && <MiniCart />}
			<Routes>
				<Route path="/" element={<HomePage />} />
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
				<Route
					path="/admin"
					element={
						<AuthAdminRedirect>
							<AdminContextProvider>
								<AdminPage />
							</AdminContextProvider>
						</AuthAdminRedirect>
					}
				>
					<Route index element={<AdminStats />} />
					<Route path="stats" element={<AdminStats />} />
					<Route path="users" element={<AdminUsersPage />}>
						{/* <Route path="users" element={<AdminUserList />}> */}
						<Route index element={<AdminUserList />} />

						<Route
							path=":userId"
							element={<AdminEditUser />}
						/>
					</Route>
					<Route
						path="products"
						element={<AdminProductsList />}
					/>
					<Route path="orders" element={<AdminOrdersList />} />
				</Route>
				<Route
					path="/login-register"
					element={<LoginRegisterPage />}
				/>
				<Route path="/checkout" element={<CheckoutPage />} />
				<Route path="/payment" element={<PaymentPage />} />
				<Route path="*" element={<PageNotFound />} />
			</Routes>
		</>
	);
}

export default App;
