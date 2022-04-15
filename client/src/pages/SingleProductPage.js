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
			<div className="container">
				<h5 className="title card-header  text-center my-3">
					{title}
				</h5>
				<div className="row ">
					<div className="col-md-6 my-3 ">
						<img
							src={image}
							className="card-img-top mx-auto col-sm-6"
							alt="..."
						/>
					</div>
					<div className="col-md-6">
						<p className="card-text my-3 ">{description}</p>
					</div>
				</div>
				<div className="row align-items-center">
					<div className="col-6">
						<button className="btn btn-primary w-50 py-3 ">
							Buy
						</button>
					</div>
					<div className="col-6 card-header title">${price}</div>
				</div>
			</div>
		</StyledWrapper>
	);
};

export default SingleProductPage;

const StyledWrapper = styled.div`
	padding: 10px;
	/* max-width: 80%; */
	width: 100%;
	.title {
		font-size: 1rem;
	}

	img {
		width: 60%;
		display: grid;
		place-content: center;
	}
	@media screen and (min-width: 700px) {
		.title {
			font-size: 2rem;
		}
		p {
			font-size: 1.3rem;
		}
	}
`;
