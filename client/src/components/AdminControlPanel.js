import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useAppContext } from "../context/AppContext";

const AdminControlPanel = () => {
	//============
	//============
	const { menuItems } = useAppContext()
	//============
	//============
	if (!menuItems) {
		return <h1>Loading...</h1>;
	}
	//============
	//============
	return (
		<StyledWrapper className="container alert-info">
			{/* <div>AdminControlPanel</div> */}
			<ul>
				{menuItems.map((e, i) => (
					<li key={i}>
						<Link to={`/admin/${e}`} className="w-100">
							{e}
						</Link>
					</li>
				))}
			</ul>
		</StyledWrapper>
	);
};

export default AdminControlPanel;
const StyledWrapper = styled.div`
	position: fixed;
	margin-top: 0px;
	top: 50px;
	z-index: 1;
	width: 100%;
	/* padding: 10px; */
	ul {
		list-style: none;
		display: flex;
		justify-content: space-around;
		align-items: center;
		margin-bottom: 0;
	}
	a {
		text-decoration: inherit;
		color: inherit;
		font-size: 1.2rem;
	}
	li {
		padding: 5px;
		&:hover {
			background-color: var(--bs-gray-300);
		}
	}
`;
