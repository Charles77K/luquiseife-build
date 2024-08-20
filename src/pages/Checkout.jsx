import React, { useState } from "react";
import "../styles/Checkout.css";
import { useSelector } from "react-redux";
import { GoBack } from "../components";
import axios from "axios";
import { FlutterWaveButton, closePaymentModal } from "flutterwave-react-v3";
import { toast } from "react-toastify";

export default function Checkout() {
	const [loading, setLoading] = useState(false);
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [address, setAddress] = useState("");
	const [city, setCity] = useState("");
	const [state, setState] = useState("");
	const [phone, setPhone] = useState("");
	const [errors, setErrors] = useState({});

	const cartItems = useSelector((state) => state.cart.items);

	const totalPrice = cartItems.reduce(
		(total, item) => total + item.price * item.quantity,
		0
	);

	const validateForm = () => {
		const errors = {};
		if (!name) errors.name = "Name is required";
		if (!email) {
			errors.email = "Email is required";
		} else if (!/\S+@\S+\.\S+/.test(email)) {
			errors.email = "Email is invalid";
		}
		if (!address) errors.address = "Address is required";
		if (!city) errors.city = "City is required";
		if (!state) errors.state = "State is required";
		if (!phone) errors.phone = "Phone number is required";

		setErrors(errors);
		return Object.keys(errors).length === 0;
	};

	const handleServerSubmit = async () => {
		const checkoutData = {
			Name: name,
			Email: email,
			Address: address,
			City: city,
			State: state,
			PhoneNumber: phone,
			cartData: cartItems.map((item) => ({
				id: item.id,
				product: item.product,
				price: item.price,
				quantity: item.quantity,
			})),
			totalPrice,
		};

		try {
			const response = await axios.post(
				"https://ogbesomto.pythonanywhere.com/process_order",
				{
					checkoutData,
				}
			);
			if (response.status === 201) {
				console.log("Data sent successfully");
				return true;
			} else {
				console.log("Data submission failed");
				return false;
			}
		} catch (err) {
			if (err.response) {
				console.log(err.response);
			} else {
				console.log("Server error:", err);
			}
			return false;
		}
	};

	const handleFlutterWaveButtonClick = async () => {
		if (validateForm()) {
			setLoading(true);
			const formSubmitSuccess = await handleServerSubmit();

			if (formSubmitSuccess) {
				openPaymentModal();
			} else {
				setLoading(false);
				toast.error("Failed to submit the form. Please try again.");
			}
		} else {
			return false;
		}
	};

	const openPaymentModal = () => {
		const config = {
			public_key: "FLWPUBK_TEST-3e645a6227b57e4d2d20ee3591a04362-X",
			tx_ref: Date.now(),
			amount: totalPrice,
			currency: "NGN",
			payment_options: "card, mobilemoneyghana, ussd",
			customer: {
				email: email,
				phone_number: phone,
				name: name,
			},
			customizations: {
				title: "Liquiseife",
				description: "Making everything about you healthy and clean",
				logo: "/images/liser_logo.png",
			},
			callback: (response) => {
				setLoading(false);
				console.log(response);
				if (response.status === "successful") {
					console.log("Payment successful, now sending form data");
					closePaymentModal(); // Close the modal programmatically
					toast.success("Payment was successful!");
				} else {
					toast.error("Payment failed. Please try again.");
				}
			},
			onClose: () => {
				setLoading(false);
				console.log("Payment closed without completion");
			},
		};

		FlutterWaveButton(config).onClick();
	};

	return (
		<div className="checkout-page">
			<GoBack />
			<div className="checkout-container">
				{/* Form Container */}
				<div className="form-container">
					<h2>Checkout</h2>
					<form onSubmit={(e) => e.preventDefault()}>
						<div className="horizontal-group">
							<div className="form-group">
								<label htmlFor="name">Name</label>
								<input
									type="text"
									id="name"
									name="name"
									placeholder="Enter name"
									value={name}
									onChange={(event) => setName(event.target.value)}
								/>
								{errors.name && (
									<span className="error-label">{errors.name}</span>
								)}
							</div>
							<div className="form-group">
								<label htmlFor="email">Email</label>
								<input
									type="email"
									id="email"
									name="email"
									placeholder="you@company.com"
									value={email}
									onChange={(event) => setEmail(event.target.value)}
								/>
								{errors.email && (
									<span className="error-label">{errors.email}</span>
								)}
							</div>
						</div>
						<h3 className="form-h3">Shipping Information</h3>
						<div className="form-group">
							<label htmlFor="address">Address</label>
							<input
								type="text"
								id="address"
								name="address"
								placeholder="Enter Address"
								value={address}
								onChange={(event) => setAddress(event.target.value)}
							/>
							{errors.address && (
								<span className="error-label">{errors.address}</span>
							)}
						</div>
						<div className="form-group">
							<label htmlFor="city">City</label>
							<input
								type="text"
								id="city"
								name="city"
								placeholder="Enter City"
								value={city}
								onChange={(event) => setCity(event.target.value)}
							/>
							{errors.city && (
								<span className="error-label">{errors.city}</span>
							)}
						</div>
						<div className="form-group">
							<label htmlFor="state">State</label>
							<input
								type="text"
								id="state"
								name="state"
								placeholder="State"
								value={state}
								onChange={(event) => setState(event.target.value)}
							/>
							{errors.state && (
								<span className="error-label">{errors.state}</span>
							)}
						</div>
						<div className="form-group">
							<label htmlFor="phone">Phone Number</label>
							<input
								type="tel"
								id="phone"
								name="phone"
								placeholder="e.g 08036412971"
								value={phone}
								onChange={(event) => setPhone(event.target.value)}
							/>
							{errors.phone && (
								<span className="error-label">{errors.phone}</span>
							)}
						</div>
						<button
							type="button"
							className="submit-button"
							onClick={handleFlutterWaveButtonClick}
							disabled={loading}
						>
							{loading ? "Processing..." : "Continue"}
						</button>
					</form>
				</div>
				{/* Order Summary Container */}
				<div className="summary-container">
					<h2>Order Summary</h2>
					<ul>
						{cartItems.map((item) => (
							<li key={item.id} className="summary-item">
								<span>{item.product}</span>
								<span>x{item.quantity}</span>
								<span>₦{(item.price * item.quantity).toFixed(2)}</span>
							</li>
						))}
					</ul>
					<div className="summary-total">
						<p>Total</p>
						<p style={{ color: "" }}>₦{totalPrice.toFixed(2)}</p>
					</div>
				</div>
			</div>
		</div>
	);
}
