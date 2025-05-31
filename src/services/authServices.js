import axios from "axios";

const API_URL = "https://kalakshetra3-backend.vercel.app/api/auth";

export const register = async (userData) => {
    return axios.post(`${API_URL}/register`, userData);
};

export const login = async (userData) => {
    return axios.post(`${API_URL}/login`, userData);
};
