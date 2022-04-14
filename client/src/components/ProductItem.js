import React from "react";
import styled from "styled-components";

const ProductItem = (props) => {
	const { title, price, description, category, image, rating } = props;
	return (
		<StyledWrapper>
			<div className="card">
				<img
					src={image}
					className="card-img-top mx-auto"
					alt="..."
				/>
				<div className="card-body">
					<h5 className="card-title">{title}</h5>
					<p className="card-text">
						Some quick example text to build on the card title
						and make up the bulk of the card's content.
					</p>
					<a href="#" className="btn btn-primary">
						Go somewhere
					</a>
				</div>
			</div>
		</StyledWrapper>
	);
};

export default ProductItem;

const StyledWrapper = styled.div`
	padding: 10px;
	max-width: 24rem;
	img {
		width: 150px;
	}
`;
