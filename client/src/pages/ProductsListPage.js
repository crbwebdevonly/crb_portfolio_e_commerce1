import React from "react";
import { useContext } from "react";
import styled from "styled-components";
import ProductItem from "../components/ProductItem";
import { CheckoutContext } from "../context/CheckoutContext";
import { fakeProducts } from "../fakeProducts";

const ProductsListPage = () => {
	const { addItem } = useContext(CheckoutContext);
	return (
		<StyledWrapper>
			<div>ProductsListPage</div>
			{fakeProducts.map((e) => (
				<ProductItem {...e} />
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
		</StyledWrapper>
	);
};

export default ProductsListPage;

const StyledWrapper = styled.div`
	border: 1px solid blue;
	margin: 5px 0;

	li {
		border: 1px solid blue;
		margin: 5px 0;
		cursor: pointer;
	}
`;
