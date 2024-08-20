import React from "react";
import "../styles/Cart.css";
import { useSelector, useDispatch } from "react-redux";
import { removeItem, updateQuantity, clearCart } from "../redux/cartReducer"; // Add updateQuantity
import { Link } from "react-router-dom";
import { GoBack } from "../components";

export default function Cart() {
	const cartItems = useSelector((state) => state.cart.items);
	const dispatch = useDispatch();

	const handleRemoveFromCart = (id) => {
		dispatch(removeItem(id));
	};

	const handleQuantityChange = (id, quantity) => {
		if (quantity >= 1) {
			dispatch(updateQuantity({ id, quantity }));
		}
	};

	const handleClearCart = () => {
		dispatch(clearCart());
	};

	const totalPrice = cartItems.reduce(
		(total, item) => total + item.price * item.quantity,
		0
	);

	return (
		<div className="cart-page">
			<GoBack />
			<h2 className="cart-header">
				{cartItems.length > 0 ? "Your Cart" : "Your Cart is Empty"}
			</h2>
			{cartItems.length > 0 ? (
				<div className="cart-container1">
					<div className="cart-container">
						<section id="cart-section">
							<h4>
								Cart<span id="cart-length">({cartItems.length} products)</span>
							</h4>
							<h4 id="clear-cart" onClick={handleClearCart}>
								X Clear cart
							</h4>
						</section>
						{cartItems.map((item) => (
							<div key={item.id} className="cart-item">
								<img
									src={item.img}
									alt={item.product}
									className="cart-item-img"
								/>
								<div className="cart-item-details">
									<p className="cart-item-title">{item.product}</p>
									<section id="quantity-btn">
										<button
											id="decrease-btn"
											onClick={() =>
												handleQuantityChange(item.id, item.quantity - 1)
											}
										>
											-
										</button>
										<p className="quantity">{item.quantity}</p>
										<button
											id="increase-btn"
											onClick={() =>
												handleQuantityChange(item.id, item.quantity + 1)
											}
										>
											+
										</button>
									</section>
									<p className="cart-item-price">₦{item.price}</p>
								</div>
								<h4
									className="remove-from-cart"
									onClick={() => handleRemoveFromCart(item.id)}
								>
									X
								</h4>
							</div>
						))}

						<div className="cart-summary">
							<p className="cart-total">Total: ₦{totalPrice}</p>
							<Link to={"/checkout"}>
								<button className="checkout-button">Proceed to Checkout</button>
							</Link>
						</div>
					</div>
				</div>
			) : (
				<div className="empty-cart">
					<img src="/images/cart.png" alt="cart.png" className="cart-img" />
					<Link to={"/products"}>
						<button className="empty-cart-message">Go to Products</button>
					</Link>
				</div>
			)}
		</div>
	);
}
