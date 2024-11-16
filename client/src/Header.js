// src/Header.js
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import { ThemeContext } from './ThemeContext'; // Import ThemeContext

function Header() {
  const { user, logout } = useContext(AuthContext);
  const { useGradients, toggleGradients } = useContext(ThemeContext); // Access theme context
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header
      className={`p-4 ${
        useGradients
          ? 'bg-gradient-to-r from-purple-500 via-pink-500 to-red-500'
          : 'bg-gray-800'
      }`}
    >
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-white text-3xl font-bold">Tech Assure</h1>

        {/* Navigation */}
        <nav className="flex space-x-6 items-center">
          <Link to="/" className="text-white hover:text-yellow-300">Home</Link>
          <Link to="/products" className="text-white hover:text-yellow-300">Products</Link>
          <Link to="/contact" className="text-white hover:text-yellow-300">Contact</Link>
          {user ? (
            <>
              <Link to="/profile" className="text-white hover:text-yellow-300">Profile</Link>
              <Link to="/cart" className="text-white hover:text-yellow-300">Cart</Link>
              <button
                onClick={handleLogout}
                className="text-white hover:text-yellow-300"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="bg-white text-purple-600 px-3 py-1 rounded hover:bg-gray-100"
            >
              Login
            </Link>
          )}

          {/* Gradient Toggle */}
          <button
            onClick={toggleGradients}
            className={`ml-3 px-3 py-1 rounded ${
              useGradients
                ? 'bg-blue-200 text-gray-800 hover:bg-blue-300'
                : 'bg-gray-300 text-gray-800 hover:bg-gray-400'
            }`}
          >
            {useGradients ? 'Disable Gradients' : 'Enable Gradients'}
          </button>
        </nav>
      </div>
    </header>
  );
}

export default Header;
