import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { loginUser, registerUser } from "../services/api";
import "bootstrap/dist/css/bootstrap.min.css";

const AuthPage = () => {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const [isRegister, setIsRegister] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        mobileNumber: "",
    });
    const [message, setMessage] = useState("");
    const [messageColor, setMessageColor] = useState(""); // 'text-success' or 'text-danger'

    const toggleForm = () => {
        setIsRegister(!isRegister);
        setMessage(""); // Clear message when toggling form
        setMessageColor(""); // Clear message color when toggling form
        setFormData({
            name: "",
            email: "",
            password: "",
            mobileNumber: "",
        }); // Reset form data
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Validation for Full Name (Only Alphabets & Spaces)
        if (name === "name" && !/^[A-Za-z\s]*$/.test(value)) {
            return;
        }

        // Validation for Mobile Number (Only 10 Digits)
        if (name === "mobileNumber" && (value.length > 10 || isNaN(value))) {
            return;
        }

        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isRegister) {
                await registerUser(formData);
                setMessage("Registration successful! Please log in.");
                setMessageColor("text-success");
                setIsRegister(false);
            } else {
                const res = await loginUser({ email: formData.email, password: formData.password });
                login(res.data.token);
                navigate("/");
            }
        } catch (error) {
            console.error('Error:', error.response || error.message);
            setMessage(error.response?.data?.message || "An error occurred");
            setMessageColor("text-danger");
        }
    };

    return (
        <div className="container d-flex align-items-center justify-content-center vh-100">
            <div className="card p-4 shadow-lg" style={{ width: "400px" }}>
                <h3 className="text-center mb-3">{isRegister ? "Register" : "Login"}</h3>
                <form onSubmit={handleSubmit}>
                    {isRegister && (
                        <div className="mb-2">
                            <input
                                type="text"
                                className="form-control"
                                name="name"
                                placeholder="Full Name "
                                value={formData.name}
                                onChange={handleChange}
                                required
                                pattern="^[A-Za-z\s]+$"
                                title="Only alphabets are allowed in the name"
                            />
                        </div>
                    )}
                    <div className="mb-2">
                        <input
                            type="email"
                            className="form-control"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-2">
                        <input
                            type="password"
                            className="form-control"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    {isRegister && (
                        <div className="mb-2">
                            <input
                                type="text"
                                className="form-control"
                                name="mobileNumber"
                                placeholder="Mobile Number"
                                value={formData.mobileNumber}
                                onChange={handleChange}
                                required
                                pattern="^\d{10}$"
                                title="Mobile number must be exactly 10 digits"
                            />
                        </div>
                    )}
                    <button type="submit" className="btn btn-primary w-100">
                        {isRegister ? "Register" : "Login"}
                    </button>
                </form>
                {message && (
                    <div className="mt-3">
                        <p className={`text-center ${messageColor}`}>
                            {message}
                        </p>
                    </div>
                )}
                <p className="text-center mt-2">
                    {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
                    <span
                        className="text-primary"
                        style={{ cursor: "pointer" }}
                        onClick={toggleForm}
                    >
                        {isRegister ? "Login here" : "Register here"}
                    </span>
                </p>
            </div>
        </div>
    );
};

export default AuthPage;
