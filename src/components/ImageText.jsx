import React from "react";
import "../styles/ImageText.css";
import { Link } from "react-router-dom";

export default function ImageText() {
	return (
		<main className="imgtxt-container">
			<div className="image-container">
				<img src="/images/business-men.jpg" alt="businnes men" />
			</div>
			<div className="inner-imgtxt">
				<h4>WHO ARE WE</h4>
				<h1>Get to know about </h1>
				<p>
					LIQUISEIFE Resources was born in 2017 as the brain child of a caring
					Catholic priest of Enugu Diocese.
				</p>
				<p>
					It came as a materialisation of his inventive genius having been
					gifted with the spirit of Innovation and Entrepreneurship. Fr.
					Christopher Onochie birthed the idea ...
				</p>
				<Link to={"/about"}>
					<button>READ MORE</button>
				</Link>
			</div>
		</main>
	);
}
