import React from "react";
import Lottie from "react-lottie";
import animationData from "../lottie/animation.json"; // Replace with your Lottie JSON file path

export default function Preloader() {
	const defaultOptions = {
		loop: true,
		autoplay: true,
		animationData: animationData,
		rendererSettings: {
			preserveAspectRatio: "xMidYMid slice",
		},
	};

	return (
		<div className="preloader-container">
			<Lottie options={defaultOptions} height={120} width={230} />
		</div>
	);
}
