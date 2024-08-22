import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/ProductDetail.css";
import { useQuery } from "react-query";
import { GoBack, Preloader } from "../components";
import axios from "axios";
import { addItem } from "../redux/cartReducer";
import { useDispatch } from "react-redux";
import { Snackbar } from "@mui/material";

const fetchProduct = async (id) => {
	const response = await axios.get(`https://api.liquiseife.com/products/${id}`);
	const data = response.data;
	return data;
};

const ProductsDetail = () => {
	const [isOpen, setIsOpen] = useState(false);
	const dispatch = useDispatch();
	const { id } = useParams();

	// Use React Query to fetch product data
	const {
		data: product,
		isLoading,
		isError,
	} = useQuery(["product", id], () => fetchProduct(id), {
		staleTime: 1000 * 60 * 5, // Cache data for 5 minutes
		retry: 1, // Retry once on failure
	});

	if (isLoading) {
		return <Preloader />;
	}

	if (!product) {
		return <p>Product not found</p>;
	}

	const handleAddToCart = () => {
		dispatch(
			addItem({
				id: product.id,
				img: `https://api.liquiseife.com${product.image}`,
				product: product.name,
				price: product.price,
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
		<div className="product-detail-container">
			<GoBack />
			<div className="product-detail">
				<div className="product-img">
					<img
						src={`https://api.liquiseife.com${product.image}`}
						alt={product.name}
						className="product-image"
					/>
				</div>
				<div className="products-description">
					<h1>{product.name}</h1>
					<p className="description">{product.description}</p>
					<p>₦{product.price}</p>
					<button onClick={handleAddToCart}>Add to Cart</button>
				</div>
			</div>
			<Snackbar
				open={isOpen}
				autoHideDuration={3000}
				onClose={handleClose}
				message="Item added to cart"
			/>
		</div>
	);
};

export default ProductsDetail;
