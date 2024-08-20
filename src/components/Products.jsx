import React, { useEffect, useState } from "react";
import "../styles/Products.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addItem } from "../redux/cartReducer";
import { Snackbar } from "@mui/material";
import axios from "axios";
import Preloader from "./Preloader";

export default function Products({ bottom, header }) {
	const [isLoading, setIsLoading] = useState(false);
	const [productsData, setProducts] = useState([]);
	const [isOpen, setIsOpen] = useState(false);
	const dispatch = useDispatch();

	const getProducts = async () => {
		setIsLoading(true);
		try {
			const response = await axios.get("http://api.liquiseife.com/products/");
			console.log(response);
			if (response.status === 200) {
				setProducts(response.data);
				setIsLoading(false);
			} else {
				alert("err fetching data");
			}
		} catch (err) {
			if (err.response) {
				console.log(err.response);
			} else {
				alert("error fetching products");
				console.log(err.message);
			}
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		getProducts();
	}, []);

	const handleAddToCart = (item) => {
		dispatch(
			addItem({
				id: item.id,
				product: item.name,
				img: `http://api.liquiseife.com${item.image}`,
				price: item.price,
			})
		);
		setIsOpen(true);
	};
	const handleClose = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}
		setIsOpen(false);
	};
	return (
		<div>
			{isLoading ? (
				<div style={{ textAlign: "center" }}>
					<Preloader />
					<h3 style={{ color: "#000" }}>Loading products...</h3>
				</div>
			) : (
				<main>
					<section className="title">
						<p id="p-text">Our Products</p>
						<h2>{header}</h2>
					</section>
					<section className="main-container">
						{productsData.map((item) => (
							<div key={item.id} className="container">
								<div className="product-image">
									<Link to={`/products/${item.id}`}>
										<img
											src={`http://api.liquiseife.com${item.image}`}
											alt={item.name}
										/>
									</Link>
								</div>
								<div className="product-details">
									<p className="product-title">{item.name}</p>
									<div className="products-flex">
										<p className="product-price">₦{item.price}</p>
										<button
											className="add-to-cart"
											onClick={() => handleAddToCart(item)}
										>
											Add to Cart
										</button>
									</div>
								</div>
							</div>
						))}
					</section>
					<section className="end-text">
						<Link to={"/products"}>
							{bottom ? <button>{bottom}</button> : null}
						</Link>
					</section>
					<Snackbar
						open={isOpen}
						autoHideDuration={3000}
						onClose={handleClose}
						message="Item added to cart"
					/>
				</main>
			)}
		</div>
	);
}
