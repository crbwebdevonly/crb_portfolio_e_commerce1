import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
	const navigate = useNavigate();

	useEffect(() => {
		//   redirect
		setTimeout(() => {
			navigate("/");
		}, 2000);

		return () => {
			//     second
		};
	}, []);

	return (
		<div className="alert alert-info">
			<div className="container d-grid align-items-center justify-content-center">
				<h1>PageNotFound</h1>
			</div>
		</div>
	);
};

export default PageNotFound;
