import React from "react";
import { useEffect } from "react";
import Footer from "../components/Footer";
import HomePageHero from "../components/HomePageHero";
import HomePageSlider from "../components/HomePageSlider";
import { useAppContext } from "../context/AppContext";

const HomePage = () => {
	//============
	//============
	//============
	const { loading, error, getSliderProducts, sliderProductsList } =
		useAppContext();

	//============
	//============
	useEffect(() => {
		//   get all products and use 5 at random
		// getAllProducts()

		// getSliderDataID_v2();
		// getsliderproducts()
		getSliderProducts();

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
			<HomePageSlider sliderProductsList={sliderProductsList} />
			<HomePageHero />
			<Footer />
		</div>
	);
};

export default HomePage;
