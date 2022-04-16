import React from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";

const AdminUsersPage = () => {
	//============
	//============
	//============
	//============
	//============
	//============
	const handleChange = (e) => {
		console.log(e.target.name);
	};
	//============

	return (
		<StyledWrapper>
			
			<Outlet />
		</StyledWrapper>
	);
};

export default AdminUsersPage;
const StyledWrapper = styled.div``;
