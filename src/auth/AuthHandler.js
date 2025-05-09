import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function AuthHandler() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(true);
  
  useEffect(() => {
    const handleAuthentication = async () => {
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
          
          // Login with token and email from query parameters
          login({
            token,
            email: email || 'user@example.com' // Fallback if email not provided
          });
          
          console.log("Login function called, preparing to navigate to home");
          
          // Short delay to ensure login state is updated
          setTimeout(() => {
            console.log("Navigating to home page");
            // Navigate to home page and replace URL to remove token
            navigate('/', { replace: true });
          }, 1000); // Increased to 1 second to ensure login state is updated
        } else {
          console.error("No token received in callback URL");
          setError("Authentication failed: No token received");
          // Wait 3 seconds before redirecting to login
          setTimeout(() => {
            navigate('/login', { replace: true });
          }, 3000);
        }
      } catch (err) {
        console.error("Authentication error:", err);
        setError(`Authentication error: ${err.message}`);
        // Wait 3 seconds before redirecting to login
        setTimeout(() => {
          navigate('/login', { replace: true });
        }, 3000);
      } finally {
        setProcessing(false);
      }
    };
    
    handleAuthentication();
  }, [location, navigate, login]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full">
        {processing ? (
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
        ) : (
          <div className="text-center">
            <div className="text-green-500 mb-4">Authentication successful!</div>
            <div className="text-gray-600">Redirecting to home page...</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AuthHandler;