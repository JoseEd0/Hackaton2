import React, { useState, useEffect } from 'react';
import InfiniteScroll from './InfiniteScroll';
import { useAuth } from '../AuthContext';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [lastKey, setLastKey] = useState(null);
  const { getItems, addToCart } = useAuth;

  const fetchProducts = async () => {
    const response = await getItems(10, lastKey);
    setProducts(prevProducts => [...prevProducts, ...response.items]);
    setLastKey(response.lastKey);
  };

  const handleAddToCart = async (itemId) => {
    await addToCart(itemId);
    alert('Producto añadido al carrito');
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <InfiniteScroll loadMore={fetchProducts} hasMore={lastKey !== null} loader={<div>Cargando...</div>}>
      <div>
        {products.map((product) => (
          <div key={product.id}>
            <img src={product.imgUrl} alt={product.title} />
            <h3>{product.title}</h3>
            <p>${product.price}</p>
            <p>Puntuación: {product.rating}</p>
            <button onClick={() => handleAddToCart(product.id)}>Añadir al Carrito</button>
          </div>
        ))}
      </div>
    </InfiniteScroll>
  );
};

export default ProductList;