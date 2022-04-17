import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import DeleteMeComponent from "./DeleteMeComponent";
//============
//============
//============
//============
//============
//============
//============
const DeleteMe = () => {
	//============
	//============
	const [user, setuser] = useState({});
	const [updateUser, setupdateUser] = useState({});
	//============
	//============
	const [editEmail, seteditEmail] = useState(false);
	const [editPass, seteditPass] = useState(false);
	//============
	useEffect(() => {
		//   first

		return () => {
			//     second
		};
	}, [user]);

	//============
	//============
	const handleChange = (e) => {
		setupdateUser((p) => ({ ...p, [e.target.name]: e.target.value }));
	};
	//============
	//============
	useEffect(() => {
		//   first
		if (!editEmail) {
			setupdateUser((p) => {
				let u = { ...p };
				delete u.email;
				// setupdateUser(u)
				return u;
			});
		}
		if (editEmail) {
			setupdateUser((p) => ({ ...p, email: user.email }));
		}

		return () => {
			//     second
		};
	}, [editEmail]);

	//============
	//============
	useEffect(() => {
		//   first
		if (!editPass) {
			setupdateUser((p) => {
				let u = { ...p };
				delete u.pass;
				// setupdateUser(u)
				return u;
			});
		}
		if (editPass) {
			setupdateUser((p) => ({ ...p, pass: user.pass }));
		}

		return () => {
			//     second
		};
	}, [editPass]);
	//============
	//============

	//============
	return (
		<div>
			DeleteMe
			<button
				onClick={() => {
					setuser({ email: "email1", pass: "pass1" });
				}}
			>
				Add user
			</button>
			<h2>user: {JSON.stringify(user)}</h2>
			<h2>updateuser: {JSON.stringify(updateUser)}</h2>
			<DeleteMeComponent
				name="email"
				originalValue={user.email}
				updateValue={updateUser.email}
				handleChange={handleChange}
				setUpdateObject={setupdateUser}
			/>
			<div className="row">
				<h4>email:</h4>
				<button
					onClick={() => {
						seteditEmail((p) => !p);
					}}
				>
					{editEmail ? "editON" : "editOFF"}
				</button>
				<input
					type="text"
					name="email"
					value={editEmail ? updateUser.email : user.email}
					disabled={!editEmail}
					onChange={handleChange}
				/>
			</div>
			<div className="row">
				<h4>password</h4>
				<button
					onClick={() => {
						seteditPass((p) => !p);
					}}
				>
					{editPass ? "editON" : "editOFF"}
				</button>

				<input
					type="text"
					name="pass"
					value={editPass ? updateUser.pass : user.pass}
					disabled={!editPass}
					onChange={handleChange}
				/>
			</div>
			<button
				onClick={() => {
					console.log(updateUser);
				}}
			>
				applyUpdate
			</button>
		</div>
	);
};

export default DeleteMe;
