import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useAppContext } from "../context/AppContext";

const PageSelector = (props) => {
	//============
	const { bottom } = props;
	//============
	const {
		ordersPaginatorData,
		setOrdersItemsPerPage: setItemsPerPage,
		setOrdersCurrentPage: setCurrentPage,
		getCurrentPageOrdersListWithQuery,

	} = useAppContext();
	//============
	//============

	const {
		itemsPerPage,
		currentPage,
		totalHitsCount: hitsCount,
	} = ordersPaginatorData;
	//============
	//============
	//============
	const [pagesList, setPagesList] = useState([]);
	//============
	//============
	//============
	//============
	useEffect(() => {
		//   first
		let pages = 1;
		if (hitsCount) pages = Math.ceil(hitsCount / itemsPerPage);
		setPagesList(Array.from({ length: pages }, (_, i) => i + 1));
		return () => {
			//     second
		};
	}, [hitsCount]);

	//============

	//============
	//============
	//============
	//============
	//============
	//============
	if (!hitsCount) return <></>;
	//============
	//============
	return (
		<div className="container">
			<div className="row g-1 my-1 justify-content-between">
				<div className="col col-md">
					<div className="input-group mb-0">
						<label className="input-group-text">
							Results Count
						</label>
						<select
							className="form-select"
							disabled
							value={hitsCount}
						>
							<option value="">{hitsCount}</option>
						</select>
					</div>
				</div>
				<div className="col-12 col-md">
					<div className="input-group mb-0 ">
						<label className="input-group-text">Page</label>
						<select
							className="form-select"
							value={currentPage}
							onChange={(e) => {
								setCurrentPage(Number(e.target.value));
							}}
						>
							{pagesList.map((e, i) => (
								<option key={i} value={e}>
									{e}
								</option>
							))}
						</select>
					</div>
				</div>

				{!bottom && (
					<div className="col col-md">
						<div className="input-group mb-0">
							<label className="input-group-text">
								Items per page
							</label>
							<select
								className="form-select"
								value={itemsPerPage}
								onChange={(e) => {
									setItemsPerPage(
										Number(e.target.value)
									);
								}}
							>
								<option value="5">5</option>
								<option value="10">10</option>
								<option value="15">15</option>
							</select>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default PageSelector;
