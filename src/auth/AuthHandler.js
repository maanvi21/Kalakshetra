import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function AuthHandler() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, user } = useAuth();
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(true);
  const [loginAttempted, setLoginAttempted] = useState(false);
     
  // First useEffect: Handle the initial token processing
  useEffect(() => {
    const handleAuthentication = async () => {
      if (loginAttempted) return; // Prevent running multiple times
      
      try {
        console.log("Auth handler triggered, pathname:", location.pathname);
        console.log("Auth handler triggered, search params:", location.search);
                
        const queryParams = new URLSearchParams(location.search);
        const token = queryParams.get('token');
        const email = queryParams.get('email');
                
        // For debugging - remove in production
        console.log("Token received:", token ? "Yes (length: " + token.length + ")" : "No");
        console.log("Email received:", email);
                
        if (token) {
          console.log("Logging in with token and email");
          setLoginAttempted(true);
                    
          // Login with token and email from query parameters
          login({
            token,
            email: email || 'user@example.com' // Fallback if email not provided
          });
                    
          console.log("Login function called, waiting for user state to update");
        } else {
          console.error("No token received in callback URL");
          setError("Authentication failed: No token received");
          setProcessing(false);
          // Wait 3 seconds before redirecting to login
          setTimeout(() => {
            navigate('/login', { replace: true });
          }, 3000);
        }
      } catch (err) {
        console.error("Authentication error:", err);
        setError(`Authentication error: ${err.message}`);
        setProcessing(false);
        // Wait 3 seconds before redirecting to login
        setTimeout(() => {
          navigate('/login', { replace: true });
        }, 3000);
      }
    };
        
    handleAuthentication();
  }, [location, navigate, login, loginAttempted]);

  // Second useEffect: Handle navigation after user state is updated
  useEffect(() => {
    if (loginAttempted && user) {
      console.log("User state updated, navigating now");
      
      // Check if there's a stored redirect path from before login
      const redirectPath = localStorage.getItem("authRedirectPath");
      const targetPath = redirectPath || '/';
      
      // Clear the stored redirect path
      if (redirectPath) {
        localStorage.removeItem("authRedirectPath");
      }
      
      // Navigate now that user is logged in
      navigate(targetPath, { replace: true });
    }
  }, [user, loginAttempted, navigate]);

  // Only show loading/error states - no success state
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full">
        {processing && !error ? (
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <div className="text-xl text-gray-600">Authenticating...</div>
            <div className="text-sm text-gray-500 mt-2">Please wait while we log you in</div>
          </div>
        ) : error ? (
          <div className="text-center">
            <div className="text-red-500 mb-4">{error}</div>
            <div className="text-gray-600">Redirecting to login page...</div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default AuthHandler;