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
		removeItem,
		// toggleShowMiniCart,
	} = useContext(CheckoutContext);
	//============
	//============
	const miniCartRef = useRef();
	//============
	//============

	//============
	//============
	//============ to close cart if clicked outside
	useEffect(() => {
		//   first
		const outsideCartClicked = (e) => {
			console.log(e.target);
			if (miniCartRef.current) {
				if (miniCartRef.current.contains(e.target)) {
					console.log("inside");
				} else console.log("OUTside");
			}
		};
		if (showMiniCart) {
			document.addEventListener("click", outsideCartClicked);
		}

		return () => {
			//     second
			document.removeEventListener("click", outsideCartClicked);
		};
	}, [showMiniCart]);

	//============
	//============
	//============

	//============
	return (
		<StyledWrapper className="rounded-2" ref={miniCartRef}>
			{/* <div>MiniCart</div> */}
			{cartItems.length < 1 && <h4>No Items in Cart</h4>}
			{cartItems.map((e) => (
				<li key={e.id}>
					<i
						className="fa-solid fa-trash-can "
						onClick={() => {
							removeItem(e.id);
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
			margin-right: 20px;
		}
		.amount {
			font-weight: bolder;
		}
	}
`;
