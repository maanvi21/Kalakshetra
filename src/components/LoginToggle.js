import React from 'react';
import './LoginToggle.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function LoginToggle() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleClick = () => {
    if (user) {
      logout();
      navigate('/login');
      alert('Logged out successfully');
    } else {
      navigate('/login');
    }
  };

  return (
    <button className="login-toggle-btn" onClick={handleClick}>
      {user ? 'Logout' : 'Login'}
    </button>
  );
}