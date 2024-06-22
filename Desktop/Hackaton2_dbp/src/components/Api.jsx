import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

const ApiContext = createContext();

const API_BASE_URL = 'https://cepnq6rjbk.execute-api.us-east-1.amazonaws.com/';

export const ApiProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(null);

  const register = async (username, password, role) => {
    try {
      const response = await axios.post(`${API_BASE_URL}auth/register`, {
        username,
        password,
        role,
      });
      return response.data;
    } catch (error) {
      console.error('Error al registrar usuario', error);
      throw error;
    }
  };

  const login = async (username, password) => {
    try {
      const response = await axios.post(`${API_BASE_URL}auth/login`, {
        username,
        password,
      });
      setAuthToken(response.data.token);
      return response.data;
    } catch (error) {
      console.error('Error al iniciar sesión', error);
      throw error;
    }
  };

  const addToCart = async (itemId, userId) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}cart`,
        { itemId, userId },
        { headers: { Authorization: `Bearer ${authToken}` } }
      );
      return response.data;
    } catch (error) {
      console.error('Error al agregar al carrito', error);
      throw error;
    }
  };

  const getCart = async (userId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}cart/${userId}`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      return response.data;
    } catch (error) {
      console.error('Error al obtener el carrito', error);
      throw error;
    }
  };

  return (
    <ApiContext.Provider value={{ register, login, addToCart, getCart, authToken, setAuthToken }}>
      {children}
    </ApiContext.Provider>
  );
};

export const useApi = () => useContext(ApiContext);