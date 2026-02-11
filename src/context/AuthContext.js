// src/context/AuthContext.js (completed)
import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const login = async (phoneNumber) => {
    setLoading(true);
    // Simulate API call for Tunisian phone number authentication
    setTimeout(() => {
      setUser({
        id: '1',
        name: 'Ahmad Ben Ali',
        phone: phoneNumber,
        location: 'Béja, Tunisie',
        farmSize: '5 hectares',
        subscription: 'free', // or 'pro'
      });
      setLoading(false);
    }, 1500);
  };

  const logout = () => {
    setUser(null);
  };

  const upgradeToPro = () => {
    setUser({ ...user, subscription: 'pro' });
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      login, 
      logout, 
      upgradeToPro,
      isPro: user?.subscription === 'pro' 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);