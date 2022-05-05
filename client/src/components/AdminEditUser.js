import moment from "moment";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import styled from "styled-components";
import { useAppContext } from "../context/AppContext";
import { myAxios } from "../myAxios";
import InputControlled from "./InputControlled";
import Spinner from "./Spinner";

const AdminEditUser = (props) => {
	//============
	const { handleGoToCustomersOrdersPageClick } = useAppContext();
	//============
	const { userId } = useParams();
	//============
	//============
	const [loading, setLoading] = useState(true);
	const [isError, setisError] = useState(false);
	const [editMode, setEditMode] = useState(false);
	const [user, setUser] = useState({});
	const [customersOrderList, setCustomersOrderList] = useState([]);
	const [userUpdate, setUserUpdate] = useState({});
	const [applyDisable, setapplyDisable] = useState(true);
	//============
	//============
	const { _id: id, email, password, isAdmin, createdAt, image } = user;
	//============
	const navigate = useNavigate();
	//============
	//============
	//============
	useEffect(() => {
		//   first -fetch user
		const fetchUser = async () => {
			try {
				const reply = await myAxios.post("/api/auth/getoneuser", {
					userId,
				});
				setUser(reply.data);
				// const { email, password, isAdmin } = reply.data;
				// setUserUpdate({ email, password, isAdmin });
				const orders = await myAxios.post(
					"/api/orders/getCustomersOrdersList",
					{ userId }
				);
				setCustomersOrderList(orders.data);
				setLoading(false);
			} catch (error) {}
		};
		fetchUser();
		return () => {
			//     second
		};
	}, []);

	//============
	//============
	useEffect(() => {
		//   first
		if (!editMode) setUserUpdate({});

		return () => {
			//     second
		};
	}, [editMode]);

	//============
	//============
	useEffect(() => {
		//   first-apply update valid check
		setapplyDisable(false);
		if (Object.entries(userUpdate).length < 1) {
			setapplyDisable(true);
			return;
		}
		Object.entries(userUpdate).forEach((e) => {
			if (!e[1] && typeof e[1] !== "boolean") setapplyDisable(true);
		});

		return () => {
			//     second
		};
	}, [userUpdate]);

	//============
	//============
	// const generateInputs = () => {
	// 	const entries = Object.entries(userUpdate);
	// 	return entries.map((e, i) => (
	// 		<InputControlled
	// 			key={i}
	// 			label={e[0]}
	// 			updateValue={userUpdate[e[0]]}
	// 			handleChange={handleUserUpdateChange}
	// 		/>
	// 	));
	// };
	//============
	//============
	const handleUserUpdateChange = (e) => {
		console.log(e.target.name, e.target.value);
		setUserUpdate((p) => {
			let value = e.target.value;
			if (value === "true" || value === "false") {
				value = JSON.parse(value);
			}
			return { ...p, [e.target.name]: value };
		});
	};
	//============
	//============
	const handleApplyUpdate = async () => {
		console.log(userUpdate);
		try {
			const reply = await myAxios.put(
				`/api/auth/updateuser/${user._id}`,
				userUpdate
			);
			// window.location.reload(true);
			// console.log(reply.data);
			toast.success("Update user success");
			setUser(reply.data);
		} catch (error) {
			toast.error("Update user failed");
		}
	};
	//============
	//============
	const handleDeleteUser = async () => {
		try {
			const reply = await myAxios.delete(`/api/auth/deleteuser/${id}`);
			toast.success(" user Deleted");
			setTimeout(() => {
				navigate("/admin/users");
			}, 2000);
		} catch (error) {
			toast.error("Update user failed");
		}
	};
	//============

	//============
	//============
	//============
	//============
	if (isError)
		return (
			<div className="alert-danger p-3 my-3">error loading user</div>
		);
	//============
	if (loading) return <Spinner />;
	//============
	//============
	return (
		<StyledWrapper>
			{/* <h6>user: {JSON.stringify(user)}</h6> */}
			{/* <h6>update: {JSON.stringify(userUpdate)}</h6> */}
			<div className="card p-2">
				<div className="img-wrap d-grid justify-content-center">
					{image ? (
						<img
							src={image}
							className="card-img-top mx-auto"
							alt="profile image"
						/>
					) : (
						<i className="fa-solid fa-user display-1 mx-auto"></i>
					)}
				</div>
				<div className="info-wrap">
					<h5 className="card-title">
						Admin: {isAdmin ? "Yes" : "No"}
					</h5>
					<h5>userID: {id}</h5>
					<h5>Email: {email}</h5>
					<h5>password: {password}</h5>
				</div>
				<hr />
				{!editMode ? (
					<button
						className="btn btn-warning w-50 ms-auto"
						onClick={() => {
							setEditMode(true);
						}}
					>
						Enable Edit
					</button>
				) : (
					<>
						{" "}
						<div className="d-sm-flex">
							<button
								className="btn btn-info w-50 "
								onClick={() => {
									setEditMode(false);
								}}
							>
								Disable Edit
							</button>
							<i class="fa-solid fa-user-slash ms-auto fs-1 shadowp p-1  ">
								<button
									className="btn btn-danger fs-6 ms-2"
									onClick={handleDeleteUser}
								>
									Delete this User
								</button>
							</i>
						</div>
					</>
				)}
				<hr />
				{editMode && (
					<>
						<div className="edit-control-wrap">
							<InputControlled
								type="select-bool"
								label="isAdmin"
								name="isAdmin"
								originalData={user.isAdmin}
								updateValue={userUpdate.isAdmin}
								handleChange={handleUserUpdateChange}
								setUpdateObject={setUserUpdate}
							/>
						</div>
						<div className="edit-control-wrap">
							<InputControlled
								type="text"
								name="email"
								// label="email"
								originalData={user.email}
								updateValue={userUpdate.email}
								handleChange={handleUserUpdateChange}
								setUpdateObject={setUserUpdate}
							/>
						</div>
						<div className="edit-control-wrap">
							<InputControlled
								type="text"
								name="password"
								label="password"
								originalData={user.password}
								updateValue={userUpdate.password}
								handleChange={handleUserUpdateChange}
								setUpdateObject={setUserUpdate}
							/>
						</div>
						<button
							className="btn btn-danger w-50"
							onClick={handleApplyUpdate}
							disabled={applyDisable}
						>
							Apply Update
						</button>
					</>
				)}
			</div>
			{!editMode && (
				<div className="container">
					<div className="row border border-2 p-2">
						<h2
							className="btn btn-info"
							onClick={() => {
								handleGoToCustomersOrdersPageClick({
									userId: id,
								});
							}}
						>
							Go to Customer's orders page{" "}
						</h2>
						{/* {JSON.stringify(customersOrderList)} */}
						{customersOrderList.length < 1 && (
							<h5>No Orders to Display</h5>
						)}
						{customersOrderList.length > 0 &&
							customersOrderList.map((e) => (
								<LocalOrderListItem
									key={e._id}
									{...e}
								/>
							))}
					</div>
				</div>
			)}
		</StyledWrapper>
	);
};

export default AdminEditUser;

const StyledWrapper = styled.div`
	height: 100%;
	width: 100%;
	padding: 10px;
	/* max-width: 24rem; */
	margin: 0 auto;
	a {
		text-decoration: none;
		color: inherit;
	}
	h5 {
		font-size: 1rem;
	}
	i {
		cursor: pointer;
	}
	.input-group span {
		font-size: 0.7rem !important;
	}
	.input-group input {
		font-size: 0.8rem !important;
	}
`;

const LocalOrderListItem = (props) => {
	const {
		_id: id,
		createdAt,
		status,
		orderTotalAmount,
		orderTotalQuantity,
	} = props;
	//============
	//============
	function getStatusClassName(status) {
		if (status === "processing") return "warning";
		if (status === "completed") return "success";
		if (status === "check-issue") return "danger";
	}
	//============
	//============
	const c = getStatusClassName(status);
	return (
		<div className={`card rounded p-2 m-2 border-5 border-${c}`}>
			<div className="input-group input-group mb-0  ">
				<span className="input-group-text fw-bold">
					Order Status
				</span>
				<input
					type="text"
					className={`form-control order-id text-${c}`}
					disabled
					value={status}
				/>
			</div>
			<div className="input-group input-group mb-0 col ">
				<span className="input-group-text fw-bold">OrderID:</span>
				<input
					type="text"
					className="form-control order-id"
					disabled
					value={id}
				/>
			</div>
			<div className="input-group input-group mb-0 col ">
				<span className="input-group-text fw-bold fs-6">
					Order Date:
				</span>
				<input
					type="text"
					className="form-control order-date"
					disabled
					value={`${moment(createdAt).format(
						"MMMM Do YYYY"
					)} , ${moment(createdAt).fromNow()}`}
				/>
			</div>

			<div className="input-group input-group mb-0  ">
				<span className="input-group-text fw-bold">
					Items Quantity
				</span>
				<input
					type="text"
					className="form-control order-id"
					disabled
					value={orderTotalQuantity}
				/>
				<span className="input-group-text fw-bold fs-6">
					Total Amount:
				</span>
				<input
					type="text"
					className="form-control order-date fw-bold "
					disabled
					value={`$ ${orderTotalAmount}`}
				/>
			</div>
		</div>
	);
};
