import { useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";
import { useAppContext } from "../context/AppContext";

//============
//============

const AdminAddNewProduct = () => {
	//============
	//============
	const {
		loading,
		error,
		newProductData,
		handleNewProductDataChange,
		addNewProduct,
	} = useAppContext();
	//============

	//============
	//============
	//============
	//============
	//============
	if (error)
		return (
			<div className="alert-danger p-3 my-3">
				error creating new Product
			</div>
		);
	//============
	//============
	//============
	return (
		<>
			<div className="update-form ">
				<div className="row g-3">
					<div className="col-md-6">
						<label className="form-label">Title</label>
						<input
							type="text"
							name="title"
							className="form-control"
							value={newProductData.title}
							onChange={handleNewProductDataChange}
						/>
					</div>
					<div className="col-md-6">
						<label
							for="inputPassword4"
							className="form-label"
						>
							Category
						</label>
						<input
							type="text"
							name="category"
							className="form-control "
							onChange={handleNewProductDataChange}
							value={newProductData.category}
						/>
					</div>
				</div>
				<div className="col-md-6">
					<label for="inputEmail4" class="form-label">
						Image URL
					</label>
					<input
						type="text"
						name="image"
						className="form-control"
						value={newProductData.image}
						onChange={handleNewProductDataChange}
					/>
				</div>
				<label className="form-label">Description</label>
				<textarea
					className="form-control"
					aria-label="With textarea"
					onChange={handleNewProductDataChange}
					value={newProductData.description}
					rows={5}
					name="description"
				></textarea>
				<div className="row g-3">
					<div className="col-md-6">
						<label className="form-label">Price</label>
						<input
							type="text"
							className="form-control"
							name="price"
							onChange={handleNewProductDataChange}
							value={newProductData.price}
						/>
					</div>
					<div className="col-md-6">
						<label className="form-label">Rating</label>
						<input
							className="form-control"
							type="text"
							name="rating"
							onChange={handleNewProductDataChange}
							value={newProductData.rating}
						/>
					</div>
				</div>
				<button
					className="btn btn-danger w-50 my-3 "
					onClick={addNewProduct}
				>
					Add New Product
				</button>
			</div>
		</>
	);
};

export default AdminAddNewProduct;
