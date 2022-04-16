import React from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import InputControlled from "../components/InputControlled";

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
			<InputControlled
				label="email"
				dataValue="123"
				handleChange={handleChange}
			/>
			<Outlet />
		</StyledWrapper>
	);
};

export default AdminUsersPage;
const StyledWrapper = styled.div``;
