import React from "react";
import { useEffect } from "react";
import { useState } from "react";
//============
//============
//============
//============
//============
//============
//============
const DeleteMeComponent = (props) => {
	//============
	//============
	const { name, originalValue, updateValue, handleChange, setUpdateObject } =
		props;
	//============
	// const [user, setuser] = useState({});
	// const [updateUser, setupdateUser] = useState({});
	//============
	//============
	// const [editEmail, seteditEmail] = useState(false);
	const [edit, setedit] = useState(false);
	//============
	useEffect(() => {
		//   first

		return () => {
			//     second
		};
	}, []);

	//============
	//============
	// const handleChange = (e) => {
	// 	setupdateUser((p) => ({ ...p, [e.target.name]: e.target.value }));
	// };
	// //============
	//============
	useEffect(() => {
		//   first
		if (!edit) {
			setUpdateObject((p) => {
				let u = { ...p };
				delete u[name];
				return u;
			});
		}
		if (edit) {
			setUpdateObject((p) => ({ ...p, [name]: originalValue }));
		}

		return () => {
			//     second
		};
	}, [edit]);

	//============
	//============

	//============
	//============

	//============
	return (
		<div>
			<div className="row">
				<h4>{name}:</h4>
				<button
					onClick={() => {
						setedit((p) => !p);
					}}
				>
					{edit ? "editON" : "editOFF"}
				</button>
				<input
					type="text"
					name={name}
					value={edit ? updateValue : originalValue}
					disabled={!edit}
					onChange={handleChange}
				/>
			</div>
		</div>
	);
};

export default DeleteMeComponent;
