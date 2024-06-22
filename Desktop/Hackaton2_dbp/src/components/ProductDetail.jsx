import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../AuthContext'; 

const ProductDetail = () => {
  const [product, setProduct] = useState({});
  const { id } = useParams();
  const { authToken } = useAuth();

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await axios.get(`https://cepnq6rjbk.execute-api.us-east-1.amazonaws.com/item/${id}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      setProduct(response.data);
    };

    fetchProduct();
  }, [id, authToken]);

  return (
    <div>
      <img src={product.imgUrl} alt={product.title} />
      <h2>{product.title}</h2>
      <p>${product.price}</p>
      {/* Más detalles del producto */}
    </div>
  );
};

export default ProductDetail;