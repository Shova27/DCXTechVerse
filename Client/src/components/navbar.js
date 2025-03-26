
import React, { useState , useContext} from "react";
import { Navbar, Nav, Container, Form, FormControl, Button, Modal, Alert } from "react-bootstrap";
import { Link, useLocation, useNavigate} from "react-router-dom";
import { FaShoppingCart, FaUser, FaStore ,FaSignOutAlt} from "react-icons/fa";
import { CartContext } from "../context/cartContext";
import { AuthContext } from "../context/authContext";
import Cart from "./cart";
import axios from "axios";
import SearchResults from "./searchResult";

 
const NavigationBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showCart, setShowCart] = useState(false);
  const [searchResults, setSearchResults]=useState([]);
  const [hideSpecialsAndNew, setHideSpecialsAndNew]=useState(false);
  const [showEmptySearchModal, setShowEmptySearchModal] = useState(false); // State for empty search modal
  const {cart}= useContext(CartContext);
  const { user, handleLogout } = useContext(AuthContext);

  
  
  const location =useLocation();
  const navigate = useNavigate();

  // Handle Search
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) {
      setShowEmptySearchModal(true); // Show modal if search term is empty
      return;
    }
    try {
      const response = await axios.get(`http://localhost:5000/products/search/${searchTerm}`);
      setSearchResults(response.data);
      if (response.data.length === 0) {
        setSearchResults([{ _id: "no-results", productName: "No products found", productPrice: "", productDesc: "", productImage: "" }]);
      }
      navigate("/search-results"); // Navigate to the search results page
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  //clear search result
  const handleNavigation = (path) => {
    setSearchResults([]); // Clear search results
    navigate(path);
    if (path === "/products" || path === "/account"){
      setHideSpecialsAndNew(true); // Hide "What's New" and "Specials"
    } else {
      setHideSpecialsAndNew(false); // Show "What's New" and "Specials"
    }
  };
 
  const handleScroll = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };
 
  return (
<>
      {/* Sticky Navbar */}
    <Navbar bg="grey" expand="lg" className="py-2 shadow-sm custom-navbar ">
    <Container>
    <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
    <FaStore size={40} className="me-2 text-primary" />
    <span className="fs-3 fw-bold text-dark">DCX-TechVerse</span>
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="me-auto fs-5">
  
    <Nav.Link onClick={() => handleNavigation("/")}>Home</Nav.Link>
    {!hideSpecialsAndNew && (
                <>
                  <Nav.Link onClick={() => handleScroll("whats-new")}>What's New</Nav.Link>
                  <Nav.Link onClick={() => handleScroll("specials")}>Specials</Nav.Link>
                </>
              )}
    <Nav.Link onClick={() => handleNavigation("/products")}>Products</Nav.Link>
    <Nav.Link onClick={() => handleNavigation("/account")}>My Account</Nav.Link>
    </Nav>
    <Form className="d-flex me-3" onSubmit={handleSearch}>
    <FormControl
                    type="search"
                    placeholder="Search products..."
                    className="me-2"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
    <Button variant="outline-primary" type="submit">Search</Button>
    </Form>
    <Nav className="d-flex align-items-center">
    <Nav.Link 
    className="me-3 fs-5 position-relative" 
    onClick={() => {
      if (!user) {
        alert("Please log in to access your cart."); //  Show alert if not logged in
        return;
      }
      setShowCart(true); // Open cart only if logged in
    }}
    style={{ cursor: user ? "pointer" : "not-allowed", opacity: user ? 1 : 0.5 }} // Disable styling
    >
    <FaShoppingCart />
    {cart.length > 0 && user && ( // Show badge only if logged in
      <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
        {cart.length}
      </span>
    )}
</Nav.Link>

     {user ? (
                <Nav.Link className="fs-5 text-primary cursor-pointer" onClick={handleLogout}>
                  <FaSignOutAlt /> Logout
                </Nav.Link>
              ) : (
                <Nav.Link as={Link} to="/login" className="fs-5">
                  <FaUser /> Login
                </Nav.Link>
              )}
    </Nav>
    </Navbar.Collapse>
    </Container>
    </Navbar>

{/* Empty Search Modal */}
<Modal show={showEmptySearchModal} onHide={() => setShowEmptySearchModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Search Error</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Alert variant="danger">Please enter Something...</Alert>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEmptySearchModal(false)}>Close</Button>
        </Modal.Footer>
      </Modal>

      {/* Display Search Results */}
      {searchResults.length > 0 && (
        <SearchResults searchResults={searchResults} />
      )}

    <Cart showCart={showCart} handleClose={() => setShowCart(false)} />
</>
  );
};
 
export default NavigationBar;