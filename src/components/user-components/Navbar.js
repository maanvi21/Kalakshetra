import React from 'react';
import './Navbar.css';
import { useNavigate } from 'react-router-dom';
import LoginToggle from '../LoginToggle';
import NavDrawer from '../NavDrawer';
import { useAuth } from '../../context/AuthContext';

export default function Navbar() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const navToHome = () => navigate('/');
  const navToBrowse = () => navigate('/browse');
  const navToCart = () => navigate('/cart');
  const navToWishlist = () => navigate('/wishlist');

  return (
    <div>
      <header className="navbar">
        <nav className="nav-left">
          <ul>
            <li onClick={navToHome}>Home</li>
          </ul>
        </nav>

        <div className="nav-right">
          {/* Cart Icon */}
          <button className="icon-button" onClick={navToCart} title="Cart">
  <img src="./assets/Cart.png" alt="cart" className="nav-icon" />
  
</button>

<button className="icon-button" onClick={navToWishlist} title="Wishlist">
  <img src="./assets/liked.png" alt="wishlist" className="nav-icon" />
</button>

          {/* User Email */}
          {user ? (
            <span className="user-email">{user.email}</span>
          ) : (
            <span className="user-email">Not logged in</span>
          )}

          {/* Login/Logout Toggle */}
          <LoginToggle />

          {/* Hamburger Menu */}
          <NavDrawer />
        </div>
      </header>
    </div>
  );
}
