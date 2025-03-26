import React, { useContext, useState, useEffect } from "react";
import "../styles/style.css";
import { AuthContext } from "../context/authContext";

const MyAccount = () => {
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobileNumber: "",
    add1: "",
    add2: "",
    city: "",
    state: "",
    zip: "",
  });
  const [message, setMessage] = useState("");

  const indianStates = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa",
    "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala",
    "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland",
    "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana",
    "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
    "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu",
    "Lakshadweep", "Delhi", "Puducherry", "Ladakh", "Jammu and Kashmir"
  ];

  useEffect(() => {
    if (user) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        name: user.name || "",
        email: user.email || "",
        mobileNumber: user.mobileNumber || "",
        add1: user.address?.add1 || "",
        add2: user.address?.add2 || "",
        city: user.address?.city || "",
        state: user.address?.state || "",
        zip: user.address?.zip || "",
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCityChange = (e) => {
    const { value } = e.target;
    const cityRegex = /^[A-Za-z\s]*$/;
    if (cityRegex.test(value)) {
      setFormData({ ...formData, city: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const addressData = {
      add1: formData.add1,
      add2: formData.add2,
      city: formData.city,
      state: formData.state,
      zip: formData.zip,
    };

    // Check if all required fields are filled
    if (!formData.add1 || !formData.city || !formData.state || !formData.zip) {
      setMessage("Please fill in all required fields.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/user/${user._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(addressData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update address");
      }

      setMessage("Address updated successfully!");
    } catch (error) {
      console.error("Error updating address:", error);
      setMessage("Failed to update address");
    }
  };

  return (
    <div className="container mt-4">
      <h2>My Account</h2>
      <p>Manage your orders and profile here.</p>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" className="form-control" id="name" name="name" value={formData.name} disabled />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input type="email" className="form-control" id="email" name="email" value={formData.email} disabled />
          <small className="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>

        <div className="form-group">
          <label htmlFor="mobileNumber">Mobile Number</label>
          <input type="number" className="form-control" id="mobileNumber" name="mobileNumber" value={formData.mobileNumber} disabled />
        </div>

        <div className="form-group">
          <label htmlFor="add1">Address <span style={{ color: 'red' }}>*</span></label>
          <input type="text" className="form-control" id="add1" name="add1" value={formData.add1} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="add2">Address 2</label>
          <input type="text" className="form-control" id="add2" name="add2" value={formData.add2} onChange={handleChange} />
        </div>

        {/* City, State, and Zip in the same row */}
        <div className="row">
          <div className="form-group col-md-4">
            <label htmlFor="city">City <span style={{ color: 'red' }}>*</span></label>
            <input type="text" className="form-control" id="city" name="city" value={formData.city} onChange={handleCityChange} required />
          </div>

          <div className="form-group col-md-4">
            <label htmlFor="state">State <span style={{ color: 'red' }}>*</span></label>
            <select className="form-control" id="state" name="state" value={formData.state} onChange={handleChange} required>
              <option value="">Select State</option>
              {indianStates.map((state, index) => (
                <option key={index} value={state}>{state}</option>
              ))}
            </select>
          </div>

          <div className="form-group col-md-4">
            <label htmlFor="zip">Zip <span style={{ color: 'red' }}>*</span></label>
            <input type="number" className="form-control" id="zip" name="zip" value={formData.zip} onChange={handleChange} required />
          </div>
        </div>

        <br />
        <button type="submit" className="btn btn-primary">Save</button>

        {message && <p className="mt-2" style={{ color: message.toLowerCase().includes("success") ? "green" : "red" }}>{message}</p>}
      </form>
      <div className="content1 mt-4">
        <h3>FAQs</h3>
        <br />
        <p><b>What happens when I update my email address (or mobile number)?</b></p>
        <p>Your login email id (or mobile number) changes, likewise. You'll receive all your account related communication on your updated email address (or mobile number).</p>
        <br />
        <p><b>When will my Techverse account be updated with the new email address (or mobile number)?</b></p>
        <p>It happens as soon as you confirm the verification code sent to your email (or mobile) and save the changes.</p>
        <br />
        <p><b>What happens to my existing Techverse account when I update my email address (or mobile number)?</b></p>
        <p>Updating your email address (or mobile number) doesn't invalidate your account. Your account remains fully functional. You'll continue seeing your Order history, saved information and personal details.</p>
        <br />
        <p><b>Does my Seller account get affected when I update my email address?</b></p>
        <p>Techverse has a 'single sign-on' policy. Any changes will reflect in your Seller account also.</p>
      </div>
    </div>
  );
};

export default MyAccount;