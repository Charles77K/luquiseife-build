import React from "react";
import "../styles/ContactCard.css";

export default function ContactCard({ icon, title, desc, desc1 }) {
	return (
		<div className="contact-card">
			<div className="contact-icon">{icon}</div>
			<div className="contact-content">
				<h3>{title}</h3>
				<p>{desc}</p>
				<p>{desc1}</p>
			</div>
		</div>
	);
}
// linear-gradient(
// 	rgba(255, 255, 255, 0.9),
// 	rgba(255, 255, 255, 0.9)
// )
