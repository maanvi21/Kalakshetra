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

  <a href="mailto:kalkshetra.new@gmail.com" target="_blank" rel="noopener noreferrer">
    <img src="/assets/Gmail.png" alt="Gmail" />
  </a>

  <a href="https://www.instagram.com/kalakshetra_in/" target="_blank" rel="noopener noreferrer">
    <img src="/assets/instagram.png" alt="Instagram" />
  </a>

  <a href="tel:9867156531">
    <img src="/assets/Phone.png" alt="Phone" />
  </a>

  <a href="https://wa.me/919867156531" target="_blank" rel="noopener noreferrer">
    <img src="/assets/whatsapp.png" alt="WhatsApp" />
  </a>
</div>

      </div>

      <div className="footer-bottom">
        <p>&copy; 2025 Kalakshetra. All rights reserved.</p>
        <p>
          <a href="https://www.instagram.com/kode.and.co/" >Designed & Developed by Kode & Co.</a>
        </p>
      </div>
    </footer>
  );
}
