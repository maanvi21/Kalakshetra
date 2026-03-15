import React from 'react';
import './Header.css';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();

  return (
    <div className="header">
      <div className="header-logo" onClick={() => navigate('/')}>
        <img src="assets/kalakshetralogo.png" alt="KalaKshetra" />
      </div>
      <Navbar />
    </div>
  );
}