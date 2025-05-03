import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * Component wrapper that protects routes requiring authentication
 */
function RequireAuth({ children }) {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    if (!loading && !user) {
      console.log("User not authenticated, redirecting to login");
      // Store the current path for after login
      localStorage.setItem("authRedirectPath", location.pathname);
      navigate('/login');
    }
  }, [user, loading, navigate, location.pathname]);
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <div className="text-xl text-gray-600">Loading...</div>
        </div>
      </div>
    );
  }
  
  return user ? children : null;
}

export default RequireAuth;