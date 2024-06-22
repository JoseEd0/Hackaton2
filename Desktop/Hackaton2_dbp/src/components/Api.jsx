import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

export const ApiContext = React.createContext();


const API_BASE_URL = 'https://cepnq6rjbk.execute-api.us-east-1.amazonaws.com/';

export const ApiProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(null);

  const fetchConfig = () => ({
    headers: { Authorization: `Bearer ${authToken}` },
  });

  const createItem = async (itemData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}item`, itemData, fetchConfig());
      return response.data;
    } catch (error) {
      console.error('Error al crear el item', error);
      throw error;
    }
  };

  const editItem = async (itemData) => {
    try {
      const response = await axios.put(`${API_BASE_URL}item`, itemData, fetchConfig());
      return response.data;
    } catch (error) {
      console.error('Error al editar el item', error);
      throw error;
    }
  };

  const deleteItem = async (itemId) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}item/${itemId}`, fetchConfig());
      return response.data;
    } catch (error) {
      console.error('Error al eliminar el item', error);
      throw error;
    }
  };

  const getItem = async (itemId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}item/${itemId}`, fetchConfig());
      return response.data;
    } catch (error) {
      console.error('Error al obtener el item', error);
      throw error;
    }
  };

  const getItems = async (limit, lastKey = null) => {
    try {
      const response = await axios.get(`${API_BASE_URL}items`, {
        params: { limit, lastKey },
      });
      return response.data;
    } catch (error) {
      console.error('Error al obtener los items', error);
      throw error;
    }
  };

  const buyCart = async (userId) => {
    try {
      const response = await axios.post(`${API_BASE_URL}buy`, { userId }, fetchConfig());
      return response.data;
    } catch (error) {
      console.error('Error al realizar la compra', error);
      throw error;
    }
  };

  const addToCart = async (itemId, userId) => {
    try {
      const response = await axios.put(
        `${API_BASE_URL}cart`,
        { itemId, userId },
        fetchConfig()
      );
      return response.data;
    } catch (error) {
      console.error('Error al agregar al carrito', error);
      throw error;
    }
  };

  const removeFromCart = async (itemId, userId) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}cart`, {
        data: { itemId, userId },
        ...fetchConfig(),
      });
      return response.data;
    } catch (error) {
      console.error('Error al eliminar del carrito', error);
      throw error;
    }
  };

  const getCart = async (userId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}cart/${userId}`, fetchConfig());
      return response.data;
    } catch (error) {
      console.error('Error al obtener el carrito', error);
      throw error;
    }
  };
  const checkoutCart = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}checkout`, {}, fetchConfig());
      return response.data;
    } catch (error) {
      console.error('Error al realizar el checkout', error);
      throw error;
    }
  };

  return (
    <ApiContext.Provider
      value={{
        createItem,
        editItem,
        deleteItem,
        getItem,
        getItems,
        buyCart,
        addToCart,
        removeFromCart,
        getCart,
        authToken,
        checkoutCart,
        setAuthToken,
      }}
    >
      {children}
    </ApiContext.Provider>
  );
};

export const  useAuth = () => {
  return useContext(AuthContext);
}