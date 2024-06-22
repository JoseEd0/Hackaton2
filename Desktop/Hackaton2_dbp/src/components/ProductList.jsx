import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../AuthContext'; 

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [lastKey, setLastKey] = useState(null);
  const { authToken } = useAuth();

  const fetchProducts = async () => {
    const response = await axios.get(`https://cepnq6rjbk.execute-api.us-east-1.amazonaws.com/items?limit=10&lastKey=${lastKey}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    setProducts([...products, ...response.data.items]);
    setLastKey(response.data.lastKey);
  };

  useEffect(() => {
    fetchProducts();
  }, [lastKey]);

  return (
    <div>
      {products.map((product) => (
        <div key={product.ansi}>
          <img src={product.imgUrl} alt={product.title} />
          <h3>{product.title}</h3>
          <p>${product.price}</p>
          {/* Más detalles del producto */}
        </div>
      ))}
      <button onClick={() => fetchProducts()}>Cargar más</button>
    </div>
  );
};

export default ProductList;