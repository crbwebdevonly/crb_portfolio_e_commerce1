import React from "react";
import { useContext } from "react";
import styled from "styled-components";
import { AdminContext } from "../context/AdminContext";

const AdminControlPanel = () => {
	//============
	//============
	const { menuItems } = useContext(AdminContext);
	//============
	//============
	//============
	//============
	return (
		<StyledWrapper>
			<div>AdminControlPanel</div>
			<ul>
				{menuItems.map((e) => (
					<li>{e}</li>
				))}
			</ul>
		</StyledWrapper>
	);
};

export default AdminControlPanel;
const StyledWrapper = styled.div``;
