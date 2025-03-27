import React, { useContext } from "react";
import { ProductContext } from "../context/productContext"; // Import ProductContext
import ProductCard from "../components/productCard"; // Import ProductCard
import "../styles/style.css"; // Ensure styling is applied

const Products = () => {
  const { products } = useContext(ProductContext); // Get products from context

  return (
    <div className="container mt-4">
      <div className="row">
        {products.length > 0 ? (
          products.map((product) => (
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
