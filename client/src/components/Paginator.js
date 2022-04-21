import React from "react";

const Paginator = () => {
	return (
		<div className="container">
			<div className="row justify-content-between">
				<div className="col col-md-6">
					<ul className="pagination pagination-sm">
						<li
							className="page-item active"
							aria-current="page"
						>
							<span className="page-link">1</span>
						</li>
						<li className="page-item">
							<a className="page-link" href="#">
								2
							</a>
						</li>
						<li className="page-item">
							<a className="page-link" href="#">
								3
							</a>
						</li>
					</ul>
				</div>
				<div className="col col-md-6">
					<div className="input-group mb-0">
						<label class="input-group-text">
							Items per page
						</label>
						<select
							className="form-select"
							id="inputGroupSelect01"
						>
							<option selected>Choose...</option>
							<option value="1">One</option>
							<option value="2">Two</option>
							<option value="3">Three</option>
						</select>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Paginator;
