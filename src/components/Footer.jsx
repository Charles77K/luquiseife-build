import React from "react";
import { FaFacebook } from "react-icons/fa6";
import "../styles/Footer.css";
import { Link } from "react-router-dom";
import MyCalender from "./MyCalender";

export default function Footer() {
	return (
		<footer className="fixed-footer">
			<div className="footer-elements">
				<section>
					<h3>Liquiseife Resources</h3>
					<h5>Make Everything About You Healthy and Clean</h5>
					<span>
						<a href="https://web.facebook.com/Liser/">
							<FaFacebook size={25} color="#fff" />
						</a>
					</span>
				</section>
				<section>
					<h3>Additional Pages</h3>
					<h5>
						<Link to="/" className="footer-link">
							Home
						</Link>
					</h5>
					<h5>
						<Link to="/about" className="footer-link">
							About Us
						</Link>
					</h5>
					<h5>
						<Link to="/products" className="footer-link">
							Our Products
						</Link>
					</h5>
					<h5>
						<Link to="/contact" className="footer-link">
							Contact Us
						</Link>
					</h5>
					<h5>
						<Link to="/gallery" className="footer-link">
							Gallery
						</Link>
					</h5>
				</section>
				<section className="calender">
					<MyCalender />
				</section>
			</div>
			<div className="footer-copyrights">
				<h5>Copyright © 2024 liquiseife Resources Co., Ltd. - Design:</h5>
			</div>
		</footer>
	);
}
