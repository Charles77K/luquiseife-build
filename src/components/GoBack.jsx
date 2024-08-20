import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/GoBack.css";

export default function GoBack() {
	const navigate = useNavigate();
	const handleGoBack = () => {
		navigate(-1);
	};
	return (
		<div>
			<button className="go-back-button" onClick={handleGoBack}>
				&larr; Go Back
			</button>
		</div>
	);
}
