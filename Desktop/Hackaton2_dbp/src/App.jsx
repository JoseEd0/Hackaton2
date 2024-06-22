import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './components/Login';
import Register from './components/Register';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<ProtectedRoute component={ProductList} />} />
          <Route path="/product/:id" element={<ProtectedRoute component={ProductDetail} />} />
          {/* Aquí se pueden agregar más rutas protegidas o públicas según sea necesario */}
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;