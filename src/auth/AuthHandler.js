// Add this to your main App.js or routing component
import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function AuthHandler() {
    const navigate = useNavigate();
    const location = useLocation();
  
    useEffect(() => {
      const queryParams = new URLSearchParams(location.search);
      const token = queryParams.get('token');
      
      if (token) {
        // Store token in localStorage
        localStorage.setItem('authToken', token);
        console.log('Login successful');
        
        // Navigate to home page and remove token from URL
        navigate('/', { replace: true });
      }
    }, [location, navigate]);
  
    return null; // This component doesn't render anything
  }

export default AuthHandler;