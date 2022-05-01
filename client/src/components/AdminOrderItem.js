import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useAppContext } from "../context/AppContext";

const AdminOrderItem = (props) => {
	//============
	//============
	const { deleteOrder, updateOrder } = useAppContext()
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
		if (orderStatus === "processing") return "text-warning";
		if (orderStatus === "completed") return "text-success";
		if (orderStatus === "check-issue") return "text-danger";
	}
	//============

	//============
	//============

	//============
	//============
	return (
		<StyledWrapper>
			<div className="card p-2">
				<div className="input-group input-group-lg mb-0  ">
					<span className="input-group-text fw-bold">
						OrderID:
					</span>
					<input
						type="text"
						className="form-control"
						disabled
						value={id}
					/>
				</div>
				{/* <div className="col card-header ">
							OrderID: {id}
						</div> */}
				<div className="row d-flex2 my-0 px-2 align-items-center">
					{enableEdit && (
						<>
							<div className="col">
								<button
									className="btn btn-danger"
									onClick={() => {
										deleteOrder(id);
									}}
								>
									Delete Order
								</button>
							</div>
							<div className="col">
								<button
									className="btn btn-info"
									onClick={() => {
										setEnableEdit(false);
									}}
								>
									Cancel Update
								</button>
							</div>
							<div className="col">
								<button
									className="btn btn-warning"
									onClick={() => {
										updateOrder(id, {
											status: orderStatus,
										});
									}}
								>
									Apply Update
								</button>
							</div>
						</>
					)}
					{!enableEdit && (
						<div className="col">
							<button
								className="btn btn-warning"
								onClick={() => {
									setEnableEdit(true);
								}}
							>
								Enable Update
							</button>
						</div>
					)}
					<div className="col-md-4 shadow7 border">
						<label className="form-label ">
							Order Status
						</label>
						<select
							className={"form-select  " + statusClassName}
							disabled={!enableEdit}
							value={orderStatus}
							onChange={handleStatusChange}
						>
							<option
								className="text-warning"
								value="processing"
							>
								processing
							</option>
							<option
								className="text-success"
								value="completed"
							>
								completed
							</option>
							<option
								className="text-danger"
								value="check-issue"
							>
								check-issue
							</option>
						</select>
					</div>
					{/* <select
						className="col form-select  mb-0"
						disabled={!enableEdit}
					>
						<option selected>Open this select menu</option>
						<option value="1">One</option>
						<option value="2">Two</option>
						<option value="3">Three</option>
					</select> */}
				</div>
				<div className="input-group input-group-sm mb-0  ">
					<span className="input-group-text fw-bold">
						Customer Email:
					</span>
					<input
						type="text"
						className="form-control"
						disabled
						value={parsedCustomer.email}
					/>
				</div>
				<div className="input-group input-group-sm mb-0  ">
					<span className="input-group-text fw-bold">
						Customer ID:
					</span>
					<input
						type="text"
						className="form-control"
						disabled
						value={customerID}
					/>
				</div>

				<div className="input-group input-group-sm mb-0  ">
					<span className="input-group-text fw-bold">
						Order Date:
					</span>
					<input
						type="text"
						className="form-control"
						disabled
						value={createdAt}
					/>
				</div>
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
												Product ID: {e._id}
											</p>
										</div>
										<img src={e.image} alt="" />
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
		filter: brightness(0.98);
		box-shadow: 0 0 2px 2px rgba(0, 0, 0, 0.3);
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
