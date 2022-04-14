import React from "react";
import styled from "styled-components";

const ProductItem = (props) => {
	const { title, price, description, category, image, rating } = props;
	return (
		<StyledWrapper>
			<div className="card p-2">
				<img
					src={image}
					className="card-img-top mx-auto"
					alt="..."
				/>
				<div className="card-body99">
					<h5 className="card-title fs-5 my-3">{title}</h5>
					{/* <p className="card-text">
						Some quick example text to build on the card title
						and make up the bulk of the card's content.
					</p> */}
					<div className="price-wrap">
						<div className="btn btn-primary">Add to Cart</div>
						<h5 className="card-title">${price}</h5>
					</div>
				</div>
			</div>
		</StyledWrapper>
	);
};

export default ProductItem;

const StyledWrapper = styled.div`
	flex: 1;
	height: 100%;
	width: 100%;
	padding: 10px;
	max-width: 24rem;
	img {
		width: 150px;
	}
	.card {
		/* height: 100%; */
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
	.price-wrap {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
`;
