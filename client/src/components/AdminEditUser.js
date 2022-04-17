import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import { myAxios } from "../myAxios";
import InputControlled from "./InputControlled";
import Spinner from "./Spinner";

const AdminEditUser = (props) => {
	//============
	//============
	const { userId } = useParams();
	//============
	//============
	const [loading, setLoading] = useState(true);
	const [isError, setisError] = useState(false);
	const [editMode, setEditMode] = useState(false);
	const [user, setUser] = useState({});
	const [userUpdate, setUserUpdate] = useState({});
	const [applyDisable, setapplyDisable] = useState(true);
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
				// const { email, password, isAdmin } = reply.data;
				// setUserUpdate({ email, password, isAdmin });
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
	const handleApplyUpdate = () => {
		console.log(userUpdate);
	};
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
					<button
						className="btn btn-info w-50"
						onClick={() => {
							setEditMode(false);
						}}
					>
						Disable Edit
					</button>
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
`;
