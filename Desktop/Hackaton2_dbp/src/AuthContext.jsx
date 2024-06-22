import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();


const AUTH_API_URL = 'https://cepnq6rjbk.execute-api.us-east-1.amazonaws.com/auth/';


export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(null);
  const [user, setUser] = useState(null);


  const login = async (username, password) => {
    try {
      const response = await axios.post(`${AUTH_API_URL}login`, {
        username,
        password,
      });
      setAuthToken(response.data.token); 
      setUser({ username }); 
      return response.data;
    } catch (error) {
      console.error('Error al iniciar sesión', error);
      throw error;
    }
  };

 
  const logout = () => {
    setAuthToken(null); 
    setUser(null); 
  };


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


  return (
    <AuthContext.Provider value={{ authToken, user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => useContext(AuthContext);