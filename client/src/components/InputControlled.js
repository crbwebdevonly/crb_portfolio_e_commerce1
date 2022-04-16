import React from "react";
import { useState } from "react";
import styled from "styled-components";

const InputControlled = (props) => {
	//============
	//============
	const { label, name, dataValue, handleChange } = props;
	//============
	const [edit, setEdit] = useState(false);
	//============
	return (
		<div class="input-group mb-3">
			<button className="btn btn-danger">btn</button>
			<div className="form-floating mb-0 ">
				<input
					type="text"
					name={name || label}
					className="form-control"
					placeholder={label}
					value={dataValue}
					onChange={handleChange}
					disabled={edit}
				/>
				<label>{label}</label>
			</div>
		</div>
	);
};

export default InputControlled;
const StyledWrapper = styled.div`
	display: flex;
`;
