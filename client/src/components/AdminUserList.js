import React from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import styled from "styled-components";
import { AdminContext } from "../context/AdminContext";
import AdminUserItem from "./AdminUserItem";

const AdminUserList = () => {
	//============
	//============
	const { getAllUsers, usersList } = useContext(AdminContext);
	//============
	//============
	//============
	useEffect(() => {
		//   first

		getAllUsers();
		return () => {
			//     second
		};
	}, []);

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
		<StyledWrapper className="container ">
			<Link to="add-new-user">
				<button className="btn btn-info">Add New User</button>
			</Link>
			<div className="all-users-container">
				{usersList.map((e, i) => (
					<AdminUserItem key={i} {...e} />
				))}
			</div>
			<Outlet />
		</StyledWrapper>
	);
};

export default AdminUserList;
const StyledWrapper = styled.div`
	.all-users-container {
		padding: 20px;
		display: grid;
		place-items: center;
		grid-template-columns: repeat(1, 1fr);

		@media screen and (min-width: 650px) {
			grid-template-columns: repeat(2, 1fr);
		}
		@media screen and (min-width: 850px) {
			grid-template-columns: repeat(3, 1fr);
		}
		@media screen and (min-width: 1050px) {
			grid-template-columns: repeat(4, 1fr);
		}
	}
`;
