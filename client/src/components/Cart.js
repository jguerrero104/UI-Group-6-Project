import React, { useState } from 'react';
import { useCart } from '../CartContext';
import api from '../api';
import { toast } from 'react-toastify';

const Cart = () => {
  const { cart, removeFromCart, setCart } = useCart();
  const [showModal, setShowModal] = useState(false);
  const [address, setAddress] = useState({
    fullName: '',
    street: '',
    city: '',
    state: '',
    zip: '',
    country: '',
  });
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleRemoveFromCart = (itemId) => {
    removeFromCart(itemId);
    toast.info('Item removed from cart!', { position: 'top-center', autoClose: 2000 });
  };

  const handleCheckout = async (e) => {
    e.preventDefault();
  
    const total = calculateTotal();
    const items = cart.map((item) => ({
      productId: item._id,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
    }));
  
    try {
      const token = localStorage.getItem('token'); // Retrieve token from localStorage
      if (!token) {
        toast.error('You need to be logged in to complete the checkout.', { position: 'top-center', autoClose: 2000 });
        return;
      }
  
      const response = await api.post('/orders/checkout', { items, total, address }, {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in headers
        },
      });
  
      toast.success('Purchase completed successfully!', { position: 'top-center', autoClose: 2000 });
      setCart([]); // Clear the cart
      setShowModal(false); // Close modal
    } catch (error) {
      console.error('Checkout failed:', error);
      toast.error('Failed to complete purchase. Please try again.', { position: 'top-center', autoClose: 2000 });
    }
  };
  

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({ ...prev, [name]: value }));
  };

  const handleCardDetailsChange = (e) => {
    const { name, value } = e.target;
    setCardDetails((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="container mx-auto mt-10">
      <h2 className="text-3xl font-semibold mb-6" id="cart-heading">
        Your Cart
      </h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <div className="grid gap-6" role="list" aria-labelledby="cart-heading">
            {cart.map((item) => (
              <div
                key={item._id}
                className="border p-4 rounded shadow flex items-center"
                role="listitem"
              >
                <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded mr-4" />
                <div className="flex-1">
                  <h3 className="text-xl font-semibold">{item.name}</h3>
                  <p className="text-gray-700">Quantity: {item.quantity}</p>
                  <p className="text-blue-600 font-bold">${item.price * item.quantity}</p>
                </div>
                <button
                  onClick={() => removeFromCart(item._id)}
                  className="text-red-500 hover:underline ml-4"
                  aria-label={`Remove ${item.name} from cart`}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <div className="mt-6 text-xl font-semibold">Total: ${calculateTotal()}</div>

          <button
            onClick={() => setShowModal(true)} // Show modal for checkout
            className="mt-6 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Buy Now
          </button>
        </div>
      )}

      {/* Modal for Checkout */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h3 className="text-2xl font-semibold mb-4">Checkout</h3>
            <form onSubmit={handleCheckout}>
              {/* Address Fields */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={address.fullName}
                  onChange={handleAddressChange}
                  className="border rounded w-full px-3 py-2"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Street Address</label>
                <input
                  type="text"
                  name="street"
                  value={address.street}
                  onChange={handleAddressChange}
                  className="border rounded w-full px-3 py-2"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">City</label>
                <input
                  type="text"
                  name="city"
                  value={address.city}
                  onChange={handleAddressChange}
                  className="border rounded w-full px-3 py-2"
                  required
                />
              </div>
              <div className="mb-4 flex space-x-4">
                <div>
                  <label className="block text-sm font-medium mb-1">State</label>
                  <input
                    type="text"
                    name="state"
                    value={address.state}
                    onChange={handleAddressChange}
                    className="border rounded w-full px-3 py-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">ZIP</label>
                  <input
                    type="text"
                    name="zip"
                    value={address.zip}
                    onChange={handleAddressChange}
                    className="border rounded w-full px-3 py-2"
                    required
                  />
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Country</label>
                <input
                  type="text"
                  name="country"
                  value={address.country}
                  onChange={handleAddressChange}
                  className="border rounded w-full px-3 py-2"
                  required
                />
              </div>

              {/* Card Details */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Card Number</label>
                <input
                  type="text"
                  name="cardNumber"
                  value={cardDetails.cardNumber}
                  onChange={handleCardDetailsChange}
                  className="border rounded w-full px-3 py-2"
                  placeholder="1234 5678 9012 3456"
                  required
                />
              </div>
              <div className="mb-4 flex space-x-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Expiry Date</label>
                  <input
                    type="text"
                    name="expiryDate"
                    value={cardDetails.expiryDate}
                    onChange={handleCardDetailsChange}
                    className="border rounded w-full px-3 py-2"
                    placeholder="MM/YY"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">CVV</label>
                  <input
                    type="text"
                    name="cvv"
                    value={cardDetails.cvv}
                    onChange={handleCardDetailsChange}
                    className="border rounded w-full px-3 py-2"
                    placeholder="123"
                    required
                  />
                </div>
              </div>

              {/* Modal Actions */}
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
