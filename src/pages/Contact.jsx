import React from "react";
import "../styles/Contact.css";
import { ContactCard, MessageForm, Map } from "../components";
import { IoCall, IoLocation } from "react-icons/io5";
import { FaEnvelope } from "react-icons/fa";

export default function Contact() {
	return (
		<div>
			<div className="contact-section">
				<div className="contact-overlay">
					<h1>Contact </h1>
					<p>WE ARE READY TO SERVE YOU, FEEL FREE TO REACH OUT TO US!</p>
				</div>
			</div>
			{/* second section */}
			<div className="contact-container">
				<ContactCard
					icon={<IoCall color="#007bff" />}
					title={"Phone"}
					desc={"080-3573-4286"}
					desc1={"080-9204-2719"}
				/>
				<ContactCard
					icon={<FaEnvelope color="#007bff" />}
					title={"Email"}
					desc={"liquiseife@gmail.com"}
				/>
				<ContactCard
					icon={<IoLocation color="#007bff" />}
					title={"Location"}
					desc={"Blessed Sacrament Parish, Independence Layout"}
				/>
			</div>
			{/* third section */}
			<div className="section-3">
				<div className="message-container">
					<h1>Message </h1>
					<p>We'll get back to you within 24 hours</p>
				</div>
				<MessageForm />
			</div>
			{/* fourth section */}
			<Map />
		</div>
	);
}
