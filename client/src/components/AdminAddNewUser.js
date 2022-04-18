import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { myAxios } from "../myAxios";

const AdminAddNewUser = () => {
	//============
	const nav = useNavigate();

	//============
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, seterror] = useState(false);
	//============
	//============
	//============
	const handleCreateNewUser = async () => {
		console.log(email, password, "register");
		// doAdminCreateNewUser({ email, password });
		try {
			const reply = await myAxios.post("/api/auth/register", {
				email,
				password,
			});
			toast.success("user created successfully");
			setTimeout(() => {
				nav("/admin/users");
			}, 2000);
		} catch (error) {
			seterror(true);
			toast.error("create user error");

			setTimeout(() => {
				nav("/admin/users");
			}, 2000);
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
	if (error)
		return (
			<div className="alert alert-danger text-center">
				registration-error
			</div>
		);
	//============
	return (
		<>
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
			<button
				className="btn btn-outline-warning my-3"
				type="button"
				onClick={handleCreateNewUser}
			>
				Create New User
			</button>
		</>
	);
};

export default AdminAddNewUser;
