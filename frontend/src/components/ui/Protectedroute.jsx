import React from 'react';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
const ProtectedRoute = ({ element: Component, ...rest }) => {
  const isAuthenticated = () => {
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    return user && token;
  };

  if (!isAuthenticated()) {
    toast.error('Please log in to access this page');
    return <Navigate to="/login" />;
  }

  return <Component {...rest} />;
};

export default ProtectedRoute;