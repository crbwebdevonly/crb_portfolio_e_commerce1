import React, { useContext } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { AuthContext } from "../context/AuthContext";
import { myAxios } from "../myAxios";

//============
//============
//============
//============
//============
const NavBar = () => {
	//============
	const { doLogout, user } = useContext(AuthContext);
	//============
	const [showMobileMenu, setShowMobileMenu] = useState(false);
	//============
	//============
	//============
	//============
	//============
	//============
	//============
	//============
	//============
	//============
	//============
	const handleLogout = () => {
		doLogout();
	};
	//============
	//============
	//============
	const testFetch = async () => {
		try {
			const reply = await myAxios.get("/");
			console.log(reply);
		} catch (error) {
			console.log(error);
		}
	};
	//============
	//============
	//============
	//============
	//============
	//============
	//============
	//============
	//============
	//============
	//============
	//============
	//============
	//============
	//============
	//============
	return (
		<StyledWrapper>
			<nav className="navbar navbar-expand-md navbar-light bg-light">
				<div className="container-fluid">
					<div className="navbar-brand" onClick={testFetch}>
						crb_eCommerce1
					</div>
					<button
						className="navbar-toggler"
						type="button"
						data-bs-toggle="collapse"
						data-bs-target="#navbarNav"
						aria-controls="navbarNav"
						aria-expanded="false"
						aria-label="Toggle navigation"
					>
						<span
							className="navbar-toggler-icon "
							onClick={() => {
								setShowMobileMenu(!showMobileMenu);
							}}
						></span>
					</button>
					<div
						className={
							showMobileMenu
								? "collapse navbar-collapse show"
								: "collapse navbar-collapse "
						}
						id="navbarNav"
					>
						<ul
							className="navbar-nav"
							onClick={() => {
								setShowMobileMenu(false);
							}}
						>
							<li className="nav-item">
								<Link
									className="nav-link active"
									to={"/"}
								>
									Home
								</Link>
							</li>
							<li className="nav-item">
								<Link
									className="nav-link active"
									to={"/productslist"}
								>
									Products
								</Link>
							</li>
							<li className="nav-item">
								<Link
									className="nav-link active"
									to={"/checkout"}
								>
									Checkout
								</Link>
							</li>

							<li className="nav-item">
								<Link
									className="nav-link active"
									to={"/admin"}
								>
									Admin
								</Link>
							</li>
							{user ? (
								<>
									<li
										className="nav-item nav-link active"
										onClick={handleLogout}
									>
										Logout
									</li>
									<li className="nav-item nav-link active">
										<i class="fa-solid fa-user"></i>
									</li>
								</>
							) : (
								<li className="nav-item">
									<Link
										className="nav-link active"
										to={"/login-register"}
									>
										Login / Register
									</Link>
								</li>
							)}
						</ul>
					</div>
				</div>
			</nav>
		</StyledWrapper>
	);
};

export default NavBar;

const StyledWrapper = styled.div`
	.navbar-toggler {
		/* border: 1px solid red; */
		margin-left: auto;
		margin-right: 10px;
	}

	li {
		cursor: pointer;
		transition: all 0.2s ease-in-out;
		&:hover {
			opacity: 0.6;
			transform: scale(0.8);
		}
	}
`;
