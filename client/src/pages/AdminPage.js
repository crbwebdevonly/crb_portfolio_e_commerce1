import React from "react";
import { useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import styled from "styled-components";
import AdminControlPanel from "../components/AdminControlPanel";
import { useAppContext } from "../context/AppContext";

const AdminPage = () => {
	//============
	//============
	const { user } = useAppContext();
	//============
	const navigate = useNavigate();
	//============
	//============
	useEffect(() => {
		//   first
		if (!user || !user.isAdmin) {
			setTimeout(() => {
				navigate("/login-register");
			}, 2000);
		}

		return () => {
			//     second
		};
	}, [user]);

	//============
	//============
	//============
	if (!user || !user.isAdmin)
		return (
			<div className="alert alert-warning text-center">
				You must login as Admin
			</div>
		);
	//============

	//============
	//============

	return (
		<>

			<AdminControlPanel />
			<StyledWrapper className="container shadow">
				<div className="control"></div>
				<div className="outlet mt-5 py-5  justify-content-center">
					<Outlet />
				</div>
			</StyledWrapper>
		</>
	);
};

export default AdminPage;
const StyledWrapper = styled.div``;
