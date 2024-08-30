import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { BsCart4 } from "react-icons/bs";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import "../styles/Header.css";

export default function Header() {
	const [isOpen, setIsOpen] = useState(false);
	const cartItemCount = useSelector((state) => state.cart.items.length);

	const toggleMenu = () => {
		setIsOpen((prev) => !prev);
	};

	const handleCLose = () => {
		setIsOpen((prev) => !prev);
	};

	return (
		<nav>
			<h2>
				<NavLink to="/">LIQUISEIFE RESOURCES</NavLink>
			</h2>
			<div className="navbar-toggle" onClick={toggleMenu}>
				{isOpen ? (
					<FaTimes color="#007BFF" size={25} />
				) : (
					<FaBars color="#007BFF" size={25} />
				)}
			</div>
			<ul className={isOpen ? "nav-list-open" : ""}>
				<li>
					<NavLink to="/" onClick={handleCLose}>
						Home
					</NavLink>
				</li>
				<li>
					<NavLink to="/about" onClick={handleCLose}>
						About Us
					</NavLink>
				</li>
				<li>
					<NavLink to="/products" onClick={handleCLose}>
						Our Products
					</NavLink>
				</li>
				<li>
					<NavLink to="/contact" onClick={handleCLose}>
						Contact Us
					</NavLink>
				</li>
				<li>
					<NavLink to="/gallery" onClick={handleCLose}>
						Gallery
					</NavLink>
				</li>
				<li className="cart-icon">
					<Link to={"/cart"} onClick={handleCLose}>
						<BsCart4 color="#000" size={20} />
						{cartItemCount > 0 && (
							<span className="cart-badge">{cartItemCount}</span>
						)}
					</Link>
				</li>
			</ul>
		</nav>
	);
}
