import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function AdminRoute({ children }) {
  const { currentUser } = useAuth();

  if (!currentUser) {
    // If not logged in at all, go to login
    return <Navigate to="/login" replace />;
  }

  // Restrict to the specific admin account
  if (currentUser.email !== 'admin@admin.com') {
    // If not admin, go to dashboard
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}
