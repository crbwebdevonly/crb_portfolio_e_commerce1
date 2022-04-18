import React from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import AdminControlPanel from "../components/AdminControlPanel";

const AdminPage = () => {
	//============
	//============
	//============
	//============
	//============
	//============
	//============

	return (
		<StyledWrapper className="container shadow">
			<div className="control">
				<AdminControlPanel className="bg-secondary" />
			</div>
			<div className="outlet mt-5 pt-5">
				<Outlet />
			</div>
		</StyledWrapper>
	);
};

export default AdminPage;
const StyledWrapper = styled.div``;
