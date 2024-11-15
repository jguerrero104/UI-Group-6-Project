import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from './api';

function FeaturedProducts() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const productsToShow = 3; // Number of featured products to display

  useEffect(() => {
    // Fetch products from the backend
    const fetchProducts = async () => {
      try {
        const response = await api.get('/products');
        const allProducts = response.data;

        // Shuffle the array and select the first few products
        const shuffledProducts = allProducts.sort(() => 0.5 - Math.random());
        const selectedProducts = shuffledProducts.slice(0, productsToShow);

        setFeaturedProducts(selectedProducts);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <section className="py-12">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-extrabold text-gray-800 mb-8 tracking-tight">
          Featured Products
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredProducts.map((product) => (
            <Link
              key={product._id}
              to={`/product/${product._id}`}
              className="border p-4 rounded shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-78 object-cover rounded mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-900">{product.name}</h3>
              <p className="text-lg font-bold text-blue-600">${product.price}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturedProducts;
