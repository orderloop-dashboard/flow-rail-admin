import axios from "axios";

const API_URL = "https://florail-backend.vercel.app/api";

// Aluminium API calls

export const createAluminiumType = async (type) => {
    const response = await axios.post(`${API_URL}/aluminium/types`, type);
    return response.data;
};

export const updateAluminiumType = async (id, type) => {
    const response = await axios.put(`${API_URL}/aluminium/types/${id}`, type);
    return response.data;
};

export const deleteAluminiumType = async (id) => {
    await axios.delete(`${API_URL}/aluminium/types/${id}`);
};

// Steel API calls

export const createSteelType = async (type) => {
    const response = await axios.post(`${API_URL}/steel/types`, type);
    return response.data;
};

export const updateSteelType = async (id, type) => {
    const response = await axios.put(`${API_URL}/steel/types/${id}`, type);
    return response.data;
};

export const deleteSteelType = async (id) => {
    await axios.delete(`${API_URL}/steel/types/${id}`);
};

// Aluminium Product API calls
export const getAluminiumProducts = async () => {
    const response = await axios.get(`${API_URL}/aluminium/products`);
    return response.data;
};

export const createAluminiumProduct = async (product) => {
    const response = await axios.post(`${API_URL}/aluminium/products`, product);
    return response.data;
};

export const updateAluminiumProduct = async (id, product) => {
    const response = await axios.put(`${API_URL}/aluminium/products/${id}`, product);
    return response.data;
};

export const deleteAluminiumProduct = async (id) => {
    await axios.delete(`${API_URL}/aluminium/products/${id}`);
};

// Steel Product API calls
export const getSteelProducts = async () => {
    const response = await axios.get(`${API_URL}/steel/products`);
    return response.data;
};

export const createSteelProduct = async (product) => {
    const response = await axios.post(`${API_URL}/steel/products`, product);
    return response.data;
};

export const updateSteelProduct = async (id, product) => {
    const response = await axios.put(`${API_URL}/steel/products/${id}`, product);
    return response.data;
};

export const deleteSteelProduct = async (id) => {
    await axios.delete(`${API_URL}/steel/products/${id}`);
};

// Existing imports and definitions

// Fetch types
export const getAluminiumTypes = async () => {
    const response = await axios.get(`${API_URL}/aluminium/types`);
    return response.data;
};

export const getSteelTypes = async () => {
    const response = await axios.get(`${API_URL}/steel/types`);
    return response.data;
};
