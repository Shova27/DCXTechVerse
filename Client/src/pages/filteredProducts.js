import { useEffect, useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CartContext } from "../context/cartContext";
import { AuthContext } from "../context/authContext";
import axios from "axios";

const FilteredProducts = () => {
  const [products, setProducts] = useState([]);
  const { addToCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const category = queryParams.get("category");
  const [showMessage, setShowMessage] = useState(null);
  const [messageType, setMessageType] = useState({}); // Object to store message type per product

  useEffect(() => {
    if (category) {
      axios
        .get(`http://localhost:5000/products/category?category=${encodeURIComponent(category)}`)
        .then((res) => setProducts(res.data))
        .catch((err) => console.error(err));
    }
  }, [category]);

  const handleAddToCart = (productId) => {
    if (!user) {
      setShowMessage(productId); // Show login message for this product
      setMessageType((prev) => ({ ...prev, [productId]: "danger" })); // Red message for login
      setTimeout(() => {
        setShowMessage(null);
        navigate("/login"); // Redirect to login
      }, 3000);
      return;
    }

    const product = products.find((p) => p._id === productId);
    addToCart(product);
    setShowMessage(productId);
    setMessageType((prev) => ({ ...prev, [productId]: "success" })); // Green message for added to cart
    setTimeout(() => setShowMessage(null), 2000);
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center">{category} Products</h2>
      <div className="row">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product._id} className="col-md-4 mb-4">
              <div className="card shadow-sm border rounded" style={{ textAlign: "center", padding: "15px" }}>
                {/* Product Image */}
                <img
                  src={`http://localhost:5000/${product.productImage}`}
                  className="card-img-top"
                  alt={product.productName}
                  style={{ width: "100%", height: "200px", objectFit: "contain" }}
                />

                {/* Product Details */}
                <div className="card-body p-2">
                  <h6 className="card-title font-weight-bold text-primary">{product.productName}</h6>
                  <h6 className="text-dark font-weight-bold">Rs. {product.productPrice}</h6>
                  <p className="text-muted" style={{ fontSize: "0.85rem", marginBottom: "5px" }}>
                    {product.productDesc}
                  </p>

                  {/* Add to Cart Button */}
                  <button className="btn btn-primary btn-sm w-100" onClick={() => handleAddToCart(product._id)}>
                    Add to Cart
                  </button>

                  {/* Temporary Message */}
                  {showMessage === product._id && (
                    <div className={`alert alert-${messageType[product._id]} mt-2`} role="alert">
                      {messageType[product._id] === "danger"
                        ? "Please login to add items to the cart!"
                        : "Added to cart!"}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">No products found in this category.</p>
        )}
      </div>
    </div>
  );
};

export default FilteredProducts;

