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
  const navToAbout = () => navigate('/about');
  const navToContact = () => navigate('/contact');
  const navToLocate = () => navigate('/');
  const navToBrowse = () => navigate('/browse');

  return (
    <div>
      <header className="navbar">
        <nav className="nav-left">
          <ul>
            <li onClick={navToHome}>Home</li>
            <li onClick={navToAbout}>About Us</li>
            <li onClick={navToLocate}>Locate Our Branches</li>
            <li onClick={navToContact}>Contact Us</li>
            <li onClick={navToBrowse}>Browse</li>
          </ul>
        </nav>

        <div className="nav-right">
          {user ? (
            <span className="user-email"> {user.email}</span>
          ) : (
            <span className="user-email">Not logged in</span>
          )}
          <LoginToggle />
          <NavDrawer />
        </div>
      </header>
    </div>
  );
}
