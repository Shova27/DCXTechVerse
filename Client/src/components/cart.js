import React, { useContext, useState } from "react";
import { CartContext } from "../context/cartContext";
import { Modal, Button, Table, Alert } from "react-bootstrap";

const Cart = ({ showCart, handleClose }) => {
  const { cart, deleteFromCart, clearCart, updateCartQuantity } = useContext(CartContext);
  const [showCheckout, setShowCheckout] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const calculateTotalPrice = () =>
    cart.reduce((total, item) => total + parseFloat(item.price) * item.quantity, 0).toFixed(2);

  const handlePayment = () => {
    setTimeout(() => {
      setOrderSuccess(true);
      clearCart(); 

      setTimeout(() => {
        setShowCheckout(false);
        setOrderSuccess(false);
      }, 2000);
    }, 1000);
  };

  const handleDeleteConfirmation = (item) => {
    setItemToDelete(item);
    setShowDeleteConfirmation(true);
  };

  const confirmDelete = () => {
    deleteFromCart(itemToDelete.productId?._id);
    setShowDeleteConfirmation(false);
    setItemToDelete(null);
  };

  const cancelDelete = () => {
    setShowDeleteConfirmation(false);
    setItemToDelete(null);
  };

  return (
    <>
      {/* Shopping Cart Modal */}
      <Modal show={showCart} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Shopping Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {cart.length === 0 ? (
            <Alert variant="info" className="text-center">Your cart is empty</Alert>
          ) : (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => (
                  <tr key={item._id}>
                    <td>{item.productId?.productName || "Unknown Product"}</td>
                    <td>Rs. {parseFloat(item.price).toFixed(2)}</td>
                    <td className="d-flex align-items-center">
                      <Button
                        variant="outline-secondary"
                        size="sm"
                        onClick={() => updateCartQuantity(item.productId?._id, item.quantity - 1)}
                        style={{ marginRight: '5px' }}
                        disabled={item.quantity <= 1} 
                      >
                        -
                      </Button>
                      <span style={{ margin: '0 10px' }}>{item.quantity}</span>
                      <Button
                        variant="outline-secondary"
                        size="sm"
                        onClick={() => updateCartQuantity(item.productId?._id, item.quantity + 1)}
                        style={{ marginLeft: '5px' }}
                      >
                        +
                      </Button>
                    </td>
                    <td>
                      <Button variant="danger" size="sm" onClick={() => handleDeleteConfirmation(item)}>
                        Remove
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Modal.Body>
        {cart.length > 0 && (
          <Modal.Footer>
            <strong>Total: Rs. {calculateTotalPrice()}</strong>
            <Button variant="secondary" onClick={clearCart}>Clear Cart</Button>
            <Button variant="success" onClick={() => setShowCheckout(true)}>Checkout</Button>
          </Modal.Footer>
        )}
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteConfirmation} onHide={cancelDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to remove this item from the cart?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={cancelDelete}>No</Button>
          <Button variant="danger" onClick={confirmDelete}>Yes</Button>
        </Modal.Footer>
      </Modal>

      {/* Checkout Modal */}
      <Modal show={showCheckout} onHide={() => setShowCheckout(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Payment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {orderSuccess ? (
            <Alert variant="success"> Order Placed Successfully!</Alert>
          ) : (
            <>
              <h4>Total Amount: Rs. {calculateTotalPrice()}</h4>
              <p>Proceed to payment?</p>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          {!orderSuccess ? (
            <>
              <Button variant="danger" onClick={() => setShowCheckout(false)}>Cancel</Button>
              <Button variant="success" onClick={handlePayment}>Pay Now</Button>
            </>
          ) : (
            <Button variant="success" onClick={() => setShowCheckout(false)}>OK</Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Cart;

