import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

// Crear el contexto de la API
const ApiContext = createContext();

// URL base de la API
const API_BASE_URL = 'https://cepnq6rjbk.execute-api.us-east-1.amazonaws.com/';

// Proveedor del contexto
export const ApiProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(null);

  // Función para registrar un nuevo usuarioñ
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

  // Función para iniciar sesión
  const login = async (username, password) => {
    try {
      const response = await axios.post(`${API_BASE_URL}auth/login`, {
        username,
        password,
      });
      setAuthToken(response.data.token); // Guardar el token de autenticación
      return response.data;
    } catch (error) {
      console.error('Error al iniciar sesión', error);
      throw error;
    }
  };

  // Función para agregar un item al carrito
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

  // Función para obtener el carrito de un usuario
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

  // Exponer las funciones y estados a través del proveedor
  return (
    <ApiContext.Provider value={{ register, login, addToCart, getCart }}>
      {children}
    </ApiContext.Provider>
  );
};

// Hook personalizado para usar el contexto de la API
export const useApi = () => useContext(ApiContext);