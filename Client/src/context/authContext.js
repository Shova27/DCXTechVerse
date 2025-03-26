import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [user, setUser] = useState(null);

    useEffect(() => {
        if (token) {
            try {
                const decodedUser = jwtDecode(token);
                const currentTime = Date.now() / 1000;

                if (decodedUser.exp < currentTime) {
                    handleLogout(); // Auto logout if expired
                } else {
                    setUser(decodedUser);
                }
            } catch (error) {
                console.error("Invalid token:", error);
                handleLogout();
            }
        } else {
            setUser(null);
        }
    }, [token]);

    const login = (jwtToken) => {
        localStorage.setItem("token", jwtToken);
        setToken(jwtToken);
    };

    const handleLogout = async () => {
        try {
            await axios.post("http://localhost:5000/user/logout"); // Backend logout
        } catch (error) {
            console.error("Error during logout:", error);
        } finally {
            localStorage.removeItem("token");
            setToken(null);
            setUser(null);
        }
    };

    return (
        <AuthContext.Provider value={{ token, user, login, handleLogout }}>
            {children}
        </AuthContext.Provider>
    );
};

