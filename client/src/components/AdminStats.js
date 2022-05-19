import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { myAxios } from "../myAxios";

const AdminStats = () => {
	//============
	const [localLoading, setlocalLoading] = useState(true);
	const navigate = useNavigate();
	//============
	const {
		loading,
		error,
		errorMessage,
		adminStats,
		getAdminStats,
		handleIssueClick,
	} = useAppContext();
	//============
	//============
	const { usersStats, ordersStats, productsStats } = adminStats;
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
	// const {
	// 	completed = 0,
	// 	issue = 0,
	// 	processing = 0,
	// 	aggregateTotalSales = 0,
	// 	aggregateMonthlySales = { amount: 0, count: 0 },
	// 	aggregateWeeklySales = { amount: 0, count: 0 },
	// 	aggregateTodaySales = { amount: 0, count: 0 },
	// } = ordersStats;
	//============
	//============
	useEffect(() => {
		//   first
		getAdminStats();
		setTimeout(() => {
			setlocalLoading(false);
		}, 0);
		return () => {
			//     second
		};
	}, []);

	//============

	//============
	//============
	const handleIssueClick999 = () => {
		navigate("/admin/orders");
	};
	//============
	//============
	//============
	// console.log(
	// 	"admin",
	// 	aggregateMonthlySales,
	// 	aggregateWeeklySales,
	// 	aggregateTodaySales
	// );
	//============
	//============
	//============
	//============
	//============
	// return <div className="spinner-border mx-auto d-grid "></div>;
	// if (loading || localLoading)
	if (loading) return <div className="spinner-border mx-auto d-grid "></div>;
	//============
	if (error)
		return (
			<h5 className="alert alert-danger">
				Error occured- getting admin stats
				<p>
					{errorMessage}
					{/* {JSON.stringify(errorMessage)} */}
				</p>
			</h5>
		);
	//============
	//============

	//============
	//============
	//============
	//============
	// if (aggregateMonthlySales && aggregateWeeklySales && aggregateTodaySales)
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
									Total Users: {usersStats.total}
								</h5>

								<Link
									to="/admin/Users/add-new-user"
									className="btn btn-primary"
								>
									Add New User
								</Link>
							</div>
							<button
								className=" btn btn-outline-info"
								disabled
							>
								{usersStats.today} New Users Today
							</button>
							<button
								className=" btn btn-outline-info"
								disabled
							>
								{usersStats.week} New Users This Week
							</button>
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
							<div
								className=" btn btn-outline-danger my-1"
								onClick={handleIssueClick}
							>
								{issue} orders with issues
							</div>
							<div className="card-body">
								<h5 className="card-title">
									Total Sales ${" "}
									{aggregateTotalSales.toFixed(2)}
								</h5>
								<p className="border">
									This Month Sales ${" "}
									{aggregateMonthlySales.amount.toFixed(
										2
									)}
									<br />{" "}
									{aggregateMonthlySales.count}{" "}
									orders
								</p>
								<p className="border">
									This week Sales ${" "}
									{aggregateWeeklySales.amount.toFixed(
										2
									)}
									<br />
									{aggregateWeeklySales.count} orders
								</p>
								<p className="border">
									Todays' Sales ${" "}
									{aggregateTodaySales.amount.toFixed(
										2
									)}
									<br /> {aggregateTodaySales.count}{" "}
									orders
								</p>
							</div>

							<button className=" btn btn-outline-success disabled">
								{completed} Orders Completed
							</button>
							<button className=" btn btn-outline-warning disabled">
								{processing} Orders Processing
							</button>
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
									Total Products:{" "}
									{productsStats.total}
								</h5>
								<Link
									to="/admin/products/add-new-product"
									className="btn btn-primary "
								>
									Add New Product
								</Link>
							</div>
							<button
								className=" btn btn-outline-info"
								disabled
							>
								{productsStats.today} New Products Added
								Today
							</button>

							<button
								className=" btn btn-outline-info"
								disabled
							>
								{productsStats.week} New Products Added
								This Week
							</button>

							<button
								className=" btn btn-outline-info"
								disabled
							>
								{productsStats.month} New Products Added
								This Month
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default AdminStats;
