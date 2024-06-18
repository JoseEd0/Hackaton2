import axios from "axios";

const BACKEND_URL = "http://18.117.176.220/api";

export const fetchLogin = async (email, password) => {
  const response = await axios.post(`${BACKEND_URL}/auth/login`, { email, password });
  return response.data;
};

export const fetchRegister = async (fullName, email, password, username) => {
  const response = await axios.post(`${BACKEND_URL}/auth/register`, { fullName, email, password, username });
  return response.data;
};

export const createProduct = async (productData) => {
  const response = await axios.post(`${BACKEND_URL}/products`, productData);
  return response.data;
};

export const listProductos = async (token) => {
  const response = await axios.get(`${BACKEND_URL}/products`, {
      headers: {
          Authorization: `Bearer ${token}`,
      },
  });
  return response.data;
};

export const getProducts = async (skip, limit) => {
  const response = await axios.get(`${BACKEND_URL}/products?skip=${skip}&limit=${limit}`);
  return response.data;
};

export const getProductById = async (productId) => {
  const response = await axios.get(`${BACKEND_URL}/products/${productId}`);
  return response.data;
};

export const updateProduct = async (productId, productData) => {
  const response = await axios.put(`${BACKEND_URL}/products/${productId}`, productData);
  return response.data;
};

export const deleteProduct = async (productId) => {
  const response = await axios.delete(`${BACKEND_URL}/products/${productId}`);
  return response.data;
};