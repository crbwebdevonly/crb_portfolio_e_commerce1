import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const AdminUserItem = (props) => {
	//============
	//============
	//============
	//============
	const { _id: id, email, password, isAdmin, createdAt, image } = props;
	//============
	//============
	//============

	//============
	//============
	return (
		<StyledWrapper>
			<div className="card p-2">
				<Link to={`/admin/users/${id}`}>
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
					<h5 className="card-title  mt-5 mb-3">
						Email: {email}
					</h5>
				</Link>
				<div className="price-wrap">
					<h5 className="card-title">
						Admin: {isAdmin ? "Yes" : "No"}
					</h5>
				</div>
			</div>
		</StyledWrapper>
	);
};

export default AdminUserItem;

const StyledWrapper = styled.div`
	height: 100%;
	width: 100%;
	padding: 10px;
	max-width: 24rem;
	a {
		text-decoration: none;
		color: inherit;
	}
	h5 {
		font-size: 1rem;
	}
`;
