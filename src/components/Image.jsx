import React from "react";
import "../styles/Image.css";
export default function Image({ text, text2, buttonText, img }) {
	return (
		<div style={{ marginBottom: 40 }}>
			<div
				className="image"
				style={{
					backgroundImage: `url(${img})`,
				}}
			>
				<div className="image-content">
					<h1>{text}</h1>
					<h3>{text2}</h3>
				</div>
			</div>
		</div>
	);
}
