// import { Carousel } from 'bootstrap'
import Carousel from "react-bootstrap/Carousel";
import { useContext } from "react";
import { useEffect } from "react";
import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { CustomerContext } from "../context/CustomerContext";
import { useState } from "react";

const HomePageSlider = (props) => {
	//============
	console.log(props);
	//============

	//============
	//============

	//============
	//============
	return (
		<StyledWrapper>
			<Carousel>
				<Carousel.Item>
					<Link to="/123">
						<img
							className="d-block w-100"
							//     src="holder.js/800x400?text=First slide&bg=373940"
							src="https://picsum.photos/200"
							alt="First slide"
						/>
						<Carousel.Caption>
							<h3>First slide label</h3>
							<p>
								Nulla vitae elit libero, a pharetra
								augue mollis interdum.
							</p>
						</Carousel.Caption>
					</Link>
				</Carousel.Item>
				<Carousel.Item>
					<img
						className="d-block w-100"
						src="https://picsum.photos/400"
						alt="Second slide"
					/>

					<Carousel.Caption>
						<h3>Second slide label</h3>
						<p>
							Lorem ipsum dolor sit amet, consectetur
							adipiscing elit.
						</p>
					</Carousel.Caption>
				</Carousel.Item>
				<Carousel.Item>
					<img
						className="d-block w-100"
						src="https://picsum.photos/300"
						alt="Third slide"
					/>

					<Carousel.Caption>
						<h3>Third slide label</h3>
						<p>
							Praesent commodo cursus magna, vel
							scelerisque nisl consectetur.
						</p>
					</Carousel.Caption>
				</Carousel.Item>
			</Carousel>
		</StyledWrapper>
	);
};

export default HomePageSlider;
const StyledWrapper = styled.div`
	img {
		height: 400px;
		object-fit: cover;
	}
`;
