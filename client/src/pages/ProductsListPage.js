import React from "react";
import { useContext } from "react";
import styled from "styled-components";
import ProductItem from "../components/ProductItem";
import { CheckoutContext } from "../context/CheckoutContext";
import { fakeProducts } from "../fakeProducts";

const ProductsListPage = ({admin}) => {
	const { addItem } = useContext(CheckoutContext);
	return (
		<StyledWrapper>
			<div>ProductsListPage</div>
			<div className="all-products-container ">
				{fakeProducts.map((e, i) => (
					<ProductItem key={i} {...e} />
					// <li
					// 	key={e.id}
					// 	onClick={() => {
					// 		addItem(e);
					// 	}}
					// >
					// 	<h6>{e.title}</h6>
					// 	<h6>{e.price}</h6>
					// </li>
				))}
			</div>
		</StyledWrapper>
	);
};

export default ProductsListPage;

const StyledWrapper = styled.div`
	border: 1px solid blue;
	margin: 5px 0;
	.all-products-container {
		padding: 20px;
		display: grid;
		place-items: center;
		grid-template-columns: repeat(1, 1fr);

		@media screen and (min-width: 650px) {
			grid-template-columns: repeat(2, 1fr);
		}
		@media screen and (min-width: 850px) {
			grid-template-columns: repeat(3, 1fr);
		}
		@media screen and (min-width: 1050px) {
			grid-template-columns: repeat(4, 1fr);
		}
	}
	.li999 {
		border: 1px solid blue;
		margin: 5px 0;
		cursor: pointer;
	}
`;
