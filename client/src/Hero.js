import React from 'react';
import { useNavigate } from 'react-router-dom';

function Hero() {
  const navigate = useNavigate(); // Initialize navigate function

  // Handle button click to navigate to the products page
  const handleShopNowClick = () => {
    navigate('/products'); // Navigate to /products
  };

  return (
    <section className="bg-gradient-to-r from-indigo-600 via-blue-500 to-teal-400 text-white py-20">
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
