import React from "react";
import { toast } from "react-toastify";
import { fakeProducts } from "../fakeProducts";
import styled from "styled-components";
import { myAxios } from "../myAxios";
import ProductItem from "./ProductItem";
import { useContext } from "react";
import { useEffect } from "react";
import { Spinner } from "react-bootstrap";
import AdminProductItem from "./AdminProductItem";
import { Link } from "react-router-dom";
import ProductsFilter from "./ProductsFilter";
import Paginator from "./Paginator";
import { useState } from "react";
import { useRef } from "react";
import { useAppContext } from "../context/AppContext";

const AdminProductsList = () => {
	//============
	//============
	const {
		loading,
		error,
		productsList,
		paginatorData,
		setCurrentPage,
		ClearFilter_on_dismount,
		ClearFilter_and_reFetch_products,
		getCurrentPageProductsListWithQuery,
	} = useAppContext();
	//============
	const { itemsPerPage, currentPage } = paginatorData;
	//============
	//============
	//============
	useEffect(() => {
			// setCurrentPage(1);

		return () => {
			//     clear filter on this page dismount
			//  so that next time the page is loaded ....
			// the initial load will load with cleared filter
			console.log("clear filter- ADMIN products page");
			ClearFilter_on_dismount();
			setCurrentPage(1);
		};
	}, []);
	//============
	//============
	//============
	//============
	useEffect(() => {
		//   first
		getCurrentPageProductsListWithQuery();
		return () => {
			//     second
		};
	}, [itemsPerPage, currentPage]);

	//============
	//============
	//============
	//============
	const handleSeedProducts = async () => {
		//prep products
		const seedPackage = fakeProducts.map((e) => {
			const { id, rating, ...rest } = e;
			rest.rating = e.rating.rate;
			return rest;
		});
		// console.log(seedPackage);
		// return;
		try {
			const reply = await myAxios.post(
				"/api/products/seed-products",
				seedPackage
			);
			console.log(reply);
			toast.success("seeding products success");
		} catch (error) {
			toast.error("error seeding product");
		}
	};
	//============
	//============

	//============
	//============

	//============
	//============
	//============
	// //============

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
	//============
	if (error)
		return (
			<h5 className="alert alert-danger">
				Error occured- getting all products
			</h5>
		);
	//============
	return (
		<>
			<StyledWrapper>
				{/* <button className="btn btn-warning" onClick={handleSeedProducts}>
				Seed Products
			</button> */}

				<ProductsFilter />
				<Paginator />
				<Link to="add-new-product">
					<button className="btn btn-info">
						Add New Product
					</button>
				</Link>
				<div className="all-products-container ">
					{productsList.map((e, i) => (
						<AdminProductItem key={i} {...e} />
					))}
				</div>
				<Paginator bottom />
			</StyledWrapper>
		</>
	);
};

export default AdminProductsList;
const StyledWrapper = styled.div`
	/* border: 1px solid blue; */
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
`;
