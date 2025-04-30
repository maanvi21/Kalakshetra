import React, { createContext, useState, useEffect, useContext } from 'react';

// Create a context for authentication
export const AuthContext = createContext();

// AuthProvider component to provide context value
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // The user state (null if not logged in)

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      // Simulate fetching user data based on token (you can replace this with an actual API call)
      setUser({ id: "user123", token });
    }
  }, []);

  const login = (userData) => {
    // Store user data and token in localStorage
    localStorage.setItem("authToken", userData.token);
    setUser(userData);
  };

  const logout = () => {
    setUser(null); // Clear user data from state
    localStorage.removeItem("authToken"); // Remove the auth token from localStorage
    localStorage.removeItem('cart');
    localStorage.removeItem('wishlist'); // Clear wishlist from localStorage

  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
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
