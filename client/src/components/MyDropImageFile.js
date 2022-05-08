import { useEffect } from "react";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";
const thumbsContainer = {
	display: "flex",
	flexDirection: "row",
	flexWrap: "wrap",
	marginTop: 16,
	height: "100%",
	width: "100%",
};

const thumb = {
	display: "inline-flex",
	borderRadius: 2,
	border: "1px solid #eaeaea",
	marginBottom: 8,
	marginRight: 8,
	width: 200,
	height: 200,
	padding: 4,
	boxSizing: "border-box",
};

const thumbInner = {
	display: "flex",
	minWidth: 0,
	overflow: "hidden",
};

const img = {
	// display: "block",
	// width: "auto",
	objectFit: "contain",
	height: "100%",
};

const MyDropImageFile = ({ setimageURL, setimageFile }) => {
	const [files, setFiles] = useState([]);
	const { getRootProps, getInputProps, isDragReject } = useDropzone({
		accept: {
			"image/*": [],
		},
		onDrop: (acceptedFiles) => {
			let u = "";
			setFiles(
				acceptedFiles.map((file) => {
					// console.log(file, "drop file");
					setimageFile(file);
					setimageURL(URL.createObjectURL(file));
					return Object.assign(file, {
						preview: URL.createObjectURL(file),
					});
				})
			);
		},
	});
	// console.log(isDragReject, "is rej");
	isDragReject && toast.error("invalid file type");
	const thumbs = files.map((file) => (
		<div style={thumb} key={file.name}>
			<div style={thumbInner}>
				<img
					src={file.preview}
					style={img}
					// Revoke data uri after image is loaded
					onLoad={() => {
						URL.revokeObjectURL(file.preview);
					}}
				/>
			</div>
		</div>
	));

	useEffect(() => {
		// Make sure to revoke the data uris to avoid memory leaks, will run on unmount
		return () =>
			files.forEach((file) => URL.revokeObjectURL(file.preview));
	}, []);

	return (
		<section className="container">
			<div {...getRootProps({ className: "dropzone" })}>
				<input {...getInputProps()} />
				<p>Drag 'n' drop new Profile Image here</p>
			</div>
			<aside style={thumbsContainer}>{thumbs}</aside>
		</section>
	);
};

export default MyDropImageFile;
