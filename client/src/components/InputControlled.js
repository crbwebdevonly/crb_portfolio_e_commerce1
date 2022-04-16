import React from "react";
import { useState } from "react";
// import styled from "styled-components";

const InputControlled = (props) => {
	//============
	//============
	const {
		label,
		name,
		dataValue,
		handleChange,
		type = "text",
		optionsList = [],
	} = props;
	//============
	const [originalData, setOriginalData] = useState(dataValue);
	//============
	//============
	const [edit, setEdit] = useState(false);
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
						name={name || label}
						className="form-control w-100"
						placeholder={label}
						value={edit ? dataValue : originalData}
						onChange={handleChange}
						disabled={!edit}
					/>
				)}{" "}
                    {type === "select-bool" && (
					<select
						className="form-select"
						value={edit ? dataValue : originalData}
						disabled={!edit}
					>
						{label}
						{optionsList.map((e) => (
							<option value={e}>{e}</option>
						))}
					</select>
				)}
				{type === "select" && (
					<select
						className="form-select"
						value={edit ? dataValue : originalData}
						disabled={!edit}
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
