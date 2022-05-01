import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useAppContext } from "../context/AppContext";
import { myAxios } from "../myAxios";

//============
//============
//============
//============
//============
const NavBar = () => {
	//============
	//============

	//============
	const { doLogout, user, totalQty, toggleShowMiniCart, resetCart } =
		useAppContext();
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
		// resetCart();
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
		<StyledWrapper className="containerNO">
			<nav className="navbar navbar-expand-md navbar-light bg-light ">
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
									Home2
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
                                   {/* <li className="nav-item">
								<Link
									className="nav-link active"
									to={"/testpage"}
								>
									testpage
								</Link>
							</li> */}

							{user?.isAdmin && (
								<li className="nav-item">
									<Link
										className="nav-link active"
										to={"/admin"}
									>
										Admin
									</Link>
								</li>
							)}
							{user ? (
								<>
									<li
										className="nav-item nav-link active"
										onClick={handleLogout}
									>
										Logout
									</li>
									<li className="nav-item nav-link active user-icon">
										<i className="fa-solid fa-user">
											<div className="name">
												{user.email}
											</div>
										</i>
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
			<i
				className="fa-solid fa-cart-shopping cart"
				onClick={toggleShowMiniCart}
			>
				{totalQty > 0 && (
					<span
						className="position-absolute top-0 start-100 translate-middle badge  bg-success"
						// onClick={toggleShowMiniCart}
					>
						{totalQty}
					</span>
				)}
			</i>
			{/* <div className="cart">
			</div> */}
		</StyledWrapper>
	);
};

export default NavBar;

const StyledWrapper = styled.div`
	/* nav { */
	position: sticky;
	top: 0px;
	z-index: 2;
	width: 100%;
	/* } */
	.navbar-toggler {
		/* border: 1px solid red; */
		margin-left: auto;
		margin-right: 20px;
	}

	li {
		cursor: pointer;
		transition: all 0.2s ease-in-out;

		&:hover {
			opacity: 0.6;
		}
		@media screen and (min-width: 800px) {
			&:hover {
				transform: scale(0.9);
			}
		}
	}

	.cart {
		/* z-index: 3; */
		position: absolute;
		top: 20px;
		right: 10px;
		cursor: pointer;

		span {
			font-size: 0.55rem;
			padding: 5px;
			opacity: 0.8;
		}
	}
	.user-icon {
		cursor: pointer;
		transition: all 0.2s ease-in-out;
		position: relative;
		.name {
			display: none;
		}
		&:hover {
			transform: scale(0.95);

			.name {
				position: absolute;
				bottom: -20px;
				right: 10px;
				display: block;
				opacity: 1;
				font-size: 0.6rem;
			}
		}
	}
`;
