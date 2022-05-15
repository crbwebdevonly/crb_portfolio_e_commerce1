import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import styled from "styled-components";
import { useAppContext } from "../context/AppContext";
import { fakeProducts } from "../fakeProducts";
import MyDropImageFile from "./MyDropImageFile";

const AdminEditProduct_v2 = () => {
	//============
	//============
	const { productId } = useParams();
	//============
	//============
	const {
		loading,
		error,
		editProductEnable: editEnable,
		editProduct: product,
		// updateProductData,

		setEditProduct,
		setEnableEditProduct,
		cancelEditProduct,
		// handleupdateProductDataChange,
		applyProductUpdate,
		deleteProduct,
	} = useAppContext();
	//============
	const {
		_id: id,
		title,
		price,
		description,
		category,
		image,
		rating,
	} = product;
	//============
	//============
	//============
	//============
	//============
	//============
	const [updateProductData, setUpdateProductData] = useState({});
	// const [editEnable, setEditEnable] = useState(false);
	// image upload
	const [imageSelectOption, setImageSelectOption] = useState("none");
	const [imageURL, setimageURL] = useState("");
	const [imageFile, setimageFile] = useState({});
	//============

	//============
	//============
	const handleImageSelectChange = (e) => {
		let v = e.target.value;
		setImageSelectOption(v);
	};
	//============
	//============
	//============
	//============
	const handleupdateProductDataChange = (e) => {
		let name = e.target.name;
		let value = e.target.value;
		if (name === "price" || name === "rating") {
			value = Number(Number(value).toFixed(2));
		}
		setUpdateProductData((p) => ({ ...p, [name]: value }));
	};
	//============
	//============
	useEffect(() => {
		//   first

		setEditProduct(productId);
		return () => {
			//     second
			cancelEditProduct();
		};
	}, [productId]);

	//============
	//============
	useEffect(() => {
		//   first
		if (editEnable) {
			const { createdAt, updatedAt, __v, ...rest } = product;
			setUpdateProductData({ ...rest });
		} else {
			setUpdateProductData({});
			setImageSelectOption("none");
			setimageURL("");
			setimageFile({});
		}

		return () => {
			//     second
		};
	}, [editEnable]);

	//============
	//============
	//============
	//============
	useEffect(() => {
		//   first

		if (imageSelectOption !== "input-url") {
			setUpdateProductData((p) => ({
				...p,
				image: product?.image || "",
			}));
		}
		if (imageSelectOption !== "upload-image") {
			setimageURL("");
			setimageFile({});
			setUpdateProductData((p) => {
				const { imageFile, ...rest } = p;
				return { ...rest };
			});
		}

		return () => {
			//     second
		};
	}, [imageSelectOption]);

	//============
	//============
	//============
	const handleApplyUpdate = () => {
		let updateProductData2 = updateProductData;
		if (imageSelectOption === "upload-image") {
			if (!imageFile || !imageURL) {
				return toast.error("upload Image NOT selected");
			}
			updateProductData2 = { ...updateProductData2, imageFile };
		}

		// validate
		// check valid
		let validData = null;
		let { price, rating, ...rest } = updateProductData2;
		for (const v of Object.values(updateProductData2)) {
			if (!v) {
				return toast.error("No Empty values allowed");
			}
		}
		price = Number(price);
		rating = Number(rating);
		if (isNaN(price) || isNaN(rating)) {
			return toast.error("price / rating must be numbers");
		}
		validData = { ...rest, price, rating };
		if (validData) {
			applyProductUpdate(validData);
		}
	};
	//============
	//============
	//============
	// console.log(imageFile, imageURL, "image files");
	// console.log(updateProductData, "updatedata");
	//============
	//============
	if (loading) return <div className="spinner-border mx-auto d-grid "></div>;
	//============
	if (error)
		return (
			<h5 className="alert alert-danger">
				Error occured- updating product
			</h5>
		);
	//============
	//============
	//============
	//============
	//============
	return (
		<StyledWrapper className="border shadow">
			<div className="container border-1">
				<h5 className="title card-header  text-center my-3">
					{title}
				</h5>
				<div className="row ">
					<div className="col-md-6 my-3 ">
						<img
							src={image}
							className="card-img-top mx-auto col-sm-6"
							alt="..."
						/>
					</div>
					<div className="col-md-6">
						<p className="card-text my-3 ">{description}</p>
					</div>
				</div>
				<div className="row fs-4">
					<div className="col display-0">
						Category: {category}
					</div>
					<div className="col">Price: ${price}</div>
					<div className="col">Rating: {rating}</div>
				</div>

				<div className="row align-items-center">
					<div className="col-6">
						{!editEnable ? (
							<button
								className="btn btn-warning w-50 my-3 "
								onClick={() => {
									// setEditEnable(true);
									setEnableEditProduct();
								}}
							>
								Enable Edit
							</button>
						) : (
							<button
								className="btn btn-info w-50 my-3 "
								onClick={() => {
									// setEditEnable(false);
									cancelEditProduct();
								}}
							>
								Cancle Edit
							</button>
						)}
					</div>
				</div>
			</div>
			{/* edit form */}
			{editEnable && (
				<div className="update-form border border-3 border-warning p-2 ">
					<div className="row g-3">
						<div className="col-md-6">
							<label className="form-label">Title</label>
							<input
								type="text"
								name="title"
								className="form-control"
								value={updateProductData.title}
								onChange={handleupdateProductDataChange}
							/>
						</div>
						<div className="col-md-6">
							<label className="form-label">
								Category
							</label>
							<input
								type="text"
								name="category"
								className="form-control"
								onChange={handleupdateProductDataChange}
								value={updateProductData.category}
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
								<option value="none">
									Dont Change Image
								</option>
								<option value="input-url">
									Provide New URL
								</option>
								<option value="upload-image">
									Upload New Image
								</option>
							</select>
						</div>
					</div>
					{imageSelectOption === "input-url" && (
						<div className="col-md-6">
							<label className="form-label">
								Image URL
							</label>
							<input
								type="text"
								name="image"
								className="form-control"
								value={updateProductData.image}
								onChange={handleupdateProductDataChange}
							/>
						</div>
					)}
					{imageSelectOption === "upload-image" && (
						<>
							<MyDropImageFile
								setimageURL={setimageURL}
								setimageFile={setimageFile}
							/>
						</>
					)}
					<label className="form-label">Description</label>
					<textarea
						className="form-control"
						aria-label="With textarea"
						onChange={handleupdateProductDataChange}
						value={updateProductData.description}
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
								onChange={handleupdateProductDataChange}
								value={updateProductData.price}
							/>
						</div>
						<div className="col-md-6">
							<label className="form-label">Rating</label>
							<input
								className="form-control"
								type="text"
								name="rating"
								onChange={handleupdateProductDataChange}
								value={updateProductData.rating}
							/>
						</div>
					</div>
					<div className="alert alert-warning p-0 text-center">
						NOTE: to add decimal, please write the full number
						without decimal first, then add decimal by moving
						the cursor back
					</div>
					<div className="container">
						<div className="row g-2 justify-content-end">
							<div className="col-12 col-md-4">
								<button
									className="btn btn-warning w-75  "
									onClick={() => {
										// applyProductUpdate(id);
										handleApplyUpdate();
									}}
								>
									Apply Update
								</button>
							</div>
							<div className="col-12 col-md-4">
								<button
									className="btn btn-danger w-75  col-12 col-md-4 "
									onClick={() => {
										deleteProduct(id);
									}}
								>
									Delete Product
								</button>
							</div>
						</div>
					</div>
				</div>
			)}
		</StyledWrapper>
	);
};

export default AdminEditProduct_v2;

const StyledWrapper = styled.div`
	transition: all 0.5s ease-in-out;
	padding: 10px;
	/* max-width: 80%; */
	width: 100%;
	.title {
		font-size: 1rem;
	}
	* {
		transition: all 0.5s ease-in-out;
	}

	img {
		width: 60%;
		display: grid;
		place-content: center;
	}
	@media screen and (min-width: 700px) {
		.title {
			font-size: 2rem;
		}
		p {
			font-size: 1.3rem;
		}
	}
	.alert {
		font-size: 0.6rem;
	}
`;
