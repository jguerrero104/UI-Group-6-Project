// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Header';
import Home from './components/Home'; // Consolidated Hero and FeaturedProducts into Home
import Products from './components/Products';
import ProductDetail from './components/ProductDetail';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import Cart from './components/Cart';
import NotFound from './components/NotFound'; // Optional: Add a 404 Not Found component
import { ToastContainer } from 'react-toastify'; // Import ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Import Toast styles
import { ThemeProvider } from './ThemeContext'; // Import ThemeProvider

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="App">
          <Header />
          {/* ToastContainer to enable toast notifications */}
          <ToastContainer 
            position="top-center" 
            autoClose={3000} 
            hideProgressBar={false} 
            newestOnTop={false} 
            closeOnClick 
            rtl={false} 
            pauseOnFocusLoss 
            draggable 
            pauseOnHover 
          />
          <Routes>
            <Route path="/" element={<Home />} /> {/* Home route */}
            <Route path="/products" element={<Products />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="*" element={<NotFound />} /> {/* 404 route */}
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
