const Cart = require('../models/cartModel');

//add to cart 
exports.addToCart = async (req, res) => {
  try {
    // console.log("Received data:", req.body);

    let { userId, productId, quantity, price } = req.body;

    if (!userId || !productId || !quantity || !price) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Ensure price is rounded and stored correctly
    price = Math.round(Number(price));

    let cart = await Cart.findOne({ userId });

    if (cart) {
      const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);

      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity;
      } else {
        cart.items.push({ productId, quantity, price });
      }
    } else {
      cart = new Cart({
        userId,
        items: [{ productId, quantity, price }],
      });
    }

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({ error: error.message });
  }
};


//get cart items
 exports.getCartItems=async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId })
      .populate("items.productId", "productName productPrice"); // Populate product name

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    res.status(200).json(cart);
  } catch (error) {
    console.error("Error fetching cart items:", error);
    res.status(500).json({ error: error.message });
  }
};

//remove item from cart
exports.deleteItem=async (req, res) => {
  try {
    let cart = await Cart.findOne({ userId: req.params.userId });

    if (cart) {
      cart.items = cart.items.filter(item => item.productId.toString() !== req.params.productId);
      await cart.save();
    }

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

//clear cart
exports.clearCart=async (req, res) => {
  try {
    await Cart.deleteOne({ userId: req.params.userId });
    res.status(200).json({ message: "Cart cleared" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//update cart quantity
exports.updateCartQuantity = async (req, res) => {
  const { userId, productId, quantity } = req.body;
  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    const item = cart.items.find(item => item.productId.toString() === productId);
    if (!item) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }
 
    item.quantity = quantity;
    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};




