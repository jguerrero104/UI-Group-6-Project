// src/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import api from './api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Load user profile data based on the token in localStorage
  const loadUser = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const response = await api.get('/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data);
      } catch (error) {
        console.error('Failed to load user:', error);
        setUser(null);
      }
    }
  };

  // Login function that sets the token and loads the user profile
  const login = async (email, password) => {
    try {
      const response = await api.post('/login', { email, password });
      localStorage.setItem('token', response.data.token);
      
      // Load user data immediately after setting token
      await loadUser(); // Ensure user data is loaded and state is updated
    } catch (error) {
      console.error('Login failed:', error);
      throw error; // propagate error to show messages in the component
    }
  };

  // Logout function that clears user and token
  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  // Load user on initial app load (if token exists in localStorage)
  useEffect(() => {
    loadUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
