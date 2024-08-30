import React, { useState } from "react";
import { toast } from "react-toastify";
import "../styles/MessageForm.css";
import axios from "axios";

export default function MessageForm() {
	const [errors, setErrors] = useState({});
	const [isLoading, setIsLoading] = useState(false);
	const [formData, setFormData] = useState({
		first_name: "",
		last_name: "",
		email: "",
		subject: "",
		body: "",
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	// console.log(formData);

	const sendMessage = async () => {
		setIsLoading(true);
		try {
			const response = await axios.post(
				"https://api.liquiseife.com/message_us/",
				formData
			);
			if (response.status === 201) {
				toast.success("sent successfully");
				setFormData({
					first_name: "",
					last_name: "",
					email: "",
					subject: "",
					body: "",
				});
				setErrors({});
			} else {
				toast.error("an error occured");
			}
		} catch (err) {
			if (err.response) {
				console.log("Server responded with error:", err.response);
			} else {
				console.log("Error occurred:", err);
			}
			toast.error("Something went wrong");
		} finally {
			setIsLoading(false);
		}
	};

	const validateForm = (e) => {
		e.preventDefault();
		const newErrors = {};

		const { first_name, last_name, email, subject, body } = formData;

		if (!first_name) newErrors.first_name = "First name is required";
		if (!last_name) newErrors.last_name = "Last name is required";
		if (!email) {
			newErrors.email = "Email is required";
		} else if (!/\S+@\S+\.\S+/.test(email)) {
			newErrors.email = "Email is invalid";
		}
		if (!subject) newErrors.subject = "Subject is required";
		if (!body) newErrors.body = "Message is required";

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
						name="first_name"
						value={formData.first_name}
						onChange={handleChange}
					/>
					{errors.first_name && (
						<span className="error">{errors.first_name}</span>
					)}
				</div>
				<div className="input-group">
					<h5>Last name</h5>
					<input
						className="input-field"
						placeholder="Last name"
						name="last_name"
						value={formData.last_name}
						onChange={handleChange}
					/>
					{errors.last_name && (
						<span className="error">{errors.last_name}</span>
					)}
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
					name="body"
					value={formData.body}
					onChange={handleChange}
				/>
				{errors.body && <span className="error">{errors.body}</span>}
			</div>
			<button id="send-message" type="submit" disabled={isLoading}>
				{isLoading ? "Processing..." : "Send Message"}
			</button>
		</form>
	);
}
