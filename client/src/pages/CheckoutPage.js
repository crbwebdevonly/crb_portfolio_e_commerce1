import React from "react";
import styled from "styled-components";
import { useContext } from "react";

import { CheckoutContext } from "../context/CheckoutContext";
import { useNavigate } from "react-router-dom";

const CheckoutPage = () => {
	//============
	//============
	const navigate = useNavigate();
	//============
	//============
	const {
		cartItems,
		// showMiniCart,
		totalQty,
		totalAmount,
		removeItemWithIndex,
		// toggleShowMiniCart,
		resetCart,
	} = useContext(CheckoutContext);
	//============
	//============
	//============
	if (cartItems < 1) {
		return (
			<div className="container text-center my-5">
				<h2>Your Cart is Empty</h2>
				<div
					className="btn btn-info"
					onClick={() => {
						navigate("/productslist");
					}}
				>
					Back to Products
				</div>
			</div>
		);
	}
	//============
	return (
		<StyledWrapper className="container">
			<table class="table table-striped">
				<thead>
					<tr>
						<th scope="col">#</th>
						<th scope="col">Product</th>
						<th scope="col">Quantity</th>
						<th scope="col">Price</th>
					</tr>
				</thead>
				<tbody>
					{cartItems.map((e, i) => (
						<tr>
							<th scope="row">{i + 1}</th>
							<td>
								<div className="desc-wrap">
									<div className="title">
										<h6>{e.title}</h6>
										<p>Product ID: {e.id}</p>
									</div>
									<div className="control-wrap">
										<div
											className="btn btn-warning"
											onClick={() => {
												removeItemWithIndex(
													i
												);
											}}
										>
											Remove
										</div>
									</div>
								</div>
							</td>
							<td>1</td>
							<td>
								<h6>${e.price}</h6>
							</td>
						</tr>
					))}
					<tr>
						<td></td>
						<td>
							<h6 className="total">Total</h6>
						</td>
						<td> {totalQty} Items</td>
						<td>
							<h5>${totalAmount}</h5>
						</td>
					</tr>
				</tbody>
			</table>
			<div className="container">
				<div className="row g-2">
					<div className="col-md">
						<div
							className="btn btn-info"
							onClick={() => {
								navigate("/productslist");
							}}
						>
							Back to Products
						</div>
					</div>
					<div className="col-md">
						<div
							className="btn btn-warning"
							onClick={resetCart}
						>
							Remove All Items
						</div>
					</div>
					<div className="col-md">
						<div
							className="btn btn-primary"
							onClick={() => {
								navigate("/payment");
							}}
						>
							Proceed to Payment
						</div>
					</div>
				</div>
			</div>
		</StyledWrapper>
	);
};

export default CheckoutPage;

const StyledWrapper = styled.div`
	td {
		/* display: flex;
		justify-content: center;
		align-items: center; */
		/* vertical-align: center; */
		vertical-align: top;
	}
	.desc-wrap {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
	}
	.control-wrap {
		display: flex;
	}
	.total {
		text-align: end;
		font-size: 1.3rem;
	}
`;
