import moment from "moment";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useAppContext } from "../context/AppContext";

const AdminOrderItem = (props) => {
	//============
	//============
	const { deleteOrder, updateOrder } = useAppContext();
	const {
		_id: id,
		createdAt,
		customerID,
		customerEmail,
		status,
		issue,
		orderItemsID,
		orderTotalAmount,
		orderTotalQuantity,
		stringifiedOrderItems,
		stringifiedCustomer,
	} = props;
	//============
	//============
	//============
	const [enableEdit, setEnableEdit] = useState(false);
	const [orderStatus, setOrderStatus] = useState(status);
	// const [statusClassName, setStatusClassName] = useState(
	// 	getStatusClassName()
	// );

	//============
	let statusClassName = getStatusClassName();
	//============
	//============
	const handleStatusChange = (e) => {
		setOrderStatus(e.target.value);
	};
	//============
	//============
	const handleApplyUpdate = () => {};
	//============
	//============
	useEffect(() => {
		//   first
		if (!enableEdit) setOrderStatus(status);

		return () => {
			//     second
		};
	}, [enableEdit]);

	//============
	//============
	useEffect(() => {
		//   first
		// setStatusClassName(getStatusClassName());

		return () => {
			//     second
		};
	}, [orderStatus]);

	//============
	//============
	//============

	// if (stringifiedOrderItems) console.log(JSON.parse(stringifiedOrderItems));
	const parsedOrderItems = JSON.parse(stringifiedOrderItems);
	const parsedCustomer = JSON.parse(stringifiedCustomer);
	//============
	//============
	function getStatusClassName() {
		if (orderStatus === "processing") return "warning";
		if (orderStatus === "completed") return "success";
		if (orderStatus === "check-issue") return "danger";
	}
	//============

	//============
	//============

	//============
	// return "item3"
	return (
		<StyledWrapper>
			<div className="card p-1 h-auto">
				<div className="card-body ">
					<div
						className="d-flex my-1
                              "
					>
						<Link to={`edit-order/${id}`}>
							<button className="btn btn-info">
								Edit Order
							</button>
						</Link>

						<button
							type="text"
							// className="form-control"
							className={
								"ms-auto btn btn-" + statusClassName
							}
							disabled
						>
							{orderStatus}
						</button>
					</div>

					<div className="input-group input-group-sm mb-1">
						<span
							className="input-group-text"
							id="inputGroup-sizing-sm"
						>
							CustomerEmail:
						</span>
						<input
							type="text"
							className="form-control"
							disabled
							value={customerEmail || parsedCustomer.email}
						/>
					</div>
					<div className="input-group input-group-sm mb-1">
						<span
							className="input-group-text"
							id="inputGroup-sizing-sm"
						>
							Date:
						</span>
						<input
							type="text"
							className="form-control"
							disabled
							value={` ${moment(createdAt).format(
								"MMMM Do YYYY"
							)} , ${moment(createdAt).fromNow()}`}
						/>
					</div>
					<div className="input-group input-group-sm mb-1">
						<span
							className="input-group-text"
							id="inputGroup-sizing-sm"
						>
							Order ID:
						</span>
						<input
							type="text"
							className="form-control id"
							disabled
							value={id}
						/>
					</div>
					<div className="input-group input-group-sm mb-1">
						<span
							className="input-group-text"
							id="inputGroup-sizing-sm"
						>
							Items Quantity
						</span>
						<input
							type="text"
							className="form-control"
							disabled
							value={orderTotalQuantity}
						/>
					</div>
					<div className="input-group input-group-sm mb-1">
						<span
							className="input-group-text amt"
							id="inputGroup-sizing-sm"
						>
							{`Total Amount: $ ${orderTotalAmount}`}
						</span>
					</div>
				</div>
			</div>
		</StyledWrapper>
	);
	//============
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

	
	&:hover {
		filter: brightness(0.98);
		box-shadow: 0 0 2px 2px rgba(0, 0, 0, 0.3);
	}
	a {
		text-decoration: none;
		color: inherit;
	}
	
	h6,
	p {
		font-size: 0.8rem;
	}
	.card {
		height: 100%;
		/* min-height: 250px; */
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		/* align-items: center; */
	}

	span {
		font-weight: bold;
		font-size: 0.6rem !important;
	}
	input {
		font-size: 0.7rem !important;
	}
	@media screen and (min-width: 750px) {
		input {
			font-size: 0.8rem !important;
		}
	}
	.id {
		font-size: 0.7rem !important;
	}
	.amt {
		font-size: 1rem !important;
	}
`;
