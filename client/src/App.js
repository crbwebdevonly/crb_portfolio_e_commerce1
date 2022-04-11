import { Navigate, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import AdminPage from "./pages/AdminPage";
import CheckoutPage from "./pages/CheckoutPage";
import HomePage from "./pages/HomePage";
import LoginRegisterPage from "./pages/LoginRegisterPage";
import PageNotFound from "./pages/PageNotFound";
import ProductsListPage from "./pages/ProductsListPage";
//============
//============
//============
//============
//============
let loggedInUser = !true;
//============
//============
//============
const AuthRedirect = ({ children }) => {
	if (loggedInUser) return { ...children };
	else return <Navigate to="/login-register" />;
};

const AuthAdminRedirect = ({ children }) => {
	if (loggedInUser) return { children };
	else return <Navigate to="/login-register" />;
};

function App() {
	return (
		<>
			<NavBar />
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
						<AuthRedirect>
							<AdminPage />
						</AuthRedirect>
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
