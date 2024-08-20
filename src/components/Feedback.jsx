import React from "react";
import { feedbackData } from "./Appdata";
import "../styles/Feedback.css";

export default function Feedback() {
	return (
		<main className="feedback-main-container">
			<section className="title">
				<p id="p-text">Testimonials</p>
				<h2>What They Say About Us</h2>
			</section>
			<section className="feedback-container">
				{feedbackData.map((item) => (
					<div key={item.id} className="feedback">
						<section className="feedback-title">
							<p className="quote-text">"{item.title}"</p>
						</section>
						<section className="feedback-inner">
							<div className="feedback-inner-2">
								<h5>{item.userName}</h5>
								<p>{item.type}</p>
							</div>
						</section>
					</div>
				))}
			</section>
		</main>
	);
}
