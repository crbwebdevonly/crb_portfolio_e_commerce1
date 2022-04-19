import React from "react";
import { toast } from "react-toastify";
import { fakeProducts } from "../fakeProducts";
import styled from "styled-components";
import { myAxios } from "../myAxios";
import ProductItem from "./ProductItem";
import { useContext } from "react";
import { AdminContext } from "../context/AdminContext";
import { useEffect } from "react";
import { Spinner } from "react-bootstrap";
import AdminProductItem from "./AdminProductItem";
import { Link } from "react-router-dom";

const AdminProductsList = () => {
	//============
	//============
	const { getAllProducts, productsList, loading, error } =
		useContext(AdminContext);
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
	useEffect(() => {
		//   first
		getAllProducts();
		return () => {
			//     second
		};
	}, []);

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
