import React from "react";
import styled from "styled-components";

import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useEffect } from "react";
import { useAppContext } from "../context/AppContext";

const CheckoutPage = () => {
	//============
	//============
	const navigate = useNavigate();
	//============
	//============
	const {
		user,
		cartItems,
		totalQty,
		totalAmount,
		removeItemFromCartWithIndex,
		resetCart,
		placeOrder,
	} = useAppContext();
	//============
	//============
	//============
	//============
	//============
	const handlePlaceOrder = () => {
		console.log(cartItems);
	};
	//============
	//============
	//============
	//============
	useEffect(() => {
		//  redirect to products if empty
		if (cartItems < 1) {
			setTimeout(() => {
				navigate("/productslist");
			}, 2000);
		}

		return () => {
			//     second
		};
	}, [cartItems]);

	//============
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
			<table className="table table-striped">
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
						<tr key={i}>
							<th scope="row">{i + 1}</th>
							<td>
								<div className="desc-wrap">
									<div className="title">
										<h6>{e.title}</h6>
										<p>Product ID: {e._id}</p>
									</div>
									<img src={e.image} alt="" />
									<div className="control-wrap">
										<div
											className="btn btn-warning"
											onClick={() => {
												removeItemFromCartWithIndex(
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
						<button
							className="btn btn-primary"
							// disabled={cartItems<1}
							onClick={placeOrder}
						>
							Place Order
						</button>
					</div>
					<div className="col-md">
						<button
							className="btn btn-primary"
							disabled={true}
							onClick={() => {
								navigate("/payment");
							}}
						>
							Proceed to Payment
						</button>
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
	.title {
		max-width: 500px;
	}
	.control-wrap {
		display: flex;
	}
	.total {
		text-align: end;
		font-size: 1.3rem;
	}
	p {
		font-size: 0.7rem;
	}
	img {
		width: 40px;
		margin-left: auto;
		margin-right: 20px;
	}
`;
