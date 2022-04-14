import React from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import styled from "styled-components";
import { CheckoutContext } from "../context/CheckoutContext";

const MiniCart = () => {
	//============
	const {
		cartItems,
		showMiniCart,
		totalQty,
		totalAmount,
		removeItemWithIndex,
		toggleShowMiniCart,
		resetCart,
	} = useContext(CheckoutContext);
	//============
	//============
	const miniCartRef = useRef();
	//============
	//============

	//============
	//============handle delete plus
	//============close cart if clicked outside
	useEffect(() => {
		//   first
		const handleClick = (e) => {
			console.log(e.target);
			if (miniCartRef.current) {
				if (miniCartRef.current.contains(e.target)) {
					// clicked inside->> check-if delete
					console.log("inside");
					// console.log(
					// 	e.target.classList.contains("delete-cart-item")
					// );
					if (e.target.classList.contains("delete-cart-item")) {
						console.log("delete", e.target.id);

						removeItemWithIndex(Number(e.target.id));
					}
				} else {
					// clicked-outside >>close minicart
					console.log("OUTside");
					if (
						e.target.classList.contains("cart") ||
						e.target.classList.contains("badge")
					) {
						return;
					}
					toggleShowMiniCart();
				}
			}
		};
		if (showMiniCart) {
			document.addEventListener("click", handleClick);
		}

		return () => {
			//     second
			document.removeEventListener("click", handleClick);
		};
	}, [showMiniCart]);

	//============
	//============
	//============

	//============
	return (
		<StyledWrapper className="rounded-2 shadow" ref={miniCartRef}>
			{/* <div>MiniCart</div> */}
			{cartItems.length < 1 && <h4>No Items in Cart</h4>}
			{cartItems.map((e, i) => (
				<li key={i}>
					<i
						className="fa-solid fa-trash-can delete-cart-item"
						id={i}
						onClick={() => {
							// removeItem(e.id);
						}}
					></i>
					<h5>{e.title}</h5>
					<h6>${e.price}</h6>
				</li>
			))}
			<hr />
			<hr />
			<div className="total-wrap p-1">
				<button className="me-auto btn btn-primary p-1">
					Checkout
				</button>
				<button
					className="me-auto btn btn-warning p-1 mx-1 w-auto"
					onClick={resetCart}
				>
					Clear Cart
				</button>
				<div className="qty">{totalQty} Items </div>
				<div className="amount">Total ${totalAmount}</div>
			</div>
			<hr />
			<hr />
			<hr />
		</StyledWrapper>
	);
};

export default MiniCart;

const StyledWrapper = styled.div`
	position: fixed;
	/* border: 1px solid red; */
	padding: 10px;
	top: 50px;
	right: 10px;
	max-width: 300px;
	background-color: whitesmoke;
	list-style: none;
	z-index: 9;
	* {
		padding: 0;
		margin: 0;
		box-sizing: border-box;
	}

	li {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 5px;
		gap: 10px;
		border-bottom: 1px solid grey;
	}
	i {
		/* color: tomato; */
		cursor: pointer;
		transition: all 0.2s ease-in-out;
		font-size: 0.7rem;
		&:hover {
			color: #dc3545;
			transform: scale(0.9);
		}
	}
	h5 {
		font-size: 0.7rem;
		margin-right: auto;
	}
	h6 {
		font-size: 0.8rem;
	}
	.total-wrap {
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 0.8rem;
		button {
			font-size: 0.6rem;
		}
		.qty {
			margin: 0 20px;
		}
		.amount {
			font-weight: bolder;
		}
	}
`;
