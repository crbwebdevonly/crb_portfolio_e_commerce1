import React, { useContext } from "react";
import { useState } from "react";
import styled from "styled-components";
import { CustomerContext } from "../context/CustomerContext";

const ProductsFilter = () => {
	//============
	//============
	const {
		handleFilterQueryChange,
		filterQuery,
		handleClearFilter,
		handleApplyFilter,
	} = useContext(CustomerContext);
	//============
	const { search, minPrice, maxPrice, sort } = filterQuery;
	//============

	//============

	//============
	//============
	return (
		<StyledWrapper>
			<div className="products-filter-container container g-2 justify-content-center">
				<div className="row g-1">
					<div className="form-floating mb-0 col-12">
						<input
							type="text"
							className="form-control"
							placeholder="search product"
							name="search"
							value={search}
							onChange={handleFilterQueryChange}
						/>
						<label>Product search</label>
					</div>

					<div className="row g-1 my-1 justify-content-between">
						<div className="col-md">
							<div className="input-group mb-0 ">
								<label className="input-group-text">
									Min-Price
								</label>
								<select
									className="form-select"
									name="minPrice"
									value={minPrice}
									onChange={handleFilterQueryChange}
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
						<div className="col-md">
							<div className="input-group mb-0 ">
								<label className="input-group-text">
									Max-Price
								</label>
								<select
									className="form-select"
									name="maxPrice"
									value={maxPrice}
									onChange={handleFilterQueryChange}
								>
									<option value="0">Any</option>
									<option value="5">5</option>
									<option value="15">15</option>
									<option value="25">25</option>
									<option value="50">50</option>
									<option value="100">100</option>
									<option value="200">200</option>
									<option value="500">500</option>
									<option value="700">700</option>
								</select>
							</div>
						</div>
						<div className="col-md">
							<div className="input-group mb-0 ">
								<label className="input-group-text">
									Sort
								</label>
								<select
									className="form-select"
									name="sort"
									value={sort}
									onChange={handleFilterQueryChange}
								>
									<option value="priceHigh">
										Price-High
									</option>
									<option value="priceLow">
										Price-Low
									</option>
									<option value="titleAZ">
										Name A-Z
									</option>
									<option value="titleZA">
										Name Z-A
									</option>
								</select>
							</div>
						</div>
						<div className="row justify-content-end g-1">
							<button
								className="btn   btn-info col-6 col-md-3"
								onClick={handleApplyFilter}
							>
								Apply Filter
							</button>
							<button
								className="btn      btn-secondary col-6 col-md-3"
								onClick={handleClearFilter}
							>
								Clear Filter
							</button>
						</div>
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
