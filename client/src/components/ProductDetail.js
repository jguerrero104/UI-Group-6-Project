import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../CartContext';
import { AuthContext } from '../AuthContext';
import { toast } from 'react-toastify';
import api from '../api';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1); // State for quantity
  const [itemAdded, setItemAdded] = useState(false); // State to show "Go to Cart" button
  const { addToCart } = useCart();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

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
      addToCart({ ...product, quantity });
      setItemAdded(true); // Show the "Go to Cart" button
      toast.success(`${product.name} (x${quantity}) added to your cart!`, {
        position: 'top-center',
        autoClose: 2000,
      });
    } else {
      toast.warn('You must log in to add items to the cart!', {
        position: 'top-center',
        autoClose: 2000,
      });
      navigate('/login');
    }
  };

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setQuantity(value > 0 ? value : 1);
  };

  if (loading) return <div>Loading...</div>;
  if (!product) return <div>Product not found</div>;

  return (
    <div className="container mx-auto mt-10">
      <div className="flex flex-col md:flex-row items-center md:items-start">
        <img
          src={product.image}
          alt={product.name}
          className="w-full md:w-1/2 h-auto object-cover rounded mb-4 md:mb-0 md:mr-8"
        />
        <div className="flex-1">
          <h2 className="text-3xl font-semibold mb-2">{product.name}</h2>
          <p className="text-xl text-gray-700 mb-4">${product.price}</p>
          <p className="text-gray-700 mb-6">{product.description}</p>

          {/* Quantity Selector */}
          <div className="flex items-center mb-6">
            <label htmlFor="quantity" className="mr-4 text-gray-700">
              Quantity:
            </label>
            <input
              type="number"
              id="quantity"
              min="1"
              value={quantity}
              onChange={handleQuantityChange}
              className="w-16 border border-gray-300 rounded px-2 py-1 text-center"
            />
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mr-4"
          >
            Add to Cart
          </button>

          {/* Go to Cart Button */}
          {itemAdded && (
            <button
              onClick={() => navigate('/cart')}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Go to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
