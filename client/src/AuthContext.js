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
      await loadUser(); // Load user data immediately after setting token
    } catch (error) {
      console.error('Login failed:', error);
      throw error; // Propagate error to show messages in the component
    }
  };

  // Logout function that clears user and token
  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  // Update email
  const updateEmail = async (newEmail) => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('User not authenticated');
    
    try {
      const response = await api.put(
        '/update-email',
        { newEmail, confirmEmail: newEmail },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      await loadUser(); // Reload user data to reflect the new email
      return response.data.message;
    } catch (error) {
      console.error('Failed to update email:', error);
      throw error;
    }
  };

  // Update password
  const updatePassword = async (oldPassword, newPassword) => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('User not authenticated');
    
    try {
      const response = await api.put(
        '/update-password',
        { oldPassword, newPassword, confirmPassword: newPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data.message;
    } catch (error) {
      console.error('Failed to update password:', error);
      throw error;
    }
  };

  // Load user on initial app load (if token exists in localStorage)
  useEffect(() => {
    loadUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, updateEmail, updatePassword }}>
      {children}
    </AuthContext.Provider>
  );
};
