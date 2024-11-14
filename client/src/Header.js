// src/Header.js
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

function Header() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-3xl font-bold">"Placeholder"</h1>
        <nav>
          <ul className="flex space-x-4">
            <li><Link to="/" className="text-white hover:text-yellow-300">Home</Link></li>
            <li><Link to="/products" className="text-white hover:text-yellow-300">Products</Link></li>
            <li><Link to="/contact" className="text-white hover:text-yellow-300">Contact</Link></li>
            {user ? (
              <>
                <li><Link to="/profile" className="text-white hover:text-yellow-300">Profile</Link></li>
                <li><Link to="/cart" className="text-white hover:text-yellow-300">Cart</Link></li>
                <li><button onClick={handleLogout} className="text-white hover:text-yellow-300">Logout</button></li>
              </>
            ) : (
              <li>
                <Link to="/login" className="bg-white text-purple-600 px-3 py-1 rounded hover:bg-gray-100">
                  Login
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
