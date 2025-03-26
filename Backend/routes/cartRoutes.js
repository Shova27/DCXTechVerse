const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");
const cartAuth = require("../middleware/cartMiddleware"); // Import middleware

router.post("/add", cartAuth, cartController.addToCart); // Apply middleware
router.get("/:userId", cartAuth, cartController.getCartItems);
router.delete("/:userId/:productId", cartAuth, cartController.deleteItem);
router.delete("/:userId", cartAuth, cartController.clearCart);
router.put("/update", cartAuth, cartController.updateCartQuantity);

module.exports = router;
