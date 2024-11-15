// src/components/ProductDetail.js
import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../CartContext'; // Import useCart
import { AuthContext } from '../AuthContext'; // Import AuthContext
import api from '../api';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart(); // Destructure addToCart from useCart
  const { user } = useContext(AuthContext); // Access user from AuthContext
  const navigate = useNavigate(); // Initialize navigate for redirection

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(`/products/${id}`);
        setProduct(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch product details:', error);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (user) {
      // User is logged in, add product to cart
      addToCart(product);
      alert(`Added ${product.name} to the cart!`);
    } else {
      // User is not logged in, redirect to login
      navigate('/login');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!product) return <div>Product not found</div>;

  return (
    <div className="container mx-auto mt-10">
      <div className="flex flex-col md:flex-row items-center md:items-start">
        <img src={product.image} alt={product.name} className="w-full md:w-1/2 h-auto object-cover rounded mb-4 md:mb-0 md:mr-8" />
        <div className="flex-1">
          <h2 className="text-3xl font-semibold mb-2">{product.name}</h2>
          <p className="text-xl text-gray-700 mb-4">${product.price}</p>
          <p className="text-gray-700 mb-6">{product.description}</p>
          <button 
            onClick={handleAddToCart} 
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
