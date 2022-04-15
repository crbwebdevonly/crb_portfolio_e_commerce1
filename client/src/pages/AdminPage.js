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
			<div className="row">
				<div className="col-3">
					<AdminControlPanel className="bg-secondary" />
				</div>
				<div className="col">
					<Outlet />
				</div>
			</div>
		</StyledWrapper>
	);
};

export default AdminPage;
const StyledWrapper = styled.div``;
