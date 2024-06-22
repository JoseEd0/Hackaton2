import React, { useContext, useEffect, useState } from 'react';
import { ApiContext } from './Api';
import { useAuth } from '../AuthContext'; // Asegúrate de actualizar la ruta de importación según corresponda

const Cart = () => {
  const { getCart, removeFromCart, buyCart } = useContext(ApiContext);
  const { userId } = useAuth(); // Obtiene userId del contexto de autenticación
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCart = async () => {
      setLoading(true);
      try {
        const items = await getCart(userId);
        setCartItems(items);
      } catch (error) {
        console.error("Error al obtener el carrito:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [userId]);

  const handleRemoveFromCart = async (itemId) => {
    setLoading(true);
    try {
      await removeFromCart(itemId, userId);
      setCartItems(currentItems => currentItems.filter(item => item.id !== itemId));
    } catch (error) {
      console.error("Error al eliminar del carrito:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleBuyCart = async () => {
    setLoading(true);
    try {
      await buyCart(userId);
      setCartItems([]);
      alert("Compra realizada con éxito");
    } catch (error) {
      console.error("Error al realizar la compra:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <h2>Carrito de Compras</h2>
      {cartItems.length === 0 ? (
        <div>El carrito está vacío</div>
      ) : (
        <ul>
          {cartItems.map((item) => (
            <li key={item.id}>
              {item.name} - {item.price}
              <button onClick={() => handleRemoveFromCart(item.id)}>Eliminar</button>
            </li>
          ))}
        </ul>
      )}
      {cartItems.length > 0 && (
        <button onClick={handleBuyCart}>Comprar Carrito</button>
      )}
    </div>
  );
};

export default Cart;