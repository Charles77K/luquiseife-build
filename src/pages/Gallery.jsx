import React from "react";
import ModalImage from "react-modal-image";
import "../styles/Gallery.css";
import images from "../assets/images.json";

export default function Gallery() {
	return (
		<div className="image-gallery">
			{images.map((image, index) => (
				<ModalImage
					key={index}
					small={image}
					large={image}
					alt={`Gallery Image ${index + 1}`}
					className="gallery-image"
				/>
			))}
		</div>
	);
}
