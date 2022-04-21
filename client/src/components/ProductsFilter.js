import React, { useContext } from "react";
import { useState } from "react";
import styled from "styled-components";
import { CustomerContext } from "../context/CustomerContext";

const ProductsFilter = () => {
	const [query, setQuery] = useState({});
	//============
	//============
	const { getProductsWithQuery,getAllProducts } = useContext(CustomerContext);
	//============
	//============
	//============
	//============
	const handleQueryChange = (e) => {
		const name = e.target.name;
		let value = e.target.value;
		if (name === "minPrice") value = Number(value);
		if (name === "maxPrice") value = Number(value);
		setQuery((p) => ({ ...p, [name]: value }));
	};
	//============
	console.log(query);
	//============
	//============
     const handleClearFilter = ()=>{
          getAllProducts()
     }
	//============
	//============
	return (
		<StyledWrapper>
			<div className="products-filter-container container g-2 justify-content-center">
				<div className="row g-1">
					<div className="form-floating mb-0 col-12">
						<input
							type="email"
							className="form-control"
							placeholder="search product"
							name="search"
							onChange={handleQueryChange}
						/>
						<label>Product search</label>
					</div>

					<div className="row g-1 my-1 justify-content-between">
						<div className="col-md-3">
							<div className="input-group mb-0 ">
								<label className="input-group-text">
									Min-Price
								</label>
								<select
									className="form-select"
									name="minPrice"
									onChange={handleQueryChange}
								>
									<option value="0">0</option>
									<option value="50">50</option>
									<option value="100">100</option>
									<option value="200">200</option>
									<option value="500">500</option>
									<option value="1000">1000</option>
								</select>
							</div>
						</div>
						<div className="col-md-3">
							<div className="input-group mb-0 ">
								<label className="input-group-text">
									Max-Price
								</label>
								<select
									className="form-select"
									name="maxPrice"
									onChange={handleQueryChange}
								>
									<option value="any">Any</option>
									<option value="5">5</option>
									<option value="15">15</option>
									<option value="25">25</option>
									<option value="50">50</option>
									<option value="100">100</option>
									<option value="200">200</option>
									<option value="500">500</option>
								</select>
							</div>
						</div>
						<button
							className="btn   btn-info col-md-2"
							onClick={() => {
								getProductsWithQuery(query);
							}}
						>
							Apply Filter
						</button>
						<button className="btn      btn-secondary col-md-2" onClick={handleClearFilter}>
							Clear Filter
						</button>
					</div>
				</div>
			</div>
		</StyledWrapper>
	);
};

export default ProductsFilter;
const StyledWrapper = styled.div`
	padding: 5px;

	.products-filter-container99 {
	}
	.kk {
	}
`;
