import React from "react";
import { useContext } from "react";
import styled from "styled-components";
import { CheckoutContext } from "../context/CheckoutContext";

const MiniCart = () => {
	//============
	const {
		cartItems,
		totalQty,
		totalAmount,
		removeItem,
		toggleShowMiniCart,
	} = useContext(CheckoutContext);
	//============
	//============
	//============
	//============
	//============

	//============
	return (
		<StyledWrapper className="rounded-2">
			{/* <div>MiniCart</div> */}
			{cartItems.length < 1 && <h4>No Items in Cart</h4>}
			{cartItems.map((e) => (
				<li key={e.id}>
					<i
						className="fa-solid fa-trash-can text-danger "
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
			<h4 className="text-end fs-6 py-2">
				{totalQty} Items ,<span> Total ${totalAmount}</span>
			</h4>
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
		&:hover {
			transform: scale(0.8);
		}
	}
	h5 {
		font-size: 0.7rem;
		margin-right: auto;
	}
	h6 {
		font-size: 0.8rem;
	}
	h4 {
		font-weight: normal;
		span {
			font-weight: bolder;
		}
	}
`;
