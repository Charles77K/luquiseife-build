import React from "react";
import {
	Carousel,
	Products,
	Qualities,
	ImageText,
	Feedback,
} from "../components";
import { slideData } from "../components/Appdata";

export default function Home() {
	return (
		<>
			<Carousel
				text={slideData.text}
				text2={slideData.text2}
				buttonText={slideData.buttonText}
				img={"/images/Landing1.jpg"}
			/>
			<Products
				bottom={"See More Products"}
				header={"The Best Products We Provide"}
			/>
			<Qualities />
			<ImageText />
			<Feedback />
		</>
	);
}
