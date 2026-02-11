// src/context/ThemeContext.js - Theme Management
import React, { createContext, useState, useContext } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const theme = {
    colors: {
      primary: '#1B5E20',
      secondary: '#4CAF50',
      accent: '#FF9800',
      background: isDarkMode ? '#121212' : '#F5F5F5',
      surface: isDarkMode ? '#1E1E1E' : '#FFFFFF',
      text: isDarkMode ? '#FFFFFF' : '#333333',
      textSecondary: isDarkMode ? '#B0B0B0' : '#666666',
      border: isDarkMode ? '#333333' : '#E0E0E0',
    },
    isDarkMode,
    toggleTheme: () => setIsDarkMode(!isDarkMode),
  };

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);