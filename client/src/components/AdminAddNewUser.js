import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { myAxios } from "../myAxios";
import MyDropImageFile from "./MyDropImageFile";
import { useAppContext } from "../context/AppContext";

const AdminAddNewUser = () => {
	//============
	const { loading, error, doAdminCreateNewUser } = useAppContext();
	//============
	const nav = useNavigate();

	//============
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	// const [error, seterror] = useState(false);
	//============
	//============
	const [addProfileImage, setAddProfileImage] = useState(false);
	const [imageURL, setimageURL] = useState("");
	const [imageFile, setimageFile] = useState({});
	//============
	//============
	//============
	const handleCreateNewUser = async () => {
		if (!email || !password) {
			return toast.error("No empty fields");
		}

		const newUser = {
			email,
			password,
		};
		if (addProfileImage && !imageURL) {
			return toast.error("Profile Image Not loaded");
		}
		if (addProfileImage && imageURL) newUser.imageFile = imageFile;
		doAdminCreateNewUser(newUser);
	};
	//============
	//============
	//============
	//============

	//============
	//============
	//============
	//============
	if (error)
		return (
			<div className="alert alert-danger text-center">
				registration-error
			</div>
		);
	//============
	return (
		<>
			<div className="form-floating mb-3">
				<input
					type="email"
					className="form-control"
					id="floatingInput"
					placeholder="name@example.com"
					value={email}
					onChange={(e) => {
						let v = e.target.value;
						v = v.trim().split(" ").join("");
						setEmail(v);
					}}
				/>
				<label>Email address</label>
			</div>
			<div className="form-floating">
				<input
					type="text"
					className="form-control"
					id="floatingPassword"
					placeholder="Password"
					value={password}
					onChange={(e) => {
						setPassword(e.target.value);
					}}
				/>
				<label>Password</label>
			</div>
			{!addProfileImage && (
				<button
					className="btn btn-warning my-3"
					onClick={() => setAddProfileImage(true)}
				>
					Add Profile Image
				</button>
			)}
			{addProfileImage && (
				<>
					<button
						className="btn btn-outline-warning my-3"
						onClick={() => setAddProfileImage(!true)}
					>
						Dont Add Profile Image
					</button>
					
				</>
			)}
			{addProfileImage && (
				<div className="img-upload border border-3">
					<MyDropImageFile
						setimageURL={setimageURL}
						setimageFile={setimageFile}
					/>
				</div>
			)}
			<button
				className="btn btn-outline-warning my-3"
				type="button"
				onClick={handleCreateNewUser}
			>
				Create New User
			</button>
		</>
	);
};

export default AdminAddNewUser;
