import React, { createContext, useState, useEffect, useContext } from 'react';

// Create a context for authentication 
export const AuthContext = createContext();

// AuthProvider component to provide context value
export const AuthProvider = ({ children }) => {
  // The user state (null if not logged in)
  const [user, setUser] = useState(null); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem("authToken");
    const userEmail = localStorage.getItem("userEmail");
    
    if (token && userEmail) {
      // Set user data from localStorage
      setUser({ 
        email: userEmail,
        token 
      });
    }
    setLoading(false);
  }, []);

  const login = (userData) => {
    // Store user data and token in localStorage
    localStorage.setItem("authToken", userData.token);
    localStorage.setItem("userEmail", userData.email);
    setUser({
      email: userData.email,
      token: userData.token
    });
  };

  const logout = () => {
    // Clear user data from state
    setUser(null); 
    
    // Remove auth data from localStorage
    localStorage.removeItem("authToken");
    localStorage.removeItem("userEmail");
    
    // Optional: clear other user-specific data
    localStorage.removeItem('cart');
    localStorage.removeItem('wishlist');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use AuthContext in components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};