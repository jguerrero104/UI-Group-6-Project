// src/components/Cart.js
import React from 'react';
import { useCart } from '../CartContext';
import api from '../api';

const Cart = () => {
  const { cart, removeFromCart, setCart } = useCart();

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleCheckout = async () => {
    const total = calculateTotal();
    const items = cart.map(item => ({
      productId: item._id,
      name: item.name,
      price: item.price,
      quantity: item.quantity
    }));

    try {
      const response = await api.post('/orders/checkout', { items, total });
      alert(response.data.message); // Show a success message
      setCart([]); // Clear the cart after purchase
    } catch (error) {
      console.error('Checkout failed:', error);
      alert('Failed to complete purchase. Please try again.');
    }
  };

  return (
    <div className="container mx-auto mt-10">
      <h2 className="text-3xl font-semibold mb-6">Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <div className="grid gap-6">
            {cart.map(item => (
              <div key={item._id} className="border p-4 rounded shadow flex items-center">
                <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded mr-4" />
                <div className="flex-1">
                  <h3 className="text-xl font-semibold">{item.name}</h3>
                  <p className="text-gray-700">Quantity: {item.quantity}</p>
                  <p className="text-blue-600 font-bold">${item.price * item.quantity}</p>
                </div>
                <button 
                  onClick={() => removeFromCart(item._id)} 
                  className="text-red-500 hover:underline ml-4"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="mt-6 text-xl font-semibold">
            Total: ${calculateTotal()}
          </div>

          {/* Buy Now Button */}
          <button 
            onClick={handleCheckout}
            className="mt-6 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Buy Now
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
