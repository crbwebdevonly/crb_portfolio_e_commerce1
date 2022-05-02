import React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { myAxios } from "../myAxios";

const AdminStats = () => {
	//============
	//============
	const { loading, error, adminStats, getAdminStats } = useAppContext();
	//============
	//============

	//============
	//============
	useEffect(() => {
		//   first
		getAdminStats();
		return () => {
			//     second
		};
	}, []);

	//============
	//============
	//============
	//============
	//============
	//============
	//============
	if (loading) return <div className="spinner-border mx-auto d-grid "></div>;
	//============
	if (error)
		return (
			<h5 className="alert alert-danger">
				Error occured- getting all orders
			</h5>
		);
	//============
	//============
	//============
	//============
	//============
	//============
	return (
		<>
			<div className="container py-4">
				<div className="row g-3">
					<div className="col-md p-2 border">
						<div className="card text-center">
							<Link
								to="/admin/users"
								className="btn btn-outline-info  text-dark"
							>
								Users
							</Link>
							<div className="card-body">
								<h5 className="card-title">
									Total Users: 5
								</h5>

								<Link
									to="/admin/Users/add-new-user"
									className="btn btn-primary"
								>
									Add New User
								</Link>
							</div>
							<div className=" btn btn-outline-info">
								2 New Users Today
							</div>
							<div className=" btn btn-outline-info">
								2 New Users This Week
							</div>
						</div>
					</div>
					<div className="col-md  p-2 border">
						<div className="card text-center">
							<Link
								to="/admin/orders"
								className="btn btn-outline-info  text-dark"
							>
								Orders
							</Link>
							<div className="card-body">
								<h5 className="card-title">
									This Month Sales $ 999.12
								</h5>
								<p>from 20 orders</p>
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
							<Link
								to="/admin/products"
								className="btn btn-outline-info text-dark "
							>
								Products
							</Link>
							<div className="card-body">
								<h5 className="card-title">
									Total Products: 99
								</h5>
								<Link
									to="/admin/products/add-new-product"
									className="btn btn-primary "
								>
									Add New Product
								</Link>
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
