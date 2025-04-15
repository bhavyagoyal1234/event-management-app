import { useUser } from '@/context/userContext';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const ProtectedRoute = ({ element: Component, ...rest }) => {
  const navigate = useNavigate();
  const {isLoggedIn} = useUser();

  useEffect(() => {
    console.log("myevents", isLoggedIn);
    if(!isLoggedIn){
      toast.error('Please log in to access this page');
      navigate('/login');
    }
  }, [isLoggedIn])

  if(!isLoggedIn){
    return;
  }

  return <Component {...rest} />;
};

export default ProtectedRoute;