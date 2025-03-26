import React, { useContext, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { CartContext } from "../context/cartContext"; // Import Cart Context
import { AuthContext } from "../context/authContext"; // Import Auth Context
const SearchResults = ({ searchResults }) => {
  const { addToCart } = useContext(CartContext);
  const { user } = useContext(AuthContext); // Get user info
  const [showMessage, setShowMessage] = useState(null);
  const handleAddToCart = (product) => {
    if (!user) {
      alert("Please login to add items to cart!"); // Prevent adding if not logged in
      return;
    }
    addToCart(product);
    setShowMessage(product._id);
    setTimeout(() => setShowMessage(null), 2000);
  };
  return (
    <Container className="mt-3">
      <h3>Search Results:</h3>
      <Row>
        {searchResults.length === 1 && searchResults[0]._id === "no-results" ? (
          <Col md={12} className="text-center">
            <h4 style={{ color: 'lightcoral' }}>No products found</h4>
          </Col>
        ) : (
          searchResults.map((product) => (
            <Col key={product._id} md={4} className="mb-4">
              <Card className="shadow-sm border rounded h-100">
                {product.productImage ? (
                  <Card.Img variant="top" src={`http://localhost:5000/${product.productImage}`} alt={product.productName} style={{ height: '250px', objectFit: 'contain' }} />
                ) : (
                  <Card.Img variant="top" src="https://via.placeholder.com/250" alt="No Image Available" style={{ height: '250px', objectFit: 'contain' }} />
                )}
                <Card.Body className="d-flex flex-column">
                  <Card.Title className="text-primary">{product.productName}</Card.Title>
                  <Card.Text className="flex-grow-1">
                    <strong>Price:</strong> {product.productPrice ? `Rs. ${product.productPrice}` : "N/A"}
                    <br />
                    <strong>Description:</strong> {product.productDesc || "N/A"}
                  </Card.Text>
                  {product._id !== "no-results" && (
                    <>
                      <Button variant="primary" className="mt-auto w-100" onClick={() => handleAddToCart(product)}>Add to Cart</Button>
                      <div style={{ height: '40px' }}>
                        {showMessage === product._id && (
                          <div className="alert alert-success mt-2" role="alert">
                            Added to cart!
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </Card.Body>
              </Card>
            </Col>
          ))
        )}
      </Row>
    </Container>
  );
};
export default SearchResults;
 