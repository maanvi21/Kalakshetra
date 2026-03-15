import React from 'react';
import './Navbar.css';
import { useNavigate } from 'react-router-dom';
import LoginToggle from '../LoginToggle';
import NavDrawer from '../NavDrawer';
import { useAuth } from '../../context/AuthContext';

export default function Navbar() {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <nav className="navbar-actions">
      <button className="nav-text-btn" onClick={() => navigate('/wishlist')}>
        ♡ Wishlist
      </button>

      <button className="nav-text-btn" onClick={() => navigate('/cart')}>
        ⌂ Cart
      </button>

      {user && (
        <span className="navbar-user">{user.email}</span>
      )}

      <LoginToggle />
      <NavDrawer />
    </nav>
  );
}