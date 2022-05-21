import React from "react";

const Footer = () => {
	return (
		<div className="container  bg-dark  text-light p-2">
			<div className="row p-2">
				<div className="col-md-4 my-2 ">
					<div className="navbar-brand fw-bold">
						crb_eCommerce1
					</div>
					<small className="small my-2">
						We care for our customers, and strive to deliver
						highest level of customer satisfaction.
					</small>
				</div>
				<div className="col-md-4 my-2 ">
					<ul className="list-group list-group-flush border-0  ">
						<div className="row ">
							<div className="col-sm-6  ">
								<li className="list-group-item bg-dark border-0 text-light">
									Home
								</li>
								<li className="list-group-item bg-dark border-0 text-light">
									Products
								</li>
								<li className="list-group-item bg-dark border-0 text-light">
									Checkout
								</li>
							</div>
							<div className="col-sm-6">
								<li className="list-group-item bg-dark border-0 text-light">
									Profile
								</li>
								<li className="list-group-item bg-dark border-0 text-light">
									Cart
								</li>
							</div>
						</div>
					</ul>
				</div>
				<div className="col-md-4 my-2">
					<div className="fw-bold">Contact Us</div>
					<div className="small my-2">
						<div className="">233 Random Street</div>
						<div className="">Random City</div>
					</div>
					<div className="row my-2">
						<div className="col">
							<i className="fa-solid fa-envelope"></i>
						</div>
						<div className="col">
							<i className="fa-solid fa-phone"></i>
						</div>
						<div className="col">
							<i className="fa-brands fa-twitter"></i>
						</div>
						<div className="col">
							<i className="fa-brands fa-facebook-f"></i>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Footer;
