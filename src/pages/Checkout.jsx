import React, { useState } from "react";
import "../styles/Checkout.css";
import { useSelector } from "react-redux";
import { GoBack } from "../components";
import axios from "axios";
import { FlutterWaveButton, closePaymentModal } from "flutterwave-react-v3";
import { toast } from "react-toastify";
import { FaTimes } from "react-icons/fa";

export default function Checkout() {
	const [loading, setLoading] = useState(false);
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [address, setAddress] = useState("");
	const [city, setCity] = useState("");
	const [state, setState] = useState("");
	const [phone, setPhone] = useState("");
	const [errors, setErrors] = useState({});
	const [formSuccess, setFormSuccess] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const [isFormSubmitted, setIsFormSubmitted] = useState(false);

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
		setLoading(true);
		const checkoutData = {
			formData: {
				Name: name,
				Email: email,
				Address: address,
				City: city,
				State: state,
				PhoneNumber: phone,
			},
			cartData: cartItems.map((item) => ({
				id: item.id,
				product: item.product,
				price: item.price,
				quantity: item.quantity,
				TotalPrice: totalPrice,
			})),
		};
		console.log(checkoutData);
		try {
			const response = await axios.post(
				"https://api.liquiseife.com/process_order/",
				checkoutData
			);
			if (response.status === 201) {
				console.log("form sent successfully");
				return true;
			} else {
				toast.error("Data submission failed");
				return false;
			}
		} catch (err) {
			toast.error("Server error. Please try again later");
			console.log(err);
			return false;
		} finally {
			setLoading(false);
		}
	};

	const handleProceedToPayment = async () => {
		if (!isFormSubmitted) {
			if (validateForm()) {
				const formSubmitSuccess = await handleServerSubmit();
				if (formSubmitSuccess) {
					toast.success("Data validated, now opening payment portal");
					setFormSuccess(true);
					setIsFormSubmitted(true);
					setShowModal(true);
				}
			} else {
				toast.error("Please fill all the fields correctly.");
			}
		} else {
			// If form was already submitted successfully, just open the modal
			setShowModal(true);
		}
	};

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
			if (response.status === "successful") {
				closePaymentModal();
				toast.success("Payment was successful!");
			} else {
				toast.error("Payment failed. Please try again.");
			}
		},
		onClose: () => {
			console.log("Payment closed without completion");
		},
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
								placeholder="Enter city"
								value={city}
								onChange={(event) => setCity(event.target.value)}
							/>
							{errors.city && (
								<span className="error-label">{errors.city}</span>
							)}
						</div>
						<div className="horizontal-group">
							<div className="form-group">
								<label htmlFor="state">State</label>
								<input
									type="text"
									id="state"
									name="state"
									placeholder="Enter state"
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
									type="text"
									id="phone"
									name="phone"
									placeholder="Enter Phone Number"
									value={phone}
									onChange={(event) => setPhone(event.target.value)}
								/>
								{errors.phone && (
									<span className="error-label">{errors.phone}</span>
								)}
							</div>
						</div>
					</form>
					<button
						className="submit-button"
						onClick={handleProceedToPayment}
						disabled={loading}
					>
						{loading ? "Processing..." : "Proceed to Payment"}
					</button>
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
			{/* Modal for Payment */}
			{showModal && (
				<div className="modal">
					<div className="modal-content">
						<h3>Make Payment</h3>
						<div className="modal-buttons">
							<FlutterWaveButton {...config} className="flutter-btn">
								Pay with FlutterWaveButton
							</FlutterWaveButton>
							<button className="fa-times" onClick={() => setShowModal(false)}>
								<FaTimes color="#ffff" />
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
