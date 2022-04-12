import { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import MiniCart from "./components/MiniCart";
import NavBar from "./components/NavBar";
import { AuthContext } from "./context/AuthContext";
import AdminPage from "./pages/AdminPage";
import CheckoutPage from "./pages/CheckoutPage";
import HomePage from "./pages/HomePage";
import LoginRegisterPage from "./pages/LoginRegisterPage";
import PageNotFound from "./pages/PageNotFound";
import ProductsListPage from "./pages/ProductsListPage";
//============
//============
//============

function App() {
	//============
	//============
	const { user } = useContext(AuthContext);
	//============
	console.log(user, "app user");
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
			<MiniCart />
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
					path="/admin"
					element={
						<AuthAdminRedirect>
							<AdminPage />
						</AuthAdminRedirect>
					}
				/>
				<Route
					path="/login-register"
					element={<LoginRegisterPage />}
				/>
				<Route path="/checkout" element={<CheckoutPage />} />
				<Route path="*" element={<PageNotFound />} />
			</Routes>
		</>
	);
}

export default App;
