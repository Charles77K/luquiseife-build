import React, { useState } from "react";
import { toast } from "react-toastify";
import "../styles/MessageForm.css";
import axios from "axios";

export default function MessageForm() {
	const [errors, setErrors] = useState({});
	const [isLoading, setIsLoading] = useState(false);
	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		subject: "",
		message: "",
	});

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};
	// console.log(formData);

	const sendMessage = async () => {
		setIsLoading(true);
		try {
			const response = await axios.post(
				"https://api.liquiseife.com/message_us",
				{ formData }
			);
			if (response.status === 200) {
				toast.success("sent successfully");
				setIsLoading(false);
				setFormData({
					firstName: "",
					lastName: "",
					email: "",
					subject: "",
					message: "",
				});
			} else {
				toast.error("an error occured");
			}
		} catch (err) {
			if (err.response) {
				toast.error("something went wrong");
				console.log("this error bad gan:", err.response);
			} else {
				toast.error("something went wrong");
				console.log(err);
			}
		} finally {
			setIsLoading(false);
		}
	};

	const validateForm = (e) => {
		e.preventDefault();
		const newErrors = {};

		const { firstName, lastName, email, subject, message } = formData;

		if (!firstName) newErrors.firstName = "First name is required";
		if (!lastName) newErrors.lastName = "Last name is required";
		if (!email) {
			newErrors.email = "Email is required";
		} else if (!/\S+@\S+\.\S+/.test(email)) {
			newErrors.email = "Email is invalid";
		}
		if (!subject) newErrors.subject = "Subject is required";
		if (!message) newErrors.message = "Message is required";

		setErrors(newErrors);

		if (Object.keys(newErrors).length === 0) {
			sendMessage();
		}
	};

	return (
		<form className="message-form" onSubmit={validateForm}>
			<section className="form-head">
				<div className="input-group">
					<h5>First name</h5>
					<input
						className="input-field"
						placeholder="First name"
						name="firstName"
						value={formData.firstName}
						onChange={handleChange}
					/>
					{errors.firstName && (
						<span className="error">{errors.firstName}</span>
					)}
				</div>
				<div className="input-group">
					<h5>Last name</h5>
					<input
						className="input-field"
						placeholder="Last name"
						name="lastName"
						value={formData.lastName}
						onChange={handleChange}
					/>
					{errors.lastName && <span className="error">{errors.lastName}</span>}
				</div>
			</section>
			<div className="input-group">
				<h5>Email</h5>
				<input
					className="input-field"
					placeholder="you@company.com"
					name="email"
					value={formData.email}
					onChange={handleChange}
				/>
				{errors.email && <span className="error">{errors.email}</span>}
			</div>
			<div className="input-group">
				<h5>Subject</h5>
				<input
					className="input-field"
					placeholder="Subject"
					name="subject"
					value={formData.subject}
					onChange={handleChange}
				/>
				{errors.subject && <span className="error">{errors.subject}</span>}
			</div>
			<div className="input-group">
				<h5>Message</h5>
				<textarea
					className="input-field"
					placeholder="Enter Your Message"
					name="message"
					value={formData.message}
					onChange={handleChange}
				/>
				{errors.message && <span className="error">{errors.message}</span>}
			</div>
			<button id="send-message" type="submit">
				{isLoading ? "Processing..." : "Send Message"}
			</button>
		</form>
	);
}
