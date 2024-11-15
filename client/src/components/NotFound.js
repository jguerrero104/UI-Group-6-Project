// src/components/NotFound.js
import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="container mx-auto text-center py-20">
      <h1 className="text-5xl font-bold mb-6">404</h1>
      <p className="text-2xl mb-4">Page Not Found</p>
      <Link to="/" className="text-blue-600 hover:underline">
        Go Back Home
      </Link>
    </div>
  );
}

export default NotFound;
