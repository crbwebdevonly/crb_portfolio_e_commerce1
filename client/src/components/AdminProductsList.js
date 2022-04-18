import React from "react";
import { toast } from "react-toastify";
import { fakeProducts } from "../fakeProducts";
import { myAxios } from "../myAxios";
import ProductsListPage from "../pages/ProductsListPage";

const AdminProductsList = () => {
	//============
	//============
	//============
	const handleSeedProducts = async () => {
		//prep products
		const seedPackage = fakeProducts.map((e) => {
			const { id, rating, ...rest } = e;
			rest.rating = e.rating.rate;
			return rest;
		});
		// console.log(seedPackage);
		// return;
		try {
			const reply = await myAxios.post(
				"/api/products/seed-products",
				seedPackage
			);
			console.log(reply);
			toast.success("seeding products success");
		} catch (error) {
			toast.error("error seeding product");
		}
	};
	//============
	//============
	//============
	//============
	//============
	return (
		<>
			<div>AdminProductsList</div>
			{/* <button className="btn btn-warning" onClick={handleSeedProducts}>
				Seed Products
			</button> */}
			<ProductsListPage />
		</>
	);
};

export default AdminProductsList;
