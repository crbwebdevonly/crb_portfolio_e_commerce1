import React from "react";
import { useContext } from "react";
import styled from "styled-components";
import { CheckoutContext } from "../context/CheckoutContext";

const MiniCart = () => {
	//============
	const { cartItems, totalQty, totalAmount } = useContext(CheckoutContext);
	//============
	//============
	//============
	//============
	//============
	//============
	return (
		<StyledWrapper>
			<div>MiniCart</div>;
			{cartItems.map((e) => (
				<li>
					<h6>{e.price}</h6>
				</li>
			))}
			<h6>
				total:{totalQty} ::{totalAmount}
			</h6>
		</StyledWrapper>
	);
};

export default MiniCart;

const StyledWrapper = styled.div`
	position: fixed;
	border: 1px solid red;
	top: 50px;
	right: 10px;
	width: 200px;
	background-color: grrey;
`;
