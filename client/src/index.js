import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
//
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";
import { CustomerContextProvider } from "./context/CustomerContext";
import { AdminContextProvider } from "./context/AdminContext";

// ReactDOM.render(
// 	<React.StrictMode>
// 		<BrowserRouter>
// 			<AuthContextProvider>
// 				<App />
// 			</AuthContextProvider>
// 		</BrowserRouter>
// 	</React.StrictMode>,
// 	document.getElementById("root")
// );
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<BrowserRouter>
			<AdminContextProvider>
				<AuthContextProvider>
					<CustomerContextProvider>
						<App />
					</CustomerContextProvider>
				</AuthContextProvider>
			</AdminContextProvider>
		</BrowserRouter>
	</React.StrictMode>
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
