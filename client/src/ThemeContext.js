// src/ThemeContext.js
import React, { createContext, useState } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [useGradients, setUseGradients] = useState(true); // Default to gradients on

  const toggleGradients = () => setUseGradients((prev) => !prev);

  return (
    <ThemeContext.Provider value={{ useGradients, toggleGradients }}>
      {children}
    </ThemeContext.Provider>
  );
};
