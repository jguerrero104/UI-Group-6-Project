import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import { ThemeContext } from './ThemeContext'; // Import ThemeContext
import { FaCog } from 'react-icons/fa'; // Import FontAwesome icon
import clsx from 'clsx'; // Utility for conditionally joining classNames

function Header() {
  const { user, logout } = useContext(AuthContext);
  const { useGradients, toggleGradients } = useContext(ThemeContext); // Access theme context
  const [fontSize, setFontSize] = useState('text-base'); // Default Tailwind font size
  const [showDropdown, setShowDropdown] = useState(false); // State to toggle dropdown
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleFontSizeChange = (size) => {
    setFontSize(size); // Update state with new font size
    document.documentElement.classList.remove('text-sm', 'text-base', 'text-lg');
    document.documentElement.classList.add(size); // Apply class globally
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

          {/* Dropdown Menu */}
          <div className="relative">
            <button
              onClick={() => setShowDropdown((prev) => !prev)}
              className="text-white hover:text-yellow-300 p-2"
            >
              <FaCog size={20} />
            </button>
            {showDropdown && (
              <div className="absolute right-0 mt-2 bg-white shadow-md rounded-lg p-2">
                <p className="text-gray-800 font-bold mb-2">Settings</p>

                {/* Font Size Options */}
                <p className="text-gray-800 font-semibold">Font Size</p>
                <button
                  onClick={() => handleFontSizeChange('text-sm')}
                  className={clsx(
                    'block w-full text-left px-4 py-2',
                    fontSize === 'text-sm' ? 'bg-gray-200' : '',
                    'hover:bg-gray-100'
                  )}
                >
                  Small
                </button>
                <button
                  onClick={() => handleFontSizeChange('text-base')}
                  className={clsx(
                    'block w-full text-left px-4 py-2',
                    fontSize === 'text-base' ? 'bg-gray-200' : '',
                    'hover:bg-gray-100'
                  )}
                >
                  Medium
                </button>
                <button
                  onClick={() => handleFontSizeChange('text-lg')}
                  className={clsx(
                    'block w-full text-left px-4 py-2',
                    fontSize === 'text-lg' ? 'bg-gray-200' : '',
                    'hover:bg-gray-100'
                  )}
                >
                  Large
                </button>

                <hr className="my-2 border-gray-300" />

                {/* Gradient Toggle */}
                <button
                  onClick={toggleGradients}
                  className={`block w-full text-left px-4 py-2 ${
                    useGradients ? 'bg-blue-200' : 'bg-gray-200'
                  } hover:bg-gray-100`}
                >
                  {useGradients ? 'Disable Gradients' : 'Enable Gradients'}
                </button>
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Header;
