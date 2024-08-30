import React, { useEffect, useState } from "react";
import "../styles/Products.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addItem } from "../redux/cartReducer";
import { useQuery } from "react-query";
import { Snackbar } from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";
import Preloader from "./Preloader";

export default function Products({ bottom, header, value }) {
	const [isOpen, setIsOpen] = useState(false);
	const dispatch = useDispatch();

	const getProducts = async () => {
		try {
			const response = await axios.get("https://api.liquiseife.com/products/", {
				params: value ? { limit: value } : {},
			});
			if (response.status === 200) {
				return response.data;
			} else {
				toast.error("Error fetching data");
				return [];
			}
		} catch (err) {
			toast.error("Error fetching products");
			console.error(err.message);
			return [];
		}
	};

	const {
		data: products = [],
		isLoading,
		isError,
	} = useQuery(["products", value], getProducts, {
		staleTime: 1000 * 60 * 5,
		retry: 1,
	});

	const handleAddToCart = (item) => {
		dispatch(
			addItem({
				id: item.id,
				product: item.name,
				img: `https://api.liquiseife.com${item.image}`,
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
						{products.map((item) => (
							<div key={item.id} className="container">
								<div className="product-image">
									<Link to={`/products/${item.id}`}>
										<img
											src={`https://api.liquiseife.com${item.image}`}
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
