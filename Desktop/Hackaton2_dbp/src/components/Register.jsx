import React, { useState } from 'react';
import { useAuth } from "../AuthContext"; // Importa useAuth en lugar de useApi

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('client');
  const { register } = useAuth(); // Utiliza register de useAuth

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(username, password, role);
      alert('Registro exitoso');
    } catch (error) {
      alert('Error al registrar');
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
      <select value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="client">Cliente</option>
        <option value="admin">Administrador</option>
      </select>
      <button type="submit">Registrarse</button>
    </form>
  );
};

export default Register;