import React from "react";
import { Link } from "react-router-dom";

const AdminStats = () => {
	return (
		<>
			<div className="container py-4">
				<div className="row g-3">
					<div className="col-md p-2 border">
						<div className="card text-center">
							<button className="btn btn-outline-info  text-dark">
								<Link to="/admin/users">Users</Link>
							</button>
							<div className="card-body">
								<h5 className="card-title">
									Total Users: 5
								</h5>
								{/* <p className="card-text">
									With supporting text below as a
									natural lead-in to additional
									content.
								</p>
								<a href="#" className="btn btn-primary">
									Go somewhere
								</a> */}
								<button className="btn btn-primary">
									Add New User
								</button>
							</div>
							<div className=" btn btn-outline-info">
								2 New Users This Week
							</div>
						</div>
					</div>
					<div className="col-md  p-2 border">
						<div className="card text-center">
							<button className="btn btn-outline-info  text-dark">
								<Link to="/admin/users">Orders</Link>
							</button>
							<div className="card-body">
								<h5 className="card-title">
									This Month Sales $ 999.12
								</h5>

								{/* <p className="card-text">
									With supporting text below as a
									natural lead-in to additional
									content.
								</p> */}
							</div>
							<div className=" btn btn-outline-info">
								5 New Orders Today
							</div>
							<div className=" btn btn-outline-warning">
								5 Orders Processing
							</div>
							<div className=" btn btn-outline-danger">
								5 orders with issues
							</div>
						</div>
					</div>
					<div className="col-md  p-2 border">
						<div className="card text-center">
							<button className="btn btn-outline-info text-dark ">
								<Link to="/admin/users">Products</Link>
							</button>
							<div className="card-body">
								<h5 className="card-title">
									Total Products: 99
								</h5>
								<button className="btn btn-primary">
									Add New Product
								</button>
								{/* <p className="card-text">
									With supporting text below as a
									natural lead-in to additional
									content.
								</p> */}
								{/* <a href="#" className="btn btn-primary">
									Go somewhere
								</a> */}
							</div>
							<div className=" btn btn-outline-info">
								5 New Products Added Today
							</div>
							<div className=" btn btn-outline-info">
								25 New Products Added This Month
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default AdminStats;
