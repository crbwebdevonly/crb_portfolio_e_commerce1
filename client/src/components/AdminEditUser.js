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
				setUserUpdate(reply.data);
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
	// const generateInputs = () => {
	// 	const entries = Object.entries(userUpdate);
	// 	return entries.map((e, i) => (
	// 		<InputControlled
	// 			key={i}
	// 			label={e[0]}
	// 			dataValue={userUpdate[e[0]]}
	// 			handleChange={handleUserUpdateChange}
	// 		/>
	// 	));
	// };
	//============
	//============
	const handleUserUpdateChange = (e) => {
		setUserUpdate((p) => ({ ...p, [e.target.name]: e.target.value }));
	};
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
								type="select"
								label="isAdmin"
								dataValue="true"
								optionsList={["true", "false"]}
							/>
						</div>
						<div className="btn btn-danger w-50">
							Apply Update
						</div>
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
