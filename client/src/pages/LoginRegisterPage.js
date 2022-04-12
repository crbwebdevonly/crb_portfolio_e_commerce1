import React from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const LoginRegisterPage = () => {
	//============
	const nav = useNavigate();
	//============
	const { user, doLogin, doRegister, error } = useContext(AuthContext);
	console.log(error, "eeeee");

	//============
	const [isLoginMode, setIsLoginMode] = useState(true);
	//
	//============
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	//============

	//============
	//============
	useEffect(() => {
		//   first
		if (user) {
			nav("/");
		}

		return () => {
			//     second
		};
	}, [user]);

	//============
	//============
	//============
	const handleRegister = () => {
		console.log(email, password, "register");
		doRegister({ email, password });
	};
	//============
	//============
	const handleLogin = () => {
		console.log(email, password);
		doLogin({ email, password });
	};
	//============
	//============
	const handleDemoUserLogin = () => {
		doLogin({ email: "demouser1", password: "1" });
	};

	//============
	//============
	const handleDemoAdminLogin = () => {
		doLogin({ email: "demoadmin1", password: "1" });
	};
	//============
	//============
	//============
	//============
	//============
	//============
	return (
		<div className="container">
			<h2>{isLoginMode ? "Login" : "Registration"}</h2>
			<div className="form-floating mb-3">
				<input
					type="email"
					className="form-control"
					id="floatingInput"
					placeholder="name@example.com"
					value={email}
					onChange={(e) => {
						setEmail(e.target.value);
					}}
				/>
				<label>Email address</label>
			</div>
			{error && (
				<div className="alert alert-danger text-center">
					login-error
				</div>
			)}
			<div className="form-floating">
				<input
					type="text"
					className="form-control"
					id="floatingPassword"
					placeholder="Password"
					value={password}
					onChange={(e) => {
						setPassword(e.target.value);
					}}
				/>
				<label>Password</label>
			</div>

			<div className="input-group  my-3">
				{isLoginMode ? (
					<button
						className="btn  btn-outline-primary me-auto"
						type="button"
						onClick={() => {
							setIsLoginMode(!isLoginMode);
						}}
					>
						Not, a member, Register
					</button>
				) : (
					<button
						className="btn  btn-outline-primary me-auto"
						type="button"
						onClick={() => {
							setIsLoginMode(!isLoginMode);
						}}
					>
						Already, a member, Login
					</button>
				)}

				{isLoginMode ? (
					<button
						className="btn btn-outline-secondary "
						type="button"
						onClick={handleLogin}
					>
						Login
					</button>
				) : (
					<button
						className="btn btn-outline-secondary"
						type="button"
						onClick={handleRegister}
					>
						Register
					</button>
				)}
			</div>

			<div className="input-group  my-3 ">
				<button
					className="btn btn-success ms-auto "
					type="button"
					onClick={handleDemoUserLogin}
				>
					Demo User Login
				</button>
				<button
					className="btn btn-warning "
					type="button"
					onClick={handleDemoAdminLogin}
				>
					Demo Admin Login
				</button>
			</div>
		</div>
	);
};

export default LoginRegisterPage;
