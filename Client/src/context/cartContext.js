import { createContext, useContext, useState, useEffect } from "react";
import { AuthContext } from "./authContext";
import axios from "axios";

// Create Context
export const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
    const { user } = useContext(AuthContext);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        if (user?._id) fetchCart();
    }, [user?._id]);

    const fetchCart = async () => {
        if (!user?._id) return;

        const token = localStorage.getItem("token"); // Get JWT token from storage

        try {
            const res = await axios.get(`http://localhost:5000/cart/${user._id}`, {
                headers: { Authorization: `Bearer ${token}` } // Send token in headers
            });
            setCart(res.data?.items || []);
        } catch (error) {
            console.error("Error fetching cart:", error);
        }
    };

    const addToCart = async (product) => {
        if (!user?._id) return;

        const token = localStorage.getItem("token");

        let price = product.productPrice;
        if (typeof price === "string") {
            price = Number(price.replace(/[^0-9.]/g, ""));
        }

        if (isNaN(price) || price <= 0) {
            console.error("Invalid price detected:", product.productPrice);
            return;
        }

        try {
            await axios.post(
                "http://localhost:5000/cart/add",
                {
                    userId: user._id,
                    productId: product._id,
                    quantity: 1,
                    price: Math.round(price),
                },
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );
            fetchCart();
        } catch (error) {
            console.error("Error adding to cart:", error);
        }
    };

    const deleteFromCart = async (productId) => {
        if (!user?._id) return;

        const token = localStorage.getItem("token");

        try {
            await axios.delete(`http://localhost:5000/cart/${user._id}/${productId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchCart();
        } catch (error) {
            console.error("Error removing item from cart:", error);
        }
    };

    const clearCart = async () => {
        if (!user?._id) return;

        const token = localStorage.getItem("token");

        try {
            await axios.delete(`http://localhost:5000/cart/${user._id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setCart([]);
        } catch (error) {
            console.error("Error clearing cart:", error);
        }
    };

    const updateCartQuantity = async (productId, quantity) => {
        if (!user?._id) return;

        const token = localStorage.getItem("token");

        try {
            await axios.put(
                "http://localhost:5000/cart/update",
                {
                    userId: user._id,
                    productId: productId,
                    quantity: Math.max(1, quantity)
                },
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );
            fetchCart();
        } catch (error) {
            console.error("Error updating cart quantity:", error);
        }
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, deleteFromCart, clearCart, updateCartQuantity }}>
            {children}
        </CartContext.Provider>
    );
};
