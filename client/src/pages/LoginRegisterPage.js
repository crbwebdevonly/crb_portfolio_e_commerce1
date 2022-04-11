import React from "react";
import { myAxios } from "../myAxios";

const LoginRegisterPage = () => {
	const handleTest = async () => {
		try {
			const reply = await myAxios.get("/api/auth/register");
			console.log(reply);
		} catch (error) {
			console.log(error);
		}
	};
     //============
     //============
     //============
     const handleLogin = async () => {
		try {
			const reply = await myAxios.post("/api/auth/login");
			console.log(reply);
		} catch (error) {
			console.log(error);
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
	return (
		<div>
			LoginRegisterPage
			<button onClick={handleTest}>test</button>
			<button onClick={handleLogin}>login</button>
		</div>
	);
};

export default LoginRegisterPage;
