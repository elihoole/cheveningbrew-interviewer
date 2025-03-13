import React, { createContext, useState, useEffect, useContext } from 'react';
import { validateToken, clearAuthData } from '../utils/auth';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check authentication status on mount and token changes
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = () => {
    setLoading(true);

    // Log current token for debugging
    const token = localStorage.getItem('authToken');
    console.log("Checking auth with token:", token ? "Token exists" : "No token");

    if (validateToken()) {
      console.log("Token validation successful");
      setIsAuthenticated(true);
      setUserName(localStorage.getItem('userName'));
    } else {
      console.log("Token validation failed or no token");
      clearAuthData();
      setIsAuthenticated(false);
      setUserName(null);
    }

    setLoading(false);
  };

  const logout = () => {
    clearAuthData();
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
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);