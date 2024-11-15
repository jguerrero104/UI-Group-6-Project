// src/components/Products.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [currentPage, setCurrentPage] = useState(1);

  const categories = ['All Categories', 'Headsets', 'Earbuds', 'Keyboards', 'Laptops', 'Mouses', 'Phones'];
  const productsPerPage = 20;

  useEffect(() => {
    // Fetch products from backend
    const fetchProducts = async () => {
      try {
        const response = await api.get('/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    };

    fetchProducts();
  }, []);

  // Filtered, sorted, and searched products
  const filteredProducts = products
    .filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            product.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = categoryFilter === '' || product.category === categoryFilter;
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];

      return matchesSearch && matchesCategory && matchesPrice;
    })
    .sort((a, b) => {
      if (sortOrder === 'lowToHigh') return a.price - b.price;
      if (sortOrder === 'highToLow') return b.price - a.price;
      return 0;
    });

  // Calculate pagination details
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  // Pagination handlers
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to top on page change
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to top on page change
    }
  };

  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to top on page change
  };

  return (
    <div className="container mx-auto mt-10">
      <h2 className="text-3xl font-semibold mb-6">Products</h2>
      
      {/* Search, Filter, and Sort Controls */}
      <div className="flex flex-col md:flex-row justify-between mb-6 space-y-4 md:space-y-0">
        <input 
          type="text"
          placeholder="Search products"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border rounded px-4 py-2 mr-4 flex-grow"
        />

        <select 
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="border rounded px-4 py-2 mr-4"
        >
          {categories.map(category => (
            <option key={category} value={category === 'All Categories' ? '' : category}>
              {category}
            </option>
          ))}
        </select>

        <div className="flex items-center space-x-2">
          <label className="text-sm font-medium">Price: </label>
          <input
            type="number"
            min="0"
            max="2000"
            value={priceRange[0]}
            onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
            className="border rounded w-20 px-2 py-1"
          />
          <span>-</span>
          <input
            type="number"
            min="0"
            max="2000"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
            className="border rounded w-20 px-2 py-1"
          />
        </div>

        <select 
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="border rounded px-4 py-2"
        >
          <option value="">Sort by Price</option>
          <option value="lowToHigh">Price: Low to High</option>
          <option value="highToLow">Price: High to Low</option>
        </select>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {currentProducts.map(product => (
          <Link 
            key={product._id} 
            to={`/product/${product._id}`} 
            className="border p-4 rounded shadow transform transition duration-300 hover:shadow-lg hover:scale-105"
          >
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-30 object-cover rounded mb-4" 
            />
            <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
            <p className="text-gray-700 mb-2">{product.description}</p>
            <p className="text-lg font-bold text-blue-600">${product.price}</p>
          </Link>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center mt-6 mb-6 space-x-2">
        <button 
          onClick={goToPreviousPage} 
          disabled={currentPage === 1} 
          className="px-4 py-1 bg-custom-pink text-white rounded disabled:opacity-50"
        >
          Previous
        </button>
        
        {/* Page Numbers */}
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => goToPage(i + 1)}
            className={`px-4 py-1 ${currentPage === i + 1 ? 'bg-custom-teal text-white' : 'bg-white'} rounded`}
          >
            {i + 1}
          </button>
        ))}

        <button 
          onClick={goToNextPage} 
          disabled={currentPage === totalPages} 
          className="px-4 py-1 bg-custom-pink text-white rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Products;
