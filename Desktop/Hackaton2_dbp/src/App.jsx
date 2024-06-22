import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './components/Login';
import Register from './components/Register';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import Home from './components/Home'; // Asegúrate de que la ruta sea correcta

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<ProtectedRoute component={ProductList} />} />
          <Route path="/product/:id" element={<ProtectedRoute component={ProductDetail} />} />
          <Route path="/home" element={<ProtectedRoute component={Home} />} /> {/* Ruta agregada para Home */}
          {/* Aquí se pueden agregar más rutas protegidas o públicas según sea necesario */}
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;