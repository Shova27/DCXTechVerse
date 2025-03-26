import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/cartContext"; // Import Cart Context
import { AuthContext } from "../context/authContext"; // Import Auth Context

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);
  const { user } = useContext(AuthContext); // Get user info
  const navigate = useNavigate();

  const [message, setMessage] = useState(""); // State to store the message
  const [messageColor, setMessageColor] = useState(""); // State for text color

  const handleAddToCart = () => {
    if (!user) {
      setMessage("Please login to add items to cart!");
      setMessageColor("text-danger"); // Red color for error
      setTimeout(() => {
        setMessage(""); // Clear message after a few seconds
        navigate("/login"); // Redirect to login page
      }, 3000);
      return;
    }
    addToCart(product);
    setMessage("Added to cart successfully!");
    setMessageColor("text-success"); // Green color for success
    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <div className="col-md-4 mb-4">
      <div
        className="card shadow-sm border rounded"
        style={{ width: "320px", textAlign: "center", padding: "15px" }}
      >
        {/* Product Image */}
        <img
          src={`http://localhost:5000/${product.productImage}`}
          className="card-img-top"
          alt={product.productName}
          style={{ width: "100%", height: "200px", objectFit: "contain" }}
        />

        {/* Product Details */}
        <div className="card-body p-2">
          <h6 className="card-title font-weight-bold text-primary">
            {product.productName}
          </h6>

          {/* Price */}
          <h6 className="text-dark font-weight-bold">Rs. {product.productPrice}</h6>

          {/* Description */}
          <p className="text-muted" style={{ fontSize: "0.85rem", marginBottom: "5px" }}>
            {product.productDesc}
          </p>

          {/* Add to Cart Button */}
          <button 
            className="btn btn-primary btn-sm w-100" 
            onClick={handleAddToCart} // Updated onClick function
          >
            Add to Cart
          </button>

          {/* Show message dynamically */}
          {message && (
            <p className={`mt-2 ${messageColor}`}>
              {message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
