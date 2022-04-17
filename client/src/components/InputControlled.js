import React from "react";
import { useEffect } from "react";
import { useState } from "react";
// import styled from "styled-components";

const InputControlled = (props) => {
	//============
	//============
	const {
		name,
		label = name,
		updateValue,
		handleChange,
		type = "text",
		optionsList = [],
		setUpdateObject,
		originalData,
	} = props;
	//============
	//============
	//============
	const [edit, setEdit] = useState(false);
	//============
	//============
	//============
	useEffect(() => {
		// if edit on-add data to update object
		if (edit) {
			setUpdateObject((p) => ({ ...p, [name]: originalData }));
		}

		//  if edit off-remove data from update object
		// or retun to original
		if (!edit) {
			setUpdateObject((p) => {
				let prev = { ...p };
				delete prev[name];
				return prev;
			});
		}

		return () => {
			//     second
		};
	}, [edit]);

	//============
	//============
	//============
	return (
		<div className="input-group mb-3">
			{!edit && (
				<div className="d-grid align-items-center justify-content-center">
					<h6>Edit Off</h6>
					<i
						className="fa-solid fa-toggle-off fs-1 text-warning"
						onClick={() => {
							setEdit(true);
						}}
					></i>
				</div>
			)}
			{edit && (
				<div className="d-grid align-items-center justify-content-center">
					<h6>Edit ON</h6>
					<i
						className="fa-solid fa-toggle-on fs-1 text-danger "
						onClick={() => {
							setEdit(false);
						}}
					></i>
				</div>
			)}
			<div className="form-floating mb-0 flex-grow-1 ms-2">
				{type === "text" && (
					<input
						type="text"
						name={name}
						label={label}
						className="form-control w-100"
						value={
							edit ? setUpdateObject[name] : originalData
						}
						onChange={handleChange}
						disabled={!edit}
					/>
				)}{" "}
				{type === "select-bool" && (
					<select
						className="form-select"
						value={edit ? updateValue : originalData}
						disabled={!edit}
						onChange={handleChange}
						name={label || name}
						label={label || name}
					>
                              <option value={true}>{"Yes"}</option>
                              <option value={false}>{"No"}</option>
					</select>
				)}
				{type === "select" && (
					<select
						className="form-select"
						value={edit ? updateValue : originalData}
						disabled={!edit}
						onChange={handleChange}
					>
						{label}
						{optionsList.map((e) => (
							<option value={e}>{e}</option>
						))}
					</select>
				)}
				<label>{label}</label>
			</div>
		</div>
	);
};

export default InputControlled;
// const StyledWrapper = styled.div`
// 	display: flex;
// `;
