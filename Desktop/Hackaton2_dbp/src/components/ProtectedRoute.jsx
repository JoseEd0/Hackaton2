import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { authToken } = useAuth();

  return authToken ? <Component {...rest} /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;