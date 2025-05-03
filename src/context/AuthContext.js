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
    
    const userObj = {
      email: userData.email,
      token: userData.token
    };
    
    setUser(userObj);
    
    // Add this to help debug
    console.log("User logged in:", userObj);
  };

  const logout = () => {
    console.log("Logging out user:", user?.email);
    
    // Clear user data from state
    setUser(null);
    
    // Remove only auth data from localStorage, not cart or wishlist
    localStorage.removeItem("authToken");
    localStorage.removeItem("userEmail");
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