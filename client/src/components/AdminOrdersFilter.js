import styled from "styled-components";
import React from "react";
import { useAppContext } from "../context/AppContext";

const AdminOrdersFilter = (props) => {
	//============
	//============
	const {
		searchEmail,
		orderStatus,
		minAmount,
		maxAmount,
		dateRange,
		sort,
		handleChange,
	} = props;
	//============
	//============
	//============
	const {
		filter,
		// handleFilterChange: handleChange,
		ClearFilter_on_dismount,
		ClearFilter_and_reFetch_products,
		handleApplyFilter,
		getCurrentPageProductsListWithQuery,
	} = useAppContext();
	//============

	//============
	// const { search, minPrice, maxPrice, sort } = filter;

	return (
		<StyledWrapper>
			<div className="container">
				<div className="products-filter-container container g-2 justify-content-center">
					<div className="row g-1">
						<div className="form-floating mb-0 col-12 ">
							<input
								type="text"
								className="form-control"
								placeholder="search product"
								name="searchEmail"
								value={searchEmail}
								onChange={handleChange}
							/>
							<label className="search">
								Orders search by email
							</label>
						</div>
						<div className="row g-1 my-1 justify-content-between">
							<div className="col-12 col-md-6">
								<div className="input-group mb-0 ">
									<label className="input-group-text">
										Date Range
									</label>
									<select
										className="form-select"
										name="dateRange"
										value={dateRange}
										onChange={handleChange}
									>
										<option value="0">All</option>
										<option value="50">
											past 1 hr
										</option>
										<option value="100">
											past 24 hrs
										</option>
										<option value="200">
											past 72 hrs
										</option>
										<option value="500">
											past week
										</option>
										<option value="1000">
											past 30 days
										</option>
									</select>
								</div>
							</div>
							<div className="col-12 col-md-6">
								<div className="input-group mb-0 ">
									<label className="input-group-text">
										Order Status
									</label>
									<select
										className={"form-select  "}
										value={orderStatus}
										onChange={handleChange}
									>
										<option
											className="text-warning"
											value="processing"
										>
											processing
										</option>
										<option
											className="text-success"
											value="completed"
										>
											completed
										</option>
										<option
											className="text-danger"
											value="check-issue"
										>
											check-issue
										</option>
									</select>
								</div>
							</div>
						</div>

						<div className="row g-1 my-1 justify-content-between">
							<div className="col-md">
								<div className="input-group mb-0 ">
									<label className="input-group-text">
										Min-Amount
									</label>
									<select
										className="form-select"
										name="minAmount"
										value={minAmount}
										onChange={handleChange}
									>
										<option value="0">0</option>
										<option value="50">50</option>
										<option value="100">
											100
										</option>
										<option value="200">
											200
										</option>
										<option value="500">
											500
										</option>
										<option value="1000">
											1000
										</option>
									</select>
								</div>
							</div>
							<div className="col-md">
								<div className="input-group mb-0 ">
									<label className="input-group-text">
										Max-Amount
									</label>
									<select
										className="form-select"
										name="maxAmount"
										value={maxAmount}
										onChange={handleChange}
									>
										<option value="0">Any</option>
										<option value="5">5</option>
										<option value="15">15</option>
										<option value="25">25</option>
										<option value="50">50</option>
										<option value="100">
											100
										</option>
										<option value="200">
											200
										</option>
										<option value="500">
											500
										</option>
										<option value="700">
											700
										</option>
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
										onChange={handleChange}
									>
										<option value="priceHigh">
											Amount-High
										</option>
										<option value="priceLow">
											Amount-Low
										</option>
										<option value="titleAZ">
											Name A-Z
										</option>
										<option value="titleZA">
											Name Z-A
										</option>
										<option value="new">
											New First
										</option>
										<option value="old">
											Old First
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
									onClick={
										ClearFilter_and_reFetch_products
									}
								>
									Clear Filter
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</StyledWrapper>
	);
};

export default AdminOrdersFilter;
const StyledWrapper = styled.div`
	label {
		font-size: 0.7rem;
		font-weight: bolder;
	}
	select {
		font-size: 0.7rem;
	}
	input::placeholder {
		opacity: 0.1;
	}
	.search {
		opacity: 0.5;
	}
`;
