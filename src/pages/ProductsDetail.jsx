import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/ProductDetail.css";
import { GoBack, Preloader } from "../components";
import axios from "axios";

const ProductsDetail = () => {
	const [product, setProduct] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const { id } = useParams();

	const fetchProduct = async () => {
		setIsLoading(true);
		try {
			const response = await axios.get(
				`http://api.liquiseife.com/products/${id}`
			);
			if (response.status === 200) {
				setProduct(response.data);
			} else {
				console.log("Error fetching product data");
			}
		} catch (err) {
			console.error(err.message);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchProduct();
	}, [id]);

	if (isLoading) {
		return <Preloader />;
	}

	if (!product) {
		return <p>Product not found</p>;
	}

	return (
		<div className="product-detail-container">
			<GoBack />
			<div className="product-detail">
				<img
					src={`http://api.liquiseife.com${product.image}`}
					alt={product.name}
					className="product-image"
				/>
				<h1>{product.name}</h1>
				<p>{product.description}</p>
				<p>₦{product.price}</p>
				<button>Add to Cart</button>
			</div>
		</div>
	);
};

export default ProductsDetail;
