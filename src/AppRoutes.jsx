import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
	Home,
	About,
	Gallery,
	Contact,
	ProductsPage,
	ProductsDetail,
	Cart,
	Checkout,
} from "./pages";
import { Header, ScrollToTop, Footer } from "./components";

export default function AppRoutes() {
	return (
		<Router>
			<ScrollToTop />
			<Header />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/about" element={<About />} />
				<Route path="/products" element={<ProductsPage />} />
				<Route path="/products/:id" element={<ProductsDetail />} />
				<Route path="/contact" element={<Contact />} />
				<Route path="/gallery" element={<Gallery />} />
				<Route path="/cart" element={<Cart />} />
				<Route path="/checkout" element={<Checkout />} />
			</Routes>
			<Footer />
		</Router>
	);
}
