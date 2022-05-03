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
	const {
		usersStats = {},
		ordersStats = {},
		productsStats = {},
	} = adminStats;
	//============
	//============
	const {
		completed,
		issue,
		processing,
		aggregateTotalSales,
		aggregateMonthlySales,
		aggregateWeeklySales,
		aggregateTodaySales,
	} = ordersStats;
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
	//============
	//============
	if (loading) return <div className="spinner-border mx-auto d-grid "></div>;
	//============
	if (error)
		return (
			<h5 className="alert alert-danger">
				Error occured- getting admin stats
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
			{JSON.stringify(productsStats)}
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
									Total Users: {usersStats.total}
								</h5>

								<Link
									to="/admin/Users/add-new-user"
									className="btn btn-primary"
								>
									Add New User
								</Link>
							</div>
							<div className=" btn btn-outline-info">
								{usersStats.today} New Users Today
							</div>
							<div className=" btn btn-outline-info">
								{usersStats.week} New Users This Week
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
							<div className=" btn btn-outline-danger my-1">
								{issue} orders with issues
							</div>
							<div className="card-body">
								<h5 className="card-title">
									Total Sales $ {aggregateTotalSales}
								</h5>
								<p className="border">
									This Month Sales ${" "}
									{aggregateMonthlySales.amount.toFixed(2)}
									<br />{" "}
									{aggregateMonthlySales.count}{" "}
									orders
								</p>
								<p className="border">
									This week Sales ${" "}
									{aggregateWeeklySales.amount.toFixed(2)}
									<br />
									{aggregateWeeklySales.count} orders
								</p>
								<p className="border">
									Todays' Sales ${" "}
									{aggregateTodaySales.amount.toFixed(2)}
									<br /> {
										aggregateTodaySales.count
									}{" "}
									orders
								</p>
							</div>

							<div className=" btn btn-outline-success">
								{completed} Orders Completed
							</div>
							<div className=" btn btn-outline-warning">
								{processing} Orders Processing
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
									Total Products: {productsStats.total}
								</h5>
								<Link
									to="/admin/products/add-new-product"
									className="btn btn-primary "
								>
									Add New Product
								</Link>
							</div>
							<div className=" btn btn-outline-info">
								{productsStats.today} New Products Added Today
							</div>

                                   <div className=" btn btn-outline-info">
								{productsStats.week} New Products Added This Week
							</div>

							<div className=" btn btn-outline-info">
								{productsStats.month} New Products Added This Month
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default AdminStats;
