import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './NavDrawer.css';

export default function NavDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  const handleNavigation = (path) => {
    navigate(path);
    setIsOpen(false); // Close drawer after navigation
  };

  return (
    <>
      <button
        className="toggle-button"
        onClick={toggleDrawer}
        aria-expanded={isOpen}
        aria-label="Toggle navigation menu"
      >
        <img src="./assets/Drawer.png" alt="cart" className="nav-icon" />
      </button>

      <div className={`drawer ${isOpen ? 'open' : ''}`}>
        <div className="drawer-header">
          <button
            className="close-button"
            onClick={toggleDrawer}
            aria-label="Close navigation menu"
          >
            ×
          </button>
          <h2>Menu</h2>
        </div>

        <nav className="nav-menu">
          <ul>
            {/* Shop with nested items */}
            <li>
              🛍️ Shop
              <ul className="submenu">
                <li onClick={() => handleNavigation('/womenProducts')}>Women</li>
                <li onClick={() => handleNavigation('/menProducts')}>Men</li>
                <li onClick={() => handleNavigation('/accessoriesProducts')}>Accessories</li>
                <li onClick={() => handleNavigation('/bagsProducts')}>Bags</li>
              </ul>
            </li>

            {/* Other menu items */}
            <li onClick={() => handleNavigation('/about')}>ℹ️ About Us</li>
            <li onClick={() => handleNavigation('/LocateUs')}>📍 Locate Our Branches</li>
            <li onClick={() => handleNavigation('/contact')}>📞 Contact Us</li>
          </ul>
        </nav>
      </div>

      {isOpen && (
        <div
          className="overlay"
          onClick={toggleDrawer}
          aria-hidden="true"
        />
      )}
    </>
  );
}
