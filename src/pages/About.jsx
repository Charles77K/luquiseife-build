import React from "react";
import { Image, AboutGrid } from "../components";

export default function About() {
	return (
		<div className="about-container">
			<Image
				text={"About Us"}
				text2={"WE HAVE OVER 5 YEARS OF EXPERIENCE IN COSMETOLOGY"}
				img={"/images/about.jpg"}
			/>
			<AboutGrid />
		</div>
	);
}
