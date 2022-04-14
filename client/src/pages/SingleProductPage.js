import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { fakeProducts } from "../fakeProducts";

const SingleProductPage = () => {
	//============
	//============
	const { productId } = useParams();
	//============
	const [error, setError] = useState(false);
	const [product, setProduct] = useState({});
	const { id, title, price, description, category, image, rating } = product;

	//============
	//============
	//============
	useEffect(() => {
		//   first
		const fetchProduct = () => {
			const item = fakeProducts.find(
				(e) => e.id === Number(productId)
			);
			if (item) setProduct(item);
			else setError(true);
		};
		//
		fetchProduct();
		return () => {
			//     second
		};
	}, [productId]);

	//============

	console.log(product);
	//============
	//============
	//============
	//============
	return (
		<StyledWrapper>
			<div className="card col-12">
				<h5 className="card-header ">{title}</h5>
				<div className="card-body"></div>
				<div className="container">
					<div className="row">
						<img
							src={image}
							className="card-img-top mx-auto col-md-4"
							alt="..."
						/>
						<div className="card-body col-md-6">
							<p className="card-text">
								Some quick example text to build on the
								card title and make up the bulk of the
								card's content.
							</p>
						</div>
					</div>
				</div>
			</div>
		</StyledWrapper>
	);
};

export default SingleProductPage;

const StyledWrapper = styled.div`
	padding: 10px;
	max-width: 24rem;
	width: 100%;
	.card {
		width: 100%;
	}
	img {
		width: 150px;
	}
`;
