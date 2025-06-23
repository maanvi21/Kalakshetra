import React from 'react';
import './Footer.css';

export default function Footer() {
  return (
    <footer>
      <div className="row1">
        <div className="quick-links">
          <h3>QUICK LINKS</h3>
          <ul>
            <li><a href="#">Size Guide</a></li>
            <li><a href="#">About Us</a></li>
          </ul>
        </div>

        <div className="services">
          <h3>SERVICES</h3>
          <ul>
            <li><a href="#">Track Orders</a></li>
            <li><a href="#">Return/Exchange Policy</a></li>
            <li><a href="#">Shipping & Payment</a></li>
          </ul>
        </div>

        <div className="help">
          <h3>HELP</h3>
          <ul>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms & Conditions</a></li>
            <li><a href="#">Contact Us</a></li>
          </ul>
        </div>

        <div className="social-media">
         <h3 style={{ gridColumn: 'span 2', marginBottom: '0.5rem' }}>FOLLOW US</h3>
          <img src="/assets/Gmail.png" alt="gmail" />
          <img src="/assets/instagram.png" alt="instagram" />
          <img src="/assets/Phone.png" alt="phone" />
          <img src="/assets/whatsapp.png" alt="whatsapp" />
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2025 Kalakshetra. All rights reserved.</p>
        <p>Designed & Developed by Kode & Co.</p>
      </div>
    </footer>
  );
}
