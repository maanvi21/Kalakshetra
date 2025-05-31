import React, { useState, useEffect } from "react";
import { Mail, Lock, LogIn, UserPlus, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AuthForm = () => {
  const navigate = useNavigate();
  const { user, login, logout, loading } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // If user is logged in and not in loading state, redirect to home
    if (user && !loading) {
      navigate("/");
    }
  }, [user, loading, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const response = await fetch(`https://kalakshetra3-zyhn.vercel.app/${isLogin ? "login" : "signup"}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include" // Include cookies if your API uses them
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || (isLogin ? "Login failed" : "Signup failed"));
      }

      if (data.token) {
        // Login with user data
        login({ 
          token: data.token, 
          email: email 
        });
        
        // Clear form
        setEmail("");
        setPassword("");
        
        // Show success message and redirect
        navigate("/");
      }
    } catch (error) {
      console.error("Auth Error:", error);
      setError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleAuth = () => {
    // Redirect to Google OAuth endpoint
    window.location.href = "https://kalakshetra3-zyhn.vercel.app/auth/google";
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-96">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">
            {isLogin ? "Welcome Back" : "Create Account"}
          </h2>
          <p className="text-gray-500 mt-2">
            {isLogin ? "Log in to continue" : "Sign up to get started"}
          </p>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300 flex items-center justify-center ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {isLogin ? <LogIn className="mr-2" size={20} /> : <UserPlus className="mr-2" size={20} />}
            {isSubmitting ? 'Processing...' : (isLogin ? "Log In" : "Sign Up")}
          </button>

          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-white px-3 text-gray-500">or</span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleGoogleAuth}
            className="w-full bg-white border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50 transition duration-300 flex items-center justify-center"
          >
            <span className="mr-2 text-red-500">G</span>
            Continue with Google
          </button>
        </form>

        {user && (
          <button
            onClick={handleLogout}
            className="mt-4 w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition duration-300 flex items-center justify-center"
          >
            <LogOut className="mr-2" size={20} /> Logout
          </button>
        )}

        <div className="text-center mt-6">
          <p className="text-gray-600">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-blue-600 hover:underline"
            >
              {isLogin ? "Sign Up" : "Log In"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;