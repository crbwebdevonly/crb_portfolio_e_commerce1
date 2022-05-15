import { useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";
import { useAppContext } from "../context/AppContext";
import MyDropImageFile from "./MyDropImageFile";

//============
//============

const AdminAddNewProduct = ({editMode}) => {
	//============
	//============
	const {
		loading,
		error,
		// newProductData,
		// handleNewProductDataChange,
		addNewProduct,
		applyProductUpdate,
	} = useAppContext();
	//============

	//============
	const [newProductData, setNewProductData] = useState({
		title: "",
		price: "",
		description: "",
		category: "",
		// image: "",
		rating: "",
	});
	const [imageSelectOption, setImageSelectOption] = useState("none");
	// options>> none, input-url,upload-image
	const [imageURL, setimageURL] = useState("");
	const [imageFile, setimageFile] = useState({});
	//============
	//============
	const removeImageAttribute = () => {
		setNewProductData((p) => {
			let k = { ...p };
			const { image, imageFile, ...rest } = k;
			return rest;
		});
	};
	const addImageURLProperty = () => {
		setNewProductData((p) => {
			let k = { ...p, image: "" };
			return k;
		});
	};
	const addImageFileProperty = () => {
		setNewProductData((p) => {
			let k = { ...p, imageFile: "" };
			return k;
		});
	};
	//============
	//============
	const handleNewProductDataChange = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		setNewProductData((p) => ({ ...p, [name]: value }));
	};
	//============
	// console.log(newProductData, "new prod data");
	//============
	//============
	useEffect(() => {
		//   first
		removeImageAttribute();

		if (imageSelectOption === "input-url") {
			addImageURLProperty();
		} else if (imageSelectOption === "upload-image") {
			addImageFileProperty();
		}
		// else removeImageAttribute();

		return () => {
			//     second
		};
	}, [imageSelectOption]);

	//============
	//============
	useEffect(() => {
		//  add image file to updatedata
		if (imageFile && imageURL) {
			setNewProductData((p) => {
				return { ...p, imageFile };
			});
		}

		return () => {
			//     second
		};
	}, [imageFile, imageURL]);

	//============
	//============
	const handleImageSelectChange = (e) => {
		let v = e.target.value;
		setImageSelectOption(v);
	};
	//============
	// console.log(imageFile, imageURL, "image files");
	//============
	//============
	// if (error)
	// 	return (
	// 		<div className="alert-danger p-3 my-3">
	// 			error creating new Product
	// 		</div>
	// 	);
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
						<label className="form-label">Category</label>
						<input
							type="text"
							name="category"
							className="form-control "
							onChange={handleNewProductDataChange}
							value={newProductData.category}
						/>
					</div>
				</div>
				<div className="col col-md">
					<div className="input-group mb-0">
						<label className="input-group-text">
							Image URL
						</label>
						<select
							className="form-select"
							value={imageSelectOption}
							onChange={handleImageSelectChange}
						>
							<option value="none">Dont add Image</option>
							<option value="input-url">
								Provide URL
							</option>
							<option value="upload-image">
								Upload Image
							</option>
						</select>
					</div>
				</div>
				<div className="col my-1">
					{imageSelectOption === "input-url" && (
						<>
							<label className="form-label">
								Image URL
							</label>
							<input
								type="text"
								name="image"
								className="form-control"
								// disabled
								value={newProductData.image}
								onChange={handleNewProductDataChange}
							/>
						</>
					)}

					{imageSelectOption === "upload-image" && (
						<>
							<MyDropImageFile
								setimageURL={setimageURL}
								setimageFile={setimageFile}
							/>
						</>
					)}
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
					onClick={() => addNewProduct(newProductData)}
				>
					Add New Product
				</button>
			</div>
		</>
	);
};

export default AdminAddNewProduct;
