import { createContext, useContext, useState, useEffect } from "react";
import { AuthContext } from "./authContext";
import axios from "axios";

// Create Context
export const CartContext = createContext(null); // <-- Ensure default is null

export const CartProvider = ({ children }) => {
    const { user } = useContext(AuthContext);
    const [cart, setCart] = useState([]);
    // console.log("CartProvider Loaded, user:", user); //Debugging
    useEffect(() => {
        if (user?._id) fetchCart();
    }, [user?._id]);

    const fetchCart = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/cart/${user._id}`);
            setCart(res.data?.items || []);
        } catch (error) {
            console.error("Error fetching cart:", error);
        }
    };

    const addToCart = async (product) => {
        if (!user?._id) return;
    
        // Ensure price is a valid number
        let price = product.productPrice;
        if (typeof price === "string") {
            price = Number(price.replace(/[^0-9.]/g, "")); // Remove "Rs." and ensure it's a number
        }
    
        if (isNaN(price) || price <= 0) {
            console.error("Invalid price detected:", product.productPrice);
            return;
        }
    
        try {
            await axios.post("http://localhost:5000/cart/add", {
                userId: user._id,
                productId: product._id,
                quantity: 1,
                price: Math.round(price),  // Send only the numeric price
            });
            fetchCart(); //update the state
        } catch (error) {
            console.error("Error adding to cart:", error);
        }
    };

    // Remove an item from the cart
    const deleteFromCart = async (productId) => {
        if (!user?._id) return;

        try {
            await axios.delete(`http://localhost:5000/cart/${user._id}/${productId}`);
            fetchCart(); // Refresh cart after deletion
        } catch (error) {
            console.error("Error removing item from cart:", error);
        }
    };
    //  Clear entire cart
    const clearCart = async () => {
        if (!user?._id) return;

        try {
            await axios.delete(`http://localhost:5000/cart/${user._id}`);
            setCart([]); // Reset cart to empty after clearing
        } catch (error) {
            console.error("Error clearing cart:", error);
        }
    };
    
    // Update item quantity in the cart
    const updateCartQuantity = async (productId, quantity) => {
        if (!user?._id) return;
 
        try {
            await axios.put(`http://localhost:5000/cart/update`, {
                userId: user._id,
                productId: productId,
                quantity: Math.max(1, quantity) // Ensure quantity is at least 1
            });
            fetchCart(); // Refresh cart after updating quantity
        } catch (error) {
            console.error("Error updating cart quantity:", error);
        }
    };

    return (
        <CartContext.Provider value={{ cart, addToCart , deleteFromCart , clearCart , updateCartQuantity}}> 
            {children}
        </CartContext.Provider>
    );
};
