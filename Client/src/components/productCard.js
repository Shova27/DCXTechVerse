import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/cartContext";
import { AuthContext } from "../context/authContext";

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [message, setMessage] = useState("");
  const [messageColor, setMessageColor] = useState("");

  const handleAddToCart = () => {
    if (!user) {
      setMessage("Please login to add items to cart!");
      setMessageColor("text-danger");
      setTimeout(() => {
        setMessage("");
        navigate("/login");
      }, 3000);
      return;
    }
    addToCart(product);
    setMessage("Added to cart successfully!");
    setMessageColor("text-success");
    setTimeout(() => setMessage(""), 3000);
  };

  const handleProductClick = () => {
    navigate(`/product/${product._id}`); // Navigate to product details page
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
          style={{ width: "100%", height: "200px", objectFit: "contain", cursor: "pointer" }}
          onClick={handleProductClick} // Navigate on image click
        />

        {/* Product Details */}
        <div className="card-body p-2">
          <h6 
            className="card-title font-weight-bold text-primary"
            style={{ cursor: "pointer" }}
            onClick={handleProductClick} // Navigate on name click
          >
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
            onClick={handleAddToCart}
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

