import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ProtectedRoute = () => {
  const { isAuthenticated, loading } = useAuth();

  console.log("ProtectedRoute check - isAuthenticated:", isAuthenticated);

  if (loading) {
    console.log("ProtectedRoute - Loading state");
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    console.log("ProtectedRoute - Not authenticated, redirecting to landing page");
    return <Navigate to="/" replace />;
  }

  console.log("ProtectedRoute - Authentication verified, rendering protected content");
  return <Outlet />;
};

export default ProtectedRoute;