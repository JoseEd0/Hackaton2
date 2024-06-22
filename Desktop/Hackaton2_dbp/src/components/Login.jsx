import React, { useState } from 'react';
import { useAuth } from "../AuthContext"; // Importa useAuth en lugar de useApi
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth(); // Utiliza login de useAuth
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(username, password);
      alert('Inicio de sesión exitoso');
      navigate('/home');
    } catch (error) {
      alert('Error al iniciar sesión');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nombre de usuario"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Iniciar sesión</button>
    </form>
  );
};

export default Login;