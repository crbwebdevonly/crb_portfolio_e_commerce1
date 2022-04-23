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
	const { loading, error, getSliderDataID_v2, sliderData } =
		useContext(CustomerContext);
	//============
	const { allProductsID, sliderProducts } = sliderData;
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
	useEffect(() => {
		// if (loading || error) return;
		// const total = allProductsID.length;

		// let randSet = new Set();
		// // console.log(randSet, randSet.size, "myset-init");
		// if (total > 5) {
		// 	while (randSet.size < 5) {
		// 		let n = Math.floor(Math.random() * total);
		// 		randSet.add(n);
		// 		// console.log(randSet, "myset-loop");
		// 	}
		// }
		// console.log(randSet, randSet.size, "myset-init");

		return () => {
			//     second
		};
	}, [allProductsID]);

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
			<HomePageSlider {...sliderData} />
		</div>
	);
};

export default HomePage;
