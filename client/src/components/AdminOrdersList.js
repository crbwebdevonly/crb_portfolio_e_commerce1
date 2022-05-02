import React from "react";
import { useEffect } from "react";
import AdminOrderItem from "./AdminOrderItem";
import styled from "styled-components";
import { useAppContext } from "../context/AppContext";
import AdminOrdersFilter from "./AdminOrdersFilter";
import PageSelector from "./PageSelector";

const AdminOrdersList = () => {
	//============
	//============
	const {
		loading,
		error,
          ordersPaginatorData,
		ordersList,
		ClearOrdersFilter_on_dismount,
		ClearOrdersFilter_and_reFetch_orders,
		getCurrentPageOrdersListWithQuery,
	} = useAppContext();
	//============
	//============
     const {
		itemsPerPage,
		currentPage,
		totalHitsCount: hitsCount,
	} = ordersPaginatorData;
	//============
	//============
	//============
	useEffect(() => {
		//   first
		// getAllOrders();
		ClearOrdersFilter_and_reFetch_orders();
		return () => {
			//     second
			ClearOrdersFilter_on_dismount();
		};
	}, []);
	//============
	//============
	//============
	//============
	useEffect(() => {
		//   first
		getCurrentPageOrdersListWithQuery();
		return () => {
			//     second
		};
	}, [itemsPerPage,currentPage]);

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
	if (ordersList.length < 1)
		return (
			<>
				{/* <div className="spinner-border mx-auto d-grid "></div> */}
				<h1 className="text-center">
					No orders To Display <br />
					<button
						className="btn btn-info"
						onClick={ClearOrdersFilter_and_reFetch_orders}
					>
						Clear Filter
					</button>
				</h1>
			</>
		);
	//============
	//============
	return (
		<>
			<StyledWrapper className="container ">
				<AdminOrdersFilter />
				<PageSelector />
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

		@media screen and (min-width: 1050px) {
			/* grid-template-columns: repeat(2, 1fr); */
		}
		/* @media screen and (min-width: 1050px) {
			grid-template-columns: repeat(3, 1fr);
		} */
	}
`;
