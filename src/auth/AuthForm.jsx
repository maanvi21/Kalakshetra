import React, { useState, useEffect } from "react";
import { Mail, Lock, LogIn, UserPlus, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./AuthForm.css";

const AuthForm = () => {
  const navigate = useNavigate();
  const { user, login, logout, loading } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user && !loading) {
      navigate("/");
    }
  }, [user, loading, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const response = await fetch(`https://'https://kalakshetra3-5.onrender.com';/${isLogin ? "login" : "signup"}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include"
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || (isLogin ? "Login failed" : "Signup failed"));
      }

      if (data.token) {
        login({ token: data.token, email: email });
        setEmail("");
        setPassword("");
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
    window.location.href = "https://'https://kalakshetra3-5.onrender.com';/auth/google";
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="auth-page">
        <div className="auth-loading">Loading...</div>
      </div>
    );
  }

  return (
    <div className="auth-page">
      <div className="auth-card">

        {/* Brand mark */}
        <div className="auth-brand">
          <p className="auth-eyebrow">KalaKshetra</p>
          <h2 className="auth-title">
            {isLogin ? "Welcome Back" : "Create Account"}
          </h2>
          <p className="auth-subtitle">
            {isLogin ? "Log in to continue" : "Sign up to get started"}
          </p>
        </div>

        {error && (
          <div className="auth-error">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="auth-field">
            <Mail className="auth-field-icon" size={16} />
            <input
              type="email"
              placeholder="Email address"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="auth-input"
            />
          </div>

          <div className="auth-field">
            <Lock className="auth-field-icon" size={16} />
            <input
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="auth-input"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`auth-submit-btn ${isSubmitting ? 'auth-submit-btn--loading' : ''}`}
          >
            {isLogin
              ? <LogIn size={15} className="auth-btn-icon" />
              : <UserPlus size={15} className="auth-btn-icon" />}
            {isSubmitting ? 'Processing...' : (isLogin ? "Log In" : "Sign Up")}
          </button>

          <div className="auth-divider">
            <span>or</span>
          </div>

          <button
            type="button"
            onClick={handleGoogleAuth}
            className="auth-google-btn"
          >
            <span className="auth-google-icon">G</span>
            Continue with Google
          </button>
        </form>

        {user && (
          <button onClick={handleLogout} className="auth-logout-btn">
            <LogOut size={15} className="auth-btn-icon" /> Logout
          </button>
        )}

        <div className="auth-toggle">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="auth-toggle-link"
          >
            {isLogin ? "Sign Up" : "Log In"}
          </button>
        </div>

      </div>
    </div>
  );
};

export default AuthForm;