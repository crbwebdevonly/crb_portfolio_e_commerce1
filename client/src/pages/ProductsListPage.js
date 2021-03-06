import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import AdminProductItem from "../components/AdminProductItem";
import Paginator from "../components/Paginator";
import ProductItem from "../components/ProductItem";
import ProductsFilter from "../components/ProductsFilter";
import { useAppContext } from "../context/AppContext";

const ProductsListPage = ({ admin }) => {
	//============
	const {
		loading,
		error,
		productsList,
		getCurrentPageProductsListWithQuery,
		setCurrentPage,
		paginatorData,
		handleFilterQueryChange,
		filter,
		ClearFilter_on_dismount,
		ClearFilter_and_reFetch_products,
		handleApplyFilter,
		addToCart_with_ID,
	} = useAppContext();
	//============
	//============
	const { itemsPerPage, currentPage } = paginatorData;
	//============
	//============
	const navigate = useNavigate();
	//============
	//============
	//============
	//============
	useEffect(() => {
		// must set page to 1
		setCurrentPage(1);
		return () => {
			//     clear filter on this page dismount
			//  so that next time the page is loaded ....
			// the initial load will load with cleared filter
			ClearFilter_on_dismount();
			setCurrentPage(1);
		};
	}, []);

	//============
	//============
	useEffect(() => {
		//   refetch on page change
		// getProductsWithQuery();
		getCurrentPageProductsListWithQuery();
		return () => {
			//     second
		};
	}, [itemsPerPage, currentPage]);

	//============
	//============
	//============
	//============
	useEffect(() => {
		//   redirect/refetch, clear search-if search results-is zero
		if (loading || error) return;
		if (productsList.length < 1) {
			setTimeout(() => {
				ClearFilter_and_reFetch_products();
			}, 2000);
		}
		return () => {
			//     second
		};
	}, [productsList]);
	//============
	//============
	//============
	//============
	//============
	// return <div className="spinner-border mx-auto d-grid "></div>;
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
	if (productsList.length < 1)
		return (
			<h5 className="alert alert-info">
				No product matching your search parameters
			</h5>
		);
	//============
	//============
	return (
		<StyledWrapper className="container">
			<ProductsFilter />
			<Paginator />
			<div className="all-products-container ">
				{productsList.map(
					(e, i) => (
						<ProductItem key={i} {...e} />
					)
					// admin ? (
					// 	<AdminProductItem key={i} {...e} />
					// ) : (
					// 	<ProductItem key={i} {...e} />
					// )
				)}
			</div>
			<Paginator bottom />
		</StyledWrapper>
	);
};

export default ProductsListPage;

const StyledWrapper = styled.div`
	/* border: 1px solid blue; */
	margin: 5px auto;

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
