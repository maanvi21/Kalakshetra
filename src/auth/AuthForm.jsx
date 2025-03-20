import React, { useState, useEffect } from "react";
import { Mail, Lock, LogIn, UserPlus } from "lucide-react";
import { FaGoogle as Google } from "react-icons/fa";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
 
  // Check if user is already logged in (e.g., from localStorage token)
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      setIsLogin(true); // Changed from isLogin(true) to setIsLogin(true)
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // This is where you'd make an API call to your backend
      // For now, we'll simulate a successful login/signup
      console.log(isLogin ? "Logging in" : "Signing up", { email, password });
      
      // Simulating successful auth (replace with actual API call)
      const response = { success: true, token: "sample-token-123" };
      
      if (response.success) {
        // Store token in localStorage
        localStorage.setItem("authToken", response.token);
        setIsLogin(true); // Changed from isLogin(true) to setIsLogin(true)
      }
    } catch (error) {
      console.error("Auth Error:", error);
    }
  };

  const handleGoogleAuth = async () => {
    try {
      window.location.href = "http://localhost:5000/auth/google"; 
   // Redirect to backend route
    } catch (error) {
      console.error("Google Auth Error:", error);
    }
  };
  
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setIsLogin(false); // Changed from isLogin(false) to setIsLogin(false)
  };

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
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300 flex items-center justify-center"
          >
            {isLogin ? <LogIn className="mr-2" size={20} /> : <UserPlus className="mr-2" size={20} />}
            {isLogin ? "Log In" : "Sign Up"}
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
            <Google className="mr-2" size={20} />
            Continue with Google
          </button>
        </form>

        <div className="text-center mt-6">
          <p className="text-gray-600">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
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