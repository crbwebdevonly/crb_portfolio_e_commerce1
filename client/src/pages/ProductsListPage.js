import React from "react";
import { useEffect } from "react";
import { useContext } from "react";
import styled from "styled-components";
import Paginator from "../components/Paginator";
import ProductItem from "../components/ProductItem";
import ProductsFilter from "../components/ProductsFilter";
import { CustomerContext } from "../context/CustomerContext";

const ProductsListPage = ({ admin }) => {
	//============
	const {
		loading,
		error,
		getAllProducts,
		productsList,
		getProductsWithQuery,
	} = useContext(CustomerContext);
	//============
	//============
	useEffect(() => {
		//   first
		// getAllProducts();
		getProductsWithQuery();
		return () => {
			//     second
		};
	}, []);

	//============
	//============
	//============
	//============
	//============
	//============
	//============
	//============
	//============
	if (loading) return <div className="spinner-border mx-auto d-grid "></div>;
	if (error)
		//============
		return (
			<h5 className="alert alert-danger">
				Error occured- getting all products
			</h5>
		);
	//============
	//============
	return (
		<StyledWrapper>
			<ProductsFilter />
			<Paginator />
			<div className="all-products-container ">
				{productsList.map((e, i) => (
					<ProductItem key={i} {...e} />
				))}
			</div>
			<Paginator bottom/>
		</StyledWrapper>
	);
};

export default ProductsListPage;

const StyledWrapper = styled.div`
	/* border: 1px solid blue; */
	margin: 5px 0;

	/* display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center; */

	.all-products-container {
		/* flex:5; */
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
