import React from "react";
import { qualitiesData } from "./Appdata";
import "../styles/Qualities.css";

export default function Qualities() {
	return (
		<main>
			<section className="quality-header">
				<text className="qualities-title">Our</text>
				<h4>WE ARE GOOD AT WHAT WE DO</h4>
			</section>
			<section className="quality-container">
				{qualitiesData.map((item) => (
					<div className="quality-main" key={item.id}>
						<img src={item.img} alt={item.header} />
						<div className="bottom-text">
							<h3>{item.header}</h3>
							<p style={{ fontSize: 15, marginTop: 10 }}>{item.description}</p>
						</div>
					</div>
				))}
			</section>
		</main>
	);
}
