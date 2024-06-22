import React, { useState, useEffect, useContext } from 'react';
import { ApiContext } from './Api'; // Asegúrate de que la ruta sea correcta
import InfiniteScroll from './InfiniteScroll'; // Asegúrate de que la ruta sea correcta
import NavBar from './NavBar'; // Asegúrate de que la ruta sea correcta
import Cart from './Cart'; // Asegúrate de que la ruta sea correcta

const Home = () => {
  const [products, setProducts] = useState([]);
  const [lastKey, setLastKey] = useState(null);
  const { getItems, addToCart } = useContext(ApiContext);

  const fetchProducts = async () => {
    try {
      const response = await getItems(10, lastKey);
      setProducts(prevProducts => [...prevProducts, ...response.items]);
      setLastKey(response.lastKey);
    } catch (error) {
      console.error('Error al obtener los productos', error);
    }
  };

  const handleAddToCart = async (itemId) => {
    try {
      await addToCart(itemId);
      alert('Producto añadido al carrito');
    } catch (error) {
      console.error('Error al añadir al carrito', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <NavBar />
      <InfiniteScroll loadMore={fetchProducts} hasMore={lastKey !== null} loader={<div>Cargando...</div>}>
        <div>
          {products.map((product) => (
            <div key={product.id}>
              <img src={product.imgUrl} alt={product.title} />
              <h3>{product.title}</h3>
              <p>${product.price}</p>
              <button onClick={() => handleAddToCart(product.id)}>Añadir al Carrito</button>
            </div>
          ))}
        </div>
      </InfiniteScroll>
      <Cart />
    </div>
  );
};

export default Home;