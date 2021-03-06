import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const AdminProductItem = (props) => {
	//============
	//============
	const { _id:id, title, price, description, category, image, rating } = props;
	//============
	//============
	//============
	//============
	//============

	//============
	//============
	return (
		<StyledWrapper>
			<div className="card p-2">
				<div className="img-wrap">
					<img
						src={image}
						className="card-img-top mx-auto"
						alt="..."
					/>
					<h5 className="card-title fs-5 mt-5 mb-3">{title}</h5>
				</div>
				<div className="price-wrap">
					<Link to={`edit-product/${id}`}>
						<div
							className="btn btn-warning"
							onClick={() => {
								// setshowAddedtoCart(true);
								// addItemWithID(id);
							}}
						>
							Edit this Product
						</div>
					</Link>
					<h5 className="card-title">${price}</h5>
				</div>
			</div>
		</StyledWrapper>
	);
};

export default AdminProductItem;

const StyledWrapper = styled.div`
	/* position: relative; */
	/* flex: 1; */
	height: 100%;
	width: 100%;
	padding: 10px;
	max-width: 24rem;
	/* z-index: 1; */

	img {
		/* border: 1px solid red; */
		margin-left: auto;
	}
	&:hover {
		filter: brightness(0.9);
	}
	a {
		text-decoration: none;
		color: inherit;
	}
	img {
		width: 150px;
	}
	.card {
		height: 100%;
		min-height: 250px;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		/* align-items: center; */
	}
	.img-wrap {
		display: flex;
		flex-direction: column;
	}
	.price-wrap {
		display: flex;
		justify-content: space-between;
		align-items: center;
		/* z-index: 99; */
		position: relative;
	}
	.alert {
		position: absolute;
		font-size: 0.8rem;
		height: 10px;
		z-index: 99;
		/* padding: 0px;
		margin: 0;
		padding: 10px; */
		bottom: 110%;
		left: 0px;
		display: grid;
		place-content: center;
	}
`;
