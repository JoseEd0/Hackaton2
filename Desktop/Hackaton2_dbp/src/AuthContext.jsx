import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

// Crear el contexto de autenticación
const AuthContext = createContext();

// URL base de la API para autenticación
const AUTH_API_URL = 'https://cepnq6rjbk.execute-api.us-east-1.amazonaws.com/auth/';

// Proveedor del contexto de autenticación
export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(null);
  const [user, setUser] = useState(null);

  // Función para iniciar sesión
  const login = async (username, password) => {
    try {
      const response = await axios.post(`${AUTH_API_URL}login`, {
        username,
        password,
      });
      setAuthToken(response.data.token); // Guardar el token de autenticación
      setUser({ username }); // Guardar datos del usuario
      return response.data;
    } catch (error) {
      console.error('Error al iniciar sesión', error);
      throw error;
    }
  };

  // Función para cerrar sesión
  const logout = () => {
    setAuthToken(null); // Eliminar el token de autenticación
    setUser(null); // Eliminar datos del usuario
  };

  // Función para registrar un nuevo usuario
  const register = async (username, password, role) => {
    try {
      const response = await axios.post(`${AUTH_API_URL}register`, {
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

  // Exponer las funciones y estados a través del proveedor
  return (
    <AuthContext.Provider value={{ authToken, user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para usar el contexto de autenticación
export const useAuth = () => useContext(AuthContext);