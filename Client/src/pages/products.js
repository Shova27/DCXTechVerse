import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/productCard"; // Import ProductCard
import "../styles/style.css"; // Ensure styling is applied

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/products") // Fetch from backend
      .then(response => setProducts(response.data))
      .catch(error => console.error("Error fetching products:", error));
  }, []);

  return (
    <div className="container mt-4">
      <div className="row">
        {products.length > 0 ? (
          products.map(product => (
            <ProductCard key={product._id} product={product} />
          ))
        ) : (
          <p className="text-center">No products available</p>
        )}
      </div>
    </div>
  );
};

export default Products;
