import React from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { AdminContext } from "../context/AdminContext";
import AdminOrderItem from "./AdminOrderItem";
import styled from "styled-components";

const AdminOrdersList = () => {
	//============
	//============
	const { loading, error, getAllOrders, ordersList } =
		useContext(AdminContext);
	//============
	//============
	useEffect(() => {
		//   first
		getAllOrders();
		return () => {
			//     second
		};
	}, []);
	//============
	//============
	if (loading) return <div className="spinner-border mx-auto d-grid "></div>;
	//============
	if (error)
		return (
			<h5 className="alert alert-danger">
				Error occured- getting all orders
			</h5>
		);
	//============
	//============
	//============
	return (
		<>
			<StyledWrapper className="container ">
				<div className="all-orders-container">
					{ordersList.map((e, i) => (
						<AdminOrderItem key={i} {...e} />
					))}
				</div>
			</StyledWrapper>
		</>
	);
};

export default AdminOrdersList;
const StyledWrapper = styled.div`
	.all-orders-container {
		/* padding: 20px; */
		display: grid;
		place-items: center;
		grid-template-columns: repeat(1, 1fr);
          gap: 1.5rem;

		@media screen and (min-width:1050px) {
			/* grid-template-columns: repeat(2, 1fr); */
		}
		/* @media screen and (min-width: 1050px) {
			grid-template-columns: repeat(3, 1fr);
		} */
	}
`;
