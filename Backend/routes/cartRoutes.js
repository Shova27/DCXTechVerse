const express = require('express');
const cart= require('../controllers/cartController');

const router = express.Router();

router.post('/add', cart.addToCart); //add cart
router.get('/:userId', cart.getCartItems);
router.delete('/:userId/:productId', cart.deleteItem);
router.delete('/:userId', cart.clearCart);
router.put('/update', cart.updateCartQuantity)


module.exports = router;