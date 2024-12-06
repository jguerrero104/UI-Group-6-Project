import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../AuthContext';
import api from '../api'; // Axios or fetch wrapper

const Profile = () => {
  const { user, updateEmail, updatePassword } = useContext(AuthContext);
  const [email, setEmail] = useState(user?.email || '');
  const [emailConfirmation, setEmailConfirmation] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [activeSection, setActiveSection] = useState(null); // Tracks which section is open
  const [orders, setOrders] = useState([]); // Store order history
  const [loadingOrders, setLoadingOrders] = useState(true); // Loading indicator for orders

  useEffect(() => {
    const fetchOrderHistory = async () => {
      try {
        const response = await api.get('/orders/history', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setOrders(response.data);
        setLoadingOrders(false);
      } catch (error) {
        console.error('Failed to fetch order history:', error);
        setLoadingOrders(false);
      }
    };

    if (user) fetchOrderHistory();
  }, [user]);

  const handleDeleteOrderHistory = async () => {
    if (!window.confirm('Are you sure you want to delete your entire order history?')) {
      return;
    }

    try {
      await api.delete('/orders/history', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setOrders([]); // Clear orders from state
      alert('Order history deleted successfully.');
    } catch (error) {
      console.error('Failed to delete order history:', error);
    }
  };

  const handleEmailChange = async (e) => {
    e.preventDefault();
    setEmailError('');
    setSuccessMessage('');

    if (email !== emailConfirmation) {
      setEmailError('Emails do not match.');
      return;
    }

    try {
      await updateEmail(email);
      setSuccessMessage('Email updated successfully.');
    } catch (error) {
      setEmailError(error.response?.data?.error || 'Failed to update email.');
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setPasswordError('');
    setSuccessMessage('');

    if (newPassword !== confirmPassword) {
      setPasswordError('Passwords do not match.');
      return;
    }

    try {
      await updatePassword(oldPassword, newPassword);
      setSuccessMessage('Password updated successfully.');
    } catch (error) {
      setPasswordError(error.response?.data?.error || 'Failed to update password.');
    }
  };

  const toggleSection = (section) => {
    setActiveSection(activeSection === section ? null : section);
  };

  return (
    <div className="container mx-auto mt-12 px-4">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-3xl mx-auto">
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-8">Profile</h2>

        {user ? (
          <>
            <div className="text-center mb-8">
              <p className="text-lg font-semibold text-gray-700">Welcome, {user.name}!</p>
              <p className="text-gray-500">
                <strong>Email:</strong> {user.email}
              </p>
            </div>

            {/* Order History Section */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Order History</h3>
              {loadingOrders ? (
                <p className="text-gray-500">Loading orders...</p>
              ) : orders.length === 0 ? (
                <p className="text-gray-500">You have no orders yet.</p>
              ) : (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div
                      key={order._id}
                      className="border border-gray-200 rounded-lg p-4 shadow-sm"
                    >
                      <h4 className="text-xl font-medium text-gray-700">
                        Order ID: {order._id}
                      </h4>
                      <p className="text-sm text-gray-500">
                        Date: {new Date(order.date).toLocaleDateString()}
                      </p>
                      <p className="text-sm text-gray-500">
                        Total: ${order.total.toFixed(2)}
                      </p>
                      <ul className="list-disc list-inside mt-2 text-gray-600">
                        {order.items.map((item) => (
                          <li key={item.productId}>
                            {item.name} (x{item.quantity}) - ${item.price.toFixed(2)}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                  <button
                    onClick={handleDeleteOrderHistory}
                    className="bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg px-4 py-2"
                  >
                    Delete Order History
                  </button>
                </div>
              )}
            </div>

            {/* Change Email Section */}
            <div className="mb-6">
              <button
                onClick={() => toggleSection('email')}
                className="w-full text-left bg-blue-600 text-white font-medium rounded-lg px-4 py-2 hover:bg-blue-700 transition"
              >
                {activeSection === 'email' ? 'Hide Change Email' : 'Change Email'}
              </button>
              {activeSection === 'email' && (
                <form onSubmit={handleEmailChange} className="mt-4 border rounded-lg p-4 shadow-sm">
                  <h3 className="text-xl font-semibold mb-4 text-gray-800">Change Email</h3>
                  {/* Email Fields */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">New Email</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                      placeholder="Enter new email"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Email</label>
                    <input
                      type="email"
                      value={emailConfirmation}
                      onChange={(e) => setEmailConfirmation(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                      placeholder="Confirm new email"
                      required
                    />
                  </div>
                  {emailError && <p className="text-red-500 text-sm mb-4">{emailError}</p>}
                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white font-medium rounded-lg px-4 py-2 hover:bg-blue-700 transition"
                  >
                    Update Email
                  </button>
                </form>
              )}
            </div>

            {/* Change Password Section */}
            <div className="mb-6">
              <button
                onClick={() => toggleSection('password')}
                className="w-full text-left bg-blue-600 text-white font-medium rounded-lg px-4 py-2 hover:bg-blue-700 transition"
              >
                {activeSection === 'password' ? 'Hide Change Password' : 'Change Password'}
              </button>
              {activeSection === 'password' && (
                <form onSubmit={handlePasswordChange} className="mt-4 border rounded-lg p-4 shadow-sm">
                  <h3 className="text-xl font-semibold mb-4 text-gray-800">Change Password</h3>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Old Password</label>
                    <input
                      type="password"
                      value={oldPassword}
                      onChange={(e) => setOldPassword(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                      placeholder="Enter old password"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                      placeholder="Enter new password"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                      placeholder="Confirm new password"
                      required
                    />
                  </div>
                  {passwordError && <p className="text-red-500 text-sm mb-4">{passwordError}</p>}
                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white font-medium rounded-lg px-4 py-2 hover:bg-blue-700 transition"
                  >
                    Update Password
                  </button>
                </form>
              )}
            </div>

            {/* Success Message */}
            {successMessage && (
              <p className="text-green-500 text-sm mt-6 text-center">{successMessage}</p>
            )}
          </>
        ) : (
          <p className="text-center text-gray-700">Loading profile...</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
