// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect, useContext } from 'react';
import { validateToken, clearAuthData } from '../utils/auth';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check authentication status on mount
  useEffect(() => {
    checkAuthStatus();

    // Also set up a listener for localStorage changes
    window.addEventListener('storage', checkAuthStatus);
    return () => window.removeEventListener('storage', checkAuthStatus);
  }, []);

  const checkAuthStatus = () => {
    console.log("Checking auth status...");
    setLoading(true);

    // Log token for debugging
    const token = localStorage.getItem('authToken');
    console.log("Token exists:", !!token);

    if (validateToken()) {
      console.log("Token is valid, setting authenticated");
      setIsAuthenticated(true);
      setUserName(localStorage.getItem('userName'));
    } else {
      console.log("Token is invalid or missing");
      clearAuthData();
      setIsAuthenticated(false);
      setUserName(null);
    }

    setLoading(false);
  };

  const login = (token, name, email) => {
    localStorage.setItem('authToken', token);
    localStorage.setItem('userName', name || '');
    localStorage.setItem('userEmail', email || '');
    checkAuthStatus();
  };

  const logout = () => {
    // Clear auth data with the utility function
    clearAuthData();

    // Clear all application-specific localStorage items
    const itemsToClear = [
      'ally-supports-cache',
      'chatHistoryPath',
      'interviewDone',
      'interviewQuestions',
      'lk-user-choices',
      'paymentCompleted',
      'userEmail',
      'userName',
      'authToken'
    ];

    itemsToClear.forEach(item => localStorage.removeItem(item));

    // Reset authentication state
    setIsAuthenticated(false);
    setUserName(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        userName,
        loading,
        checkAuthStatus,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);