import axios from "axios";

const API_URL = "http://localhost:5000/user"; // Change based on your backend URL

export const registerUser = async (userData) => {
    return axios.post(`${API_URL}/register`, userData);
};

export const loginUser = async (userData) => {
    return axios.post(`${API_URL}/login`, userData);
};

