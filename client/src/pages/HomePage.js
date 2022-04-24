import React from "react";
import { useEffect } from "react";
import { useContext } from "react";
import HomePageHero from "../components/HomePageHero";
import HomePageSlider from "../components/HomePageSlider";
import { CustomerContext } from "../context/CustomerContext";

const HomePage = () => {
	//============
	//============
	// const { loading, error } = useContext(CustomerContext);
	//============
	//============
	//============
	//============
	//============
	//============
	const { loading, error, getSliderDataID_v2, sliderProductsList } =
		useContext(CustomerContext);
	//============
	//============
	//============
	//============
	useEffect(() => {
		//   get all products and use 5 at random
		// getAllProducts()

		getSliderDataID_v2();

		return () => {
			//     second
		};
	}, []);
	//============
	//============
	
	//============
	//============
	//============
	//============
	//============
	if (loading) return <div className="spinner-border mx-auto d-grid "></div>;
	if (error)
		//============
		return (
			<h5 className="alert alert-danger">
				Error occured- getting all products
			</h5>
		);
	//============
	//============
	//============
	//============
	return (
		<div className="container">
			<HomePageHero />
			<HomePageSlider sliderProductsList={sliderProductsList} />
		</div>
	);
};

export default HomePage;
