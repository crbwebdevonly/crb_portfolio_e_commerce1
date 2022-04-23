import React from "react";
import { useContext } from "react";
import HomePageHero from "../components/HomePageHero";
import HomePageSlider from "../components/HomePageSlider";
import { CustomerContext } from "../context/CustomerContext";

const HomePage = () => {
	//============
	//============
	const { loading, error } = useContext(CustomerContext);
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
			<HomePageSlider />
		</div>
	);
};

export default HomePage;
