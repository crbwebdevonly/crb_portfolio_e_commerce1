import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { AdminContext } from "../context/AdminContext";

const AdminOrderItem = (props) => {
	//============
	//============
	const { deleteOrder } = useContext(AdminContext);
	//============
	const {
		_id: id,
          createdAt,
		customerID,
		status,
		issue,
		orderItemsID,
		orderTotalAmount,
		orderTotalQuantity,
		stringifiedOrderItems,
		stringifiedCustomer ,
	} = props;
	//============
	//============

	// if (stringifiedOrderItems) console.log(JSON.parse(stringifiedOrderItems));
	const parsedOrderItems = JSON.parse(stringifiedOrderItems);
	const parsedCustomer = JSON.parse(stringifiedCustomer);
	//============
	//============
	function getStatusClassName() {
		if (status === "processing") return "bg-warning";
		if (status === "completed") return "bg-success";
		if (status === "check-issue") return "bg-danger";
	}
	//============
	const statusClassName = getStatusClassName();
	//============
	//============

	//============
	//============
	return (
		<StyledWrapper>
			<Link to={`update-order/${id}`}>
				<button
					className="btn btn-danger"
					onClick={() => {
						deleteOrder(id);
					}}
				>
					Delete
				</button>
				<div className="card p-2">
					<div className="row my-0 px-1 align-items-center">
						<div className="col card-header ">
							OrderID: {id}
						</div>
						<div
							className={
								"col-3 card-header w-auto " +
								statusClassName
							}
						>
							Status: {status}
						</div>
					</div>
					<div className=" card-text">Customer Email: {parsedCustomer.email}</div>
					<div className="card-text">Customer ID:{customerID}</div>
					<div className="card-text">Order Date:{createdAt}</div>
					<hr />

					<table className="table table-striped">
						<thead>
							<tr>
								<th scope="col">#</th>
								<th scope="col">Product</th>
								<th scope="col">Price</th>
							</tr>
						</thead>
						<tbody>
							{parsedOrderItems.map((e, i) => (
								<tr key={i}>
									<th scope="row">{i + 1}</th>
									<td>
										<div className="desc-wrap d-flex">
											<div className="title">
												<h6>{e.title}</h6>
												<p>
													Product ID:{" "}
													{e._id}
												</p>
											</div>
											<img
												src={e.image}
												alt=""
											/>
										</div>
									</td>
									<td>
										<h6>${e.price}</h6>
									</td>
								</tr>
							))}
						</tbody>
					</table>

					<div className="price-wrap">
						<div className="">
							Items Quantity {orderTotalQuantity}
						</div>
						<h5 className="card-title">
							Total Amount: ${orderTotalAmount}
						</h5>
					</div>
				</div>
			</Link>
		</StyledWrapper>
	);
};

export default AdminOrderItem;

const StyledWrapper = styled.div`
	margin: 1rem 0;
	/* position: relative; */
	/* flex: 1; */
	height: 100%;
	width: 100%;
	padding: 10px;
	max-width: 45rem;
	/* z-index: 1; */

	img {
		/* border: 1px solid red; */
		margin-left: auto;
	}
	&:hover {
		filter: brightness(0.9);
	}
	a {
		text-decoration: none;
		color: inherit;
	}
	img {
		width: 30px;
		object-fit: contain;
	}
	h6,
	p {
		font-size: 0.8rem;
	}
	.card {
		height: 100%;
		min-height: 250px;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		/* align-items: center; */
	}
	.img-wrap {
		display: flex;
		flex-direction: column;
	}
	.price-wrap {
		display: flex;
		justify-content: space-between;
		align-items: center;
		/* z-index: 99; */
		position: relative;
	}
	.alert {
		position: absolute;
		font-size: 0.8rem;
		height: 10px;
		z-index: 99;
		/* padding: 0px;
		margin: 0;
		padding: 10px; */
		bottom: 110%;
		left: 0px;
		display: grid;
		place-content: center;
	}
`;
