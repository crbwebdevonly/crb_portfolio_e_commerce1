import React from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const HomePageHero = () => {
	const { sliderProductsList } = useAppContext();
	console.log(sliderProductsList);
	return (
		<div className="container0 p-3 my-3 shadow-sm bg-light">
			<h4>Featured Products</h4>
			<div className="row row-cols-md-2 row-cols-lg-3 g-1 ">
				{sliderProductsList.map((e) => (
					<div className="card">
						<div className="card-title small bg-secondary text-light p-2">
							{e.title}
						</div>
						<div className="" style={{ height: "300px" }}>
							<img
								src={
									e.image ||
									"https://placekitten.com/400/600"
								}
								alt=""
								className="img-fluid99"
								style={{
									objectFit: "contain",
									width: "100%",
									height: "100%",
								}}
							/>
						</div>
						<div className="row my-2">
							<div className="col">
								<Link to={`/product-item/${e._id}`}>
									<button className="btn btn-outline-info">
										View Product
									</button>
								</Link>
							</div>
							<div className="col text-end fs-5">
								<div className="fw-bold">
									$ {e.price}
								</div>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default HomePageHero;
