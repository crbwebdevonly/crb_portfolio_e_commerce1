import React from "react";
import { myAxios } from "../myAxios";

const LoginRegisterPage = () => {
	const handleTest = async () => {
		try {
			const reply = await myAxios.get("/auth/register");
			console.log(reply);
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<div>
			LoginRegisterPage
			<button onClick={handleTest}>test</button>
		</div>
	);
};

export default LoginRegisterPage;
