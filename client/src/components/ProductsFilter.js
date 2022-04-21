import React from "react";
import styled from "styled-components";

const ProductsFilter = () => {
	return (
		<StyledWrapper>
			<div className="content">
				<div class="form-floating mb-3">
					<input
						type="email"
						class="form-control"
						placeholder="search product"
					/>
					<label for="floatingInput">Product search</label>
				</div>
				<div class="input-group mb-3">
					<label
						class="input-group-text"
						for="inputGroupSelect01"
					>
						Min-Price
					</label>
					<select class="form-select" id="inputGroupSelect01">
						<option selected>Choose...</option>
						<option value="1">One</option>
						<option value="2">Two</option>
						<option value="3">Three</option>
					</select>
				</div>
                    <div class="input-group mb-3">
					<label
						class="input-group-text"
						for="inputGroupSelect01"
					>
						Max-Price
					</label>
					<select class="form-select" id="inputGroupSelect01">
						<option selected>Choose...</option>
						<option value="1">One</option>
						<option value="2">Two</option>
						<option value="3">Three</option>
					</select>
				</div>
				<button
					className="btn
                    btn-info"
				>
					Apply Filter
				</button>
			</div>
		</StyledWrapper>
	);
};

export default ProductsFilter;
const StyledWrapper = styled.div`
	width: 300px;
	padding: 10px;
	/* flex: 1; */
	/* top: 10px;
	width: 350px;
	z-index: 3;
	input {
		font-size: 0.8rem;
	}
	.content {
		position: fixed;
	} */
`;
