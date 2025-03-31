import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CartContext } from "../context/cartContext";
import { AuthContext } from "../context/authContext";

const ProductDetails = () => {
  const { id } = useParams(); // Get product ID from URL
  const { addToCart } = useContext(CartContext);
  const { user } = useContext(AuthContext); // Get authenticated user
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [rating, setRating] = useState(0); // Fake rating
  const [message, setMessage] = useState(""); // State for login message
  const [messageColor, setMessageColor] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:5000/products/${id}`);
        const data = await response.json();
        setProduct(data);
        setRating((Math.random() * (5 - 3.5) + 3.5).toFixed(1)); // Generate a fake rating between 3.5 and 5
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!user) {
      setMessage("Please login to add items to the cart.");
      setMessageColor("text-danger");
      setTimeout(() => {
        setMessage("");
        navigate("/login"); // Redirect to login page
      }, 3000);
      return;
    }
    addToCart(product);
    setMessage("Added To Cart Successfully !");
    setMessageColor("text-success");
  };

  if (!product) return <p className="text-center">Loading...</p>;

  return (
    <div className="container mt-5">
      <div className="row">
        {/* Product Image */}
        <div className="col-md-6 text-center">
          <img 
            src={`http://localhost:5000/${product.productImage}`} 
            alt={product.productName} 
            className="img-fluid rounded shadow-lg"
            style={{ maxHeight: "400px", objectFit: "contain" }}
          />
        </div>

        {/* Product Details */}
        <div className="col-md-6">
          <h2 className="text-primary">{product.productName}</h2>
          <h4 className="text-danger">Rs. {product.productPrice}</h4>
          
          {/* Fake Star Rating */}
          <p className="text-warning">
            {Array.from({ length: Math.round(rating) }).map((_, index) => (
              <span key={index}>⭐</span>
            ))}{" "}
            <span className="text-dark">({rating})</span>
          </p>

          <p className="text-muted">{product.productDesc}</p>

          {/* Add to Cart Button */}
          <button 
            className="btn btn-primary btn-lg w-100" 
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

export default ProductDetails;


