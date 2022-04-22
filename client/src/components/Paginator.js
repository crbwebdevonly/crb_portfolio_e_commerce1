import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { CustomerContext } from "../context/CustomerContext";

const Paginator = (props) => {
	const { bottom } = props;
	//============
	//============
	const { paginatorData, setItemsPerPage, setCurrentPage } =
		useContext(CustomerContext);
	//============
	const { itemsPerPage, currentPage, hitsCount } = paginatorData;
	//============
	//============
	// const [numPages, setNumPages] = useState(1);
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
	if (!hitsCount) return <></>;
	//============
	//============
	return (
		<div className="container">
			<div className="row justify-content-between">
				<div className="col col-md-6">
					<ul className="pagination pagination-sm">
						{pagesList.map((e, i) => (
							<li
								key={i}
								className={
									currentPage === e
										? "page-item " + "active"
										: "page-item "
								}
								role="button"
								onClick={() => {
									setCurrentPage(e);
								}}
							>
								<span className="page-link">{e}</span>
							</li>
						))}
						{/* <li className="page-item">
							<a className="page-link" href="#">
								2
							</a>
						</li>
						<li className="page-item">
							<a className="page-link" href="#">
								3
							</a>
						</li> */}
					</ul>
				</div>
				{!bottom && (
					<div className="col col-md-6">
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

export default Paginator;
