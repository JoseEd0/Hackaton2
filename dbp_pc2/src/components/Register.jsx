import React, { useState } from "react";
import { fetchRegister } from "./api"; 

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await fetchRegister(name, email, password, username);
            alert("Registro exitoso");
        } catch (error) {
            console.error("Fallo en el registro: ", error);
            alert("Fallo en el registro, por favor intente de nuevo.");
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <input
                type="text"
                placeholder="Nombre"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input
                type="email"
                placeholder="Correo Electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <input
                type="text"
                placeholder="Nombre de Usuario"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <button type="submit">Registrar</button>
        </form>
    );
};

export default Register;