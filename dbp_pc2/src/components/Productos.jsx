import React, { useState, useEffect } from 'react';
import {listProductos} from "./api";
import { useAuth } from '../AuthContext';

const Productos = () => {   
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');
  const { token } = useAuth();

  const fetchProductos = async () => {
    try {
      const data = await listProductos(token); 
      setProductos(data);
      setCargando(false);
    } catch (error) {
      setError('Hubo un error al obtener los productos');
      setCargando(false);
    }
  };

  useEffect(() => {
    fetchProductos();
  }, []);

  if (cargando) return <div>Cargando productos...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Productos</h2>
      {productos.length > 0 ? (
        <ul>
          {productos.map((producto) => (
            <li key={producto.id}>
              <h3>{producto.nombre}</h3>
              <p>{producto.descripcion}</p>
              <p>Precio: ${producto.precio}</p>
              <p>Cantidad: {producto.cantidad}</p>
              <img src={producto.urlImagen} alt={producto.nombre} style={{ width: '100px' }} />
            </li>
          ))}
        </ul>
      ) : (
        <p>No hay productos disponibles.</p>
      )}
    </div>
  );
};

export default Productos;