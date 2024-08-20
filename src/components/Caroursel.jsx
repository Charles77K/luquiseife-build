import React from "react";
import "../styles/Carousel.css";
import { Link } from "react-router-dom";
// import image1 from "../assets/business-men.jpg";

const Carousel = ({ text, text2, buttonText, img }) => {
	return (
		<div
			className="carousel"
			style={{
				backgroundImage: `url(${img})`,
			}}
		>
			<div className="carousel-content">
				<h1>{text}</h1>
				<h3>{text2}</h3>
			</div>
			<div className="carousel-button">
				<Link to={"/products"}>
					<button>{buttonText}</button>
				</Link>
			</div>
		</div>
	);
};

export default Carousel;
