import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import { myAxios } from "../myAxios";
import Spinner from "./Spinner";

const AdminEditUser = (props) => {
	//============
	//============
	const { userId } = useParams();
	//============
	//============
	const [loading, setLoading] = useState(true);
	const [isError, setisError] = useState(false);
	const [isEdit, setisEdit] = useState(false);
	const [user, setUser] = useState({});
	//============
	//============
	const { _id: id, email, password, isAdmin, createdAt, image } = user;
	//============
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
	//============
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
				<h5 className="card-title  mt-5 mb-3">Email: {email}</h5>
				<h5 className="card-title  mt-5 mb-3">userId:{userId}</h5>
				<div className="price-wrap">
					<h5 className="card-title">
						Admin: {isAdmin ? "Yes" : "No"}
					</h5>
				</div>
			</div>
			{!isEdit && (
				<div className="edit-control-wrap d-flex">
					<i
						className="fa-solid fa-toggle-off fs-1 text-warning"
						onClick={() => {
							setisEdit(true);
						}}
					>
						{" "}
					</i>
					<h3>Toggle to Edit User</h3>
				</div>
			)}
			{isEdit && (
				<div className="edit-control-wrap d-flex  ">
					<i
						className="fa-solid fa-toggle-on fs-1 text-danger"
						onClick={() => {
							setisEdit(false);
						}}
					></i>
					<h2>Edit Enabled</h2>
				</div>
			)}
			{!isEdit && (
				<div className="edit-wrap">
					<div className="form-floating mb-3">
						<input
							type="email"
							className="form-control"
							id="floatingInput"
							placeholder="name@example.com"
							disabled={isEdit}
						/>
						<label>Email address</label>
					</div>
					<div className="form-floating">
						<input
							type="password"
							className="form-control"
							id="floatingPassword"
							placeholder="Password"
						/>
						<label>Password</label>
					</div>
					<button className="btn btn-outline-warning my-4">
						Apply Update
					</button>
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
	max-width: 24rem;
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
`;
