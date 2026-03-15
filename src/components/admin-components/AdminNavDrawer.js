import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminNavDrawer.css';

export default function AdminNavDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDrawer = () => setIsOpen(!isOpen);

  const handleNavigation = (path) => {
    navigate(path);
    setIsOpen(false);
  };

  return (
    <>
      <button
        className="admin-toggle-button"
        onClick={toggleDrawer}
        aria-expanded={isOpen}
        aria-label="Toggle admin navigation menu"
      >
        <span className="hamburger-icon">
          <span></span>
          <span></span>
          <span></span>
        </span>
      </button>

      <div className={`admin-drawer ${isOpen ? 'open' : ''}`}>
        <div className="admin-drawer-header">
          <div className="admin-drawer-title">
            <span className="admin-badge">ADMIN</span>
            <h2>Control Panel</h2>
          </div>
          <button
            className="admin-close-button"
            onClick={toggleDrawer}
            aria-label="Close admin navigation menu"
          >
            ×
          </button>
        </div>

        <nav className="admin-nav-menu">
          <ul>
            <li className="nav-section-label">Overview</li>
            <li onClick={() => handleNavigation('/adminhome')}>
              <span className="nav-icon">🏠</span> Dashboard
            </li>

            <li className="nav-section-label">Catalog</li>
            <li onClick={() => handleNavigation('/adminmanagement')}>
              <span className="nav-icon">📦</span> Manage Items
            </li>
            <li>
              <span className="nav-icon">🗂️</span> Categories
              <ul className="admin-submenu">
                <li onClick={() => handleNavigation('/adminmanagement?cat=women')}>Women</li>
                <li onClick={() => handleNavigation('/adminmanagement?cat=men')}>Men</li>
                <li onClick={() => handleNavigation('/adminmanagement?cat=accessories')}>Accessories</li>
                <li onClick={() => handleNavigation('/adminmanagement?cat=bags')}>Bags</li>
              </ul>
            </li>

            <li className="nav-section-label">Content</li>
            <li onClick={() => handleNavigation('/adminoffers')}>
              <span className="nav-icon">🏷️</span> Manage Offers
            </li>
            <li onClick={() => handleNavigation('/adminbranches')}>
              <span className="nav-icon">📍</span> Manage Branches
            </li>

            <li className="nav-section-label">System</li>
            <li onClick={() => handleNavigation('/adminorders')}>
              <span className="nav-icon">🧾</span> Orders
            </li>
            <li onClick={() => handleNavigation('/adminusers')}>
              <span className="nav-icon">👥</span> Users
            </li>
            <li onClick={() => handleNavigation('/adminsettings')}>
              <span className="nav-icon">⚙️</span> Settings
            </li>
          </ul>
        </nav>

        <div className="admin-drawer-footer">
          <div className="admin-session-info">
            <span className="status-dot"></span>
            Admin Session Active
          </div>
        </div>
      </div>

      {isOpen && (
        <div
          className="admin-overlay"
          onClick={toggleDrawer}
          aria-hidden="true"
        />
      )}
    </>
  );
}