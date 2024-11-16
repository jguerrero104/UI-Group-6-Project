import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from './ThemeContext'; // Import ThemeContext

function Hero() {
  const navigate = useNavigate(); // Initialize navigate function
  const { useGradients } = useContext(ThemeContext); // Access gradient state from context

  // Handle button click to navigate to the products page
  const handleShopNowClick = () => {
    navigate('/products'); // Navigate to /products
  };

  return (
    <section
      className={`py-20 text-white ${
        useGradients
          ? 'bg-gradient-to-r from-indigo-600 via-blue-500 to-teal-400'
          : 'bg-gray-700'
      }`}
    >
      <div className="container mx-auto text-center">
        <h2 className="text-5xl mb-4 font-extrabold">Discover the Latest Electronics</h2>
        <p className="text-2xl">Upgrade your tech with the latest gadgets and devices</p>
        
        <button 
          onClick={handleShopNowClick} // Add onClick handler
          className="mt-6 bg-yellow-400 text-gray-800 px-6 py-3 rounded-lg hover:bg-yellow-500"
        >
          Shop Now
        </button>
      </div>
    </section>
  );
}

export default Hero;
