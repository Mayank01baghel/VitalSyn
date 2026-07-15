import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children }) {
  const { currentUser } = useAuth();

  // If we are using the mock config and don't have a user, 
  // we might want to bypass protection for testing.
  // But for "real life", we strictly enforce authentication:
  if (!currentUser) {
    // If there is no signed-in user, redirect to the login page.
    return <Navigate to="/login" replace />;
  }

  return children;
}
