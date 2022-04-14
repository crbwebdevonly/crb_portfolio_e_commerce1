import React from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { CheckoutContext } from "../context/CheckoutContext";

const ProductItem = (props) => {
	//============
	//============
	const { addItemWithID } = useContext(CheckoutContext);
	//============
	//============
	const { id, title, price, description, category, image, rating } = props;
	//============
	//============
	//============
	return (
		<StyledWrapper>
			<div className="card p-2">
				<Link to={`/product-item/${id}`}>
					<div className="img-wrap">
						<img
							src={image}
							className="card-img-top mx-auto"
							alt="..."
						/>
						<h5 className="card-title fs-5 mt-5 mb-3">
							{title}
						</h5>
					</div>
					
				</Link>
				<div className="price-wrap">
					<div
						className="btn btn-primary"
						onClick={() => {
							addItemWithID(id);
						}}
					>
						Add to Cart
					</div>
					<h5 className="card-title">${price}</h5>
				</div>
			</div>
		</StyledWrapper>
	);
};

export default ProductItem;

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
	}
`;
