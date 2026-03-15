import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  const navigate = useNavigate();

  return (
    <footer>
      <div className="row1">
        <div className="quick-links">
          <h3>QUICK LINKS</h3>
          <ul>
            {/* ✅ replaced href="#" with buttons that navigate */}
            <li><button type="button" className="footer-link" onClick={() => navigate('/sizeguide')}>Size Guide</button></li>
            <li><button type="button" className="footer-link" onClick={() => navigate('/about')}>About Us</button></li>
          </ul>
        </div>

        <div className="services">
          <h3>SERVICES</h3>
          <ul>
            <li><button type="button" className="footer-link" onClick={() => navigate('/trackorders')}>Track Orders</button></li>
            <li><button type="button" className="footer-link" onClick={() => navigate('/returnpolicy')}>Return/Exchange Policy</button></li>
            <li><button type="button" className="footer-link" onClick={() => navigate('/shipping')}>Shipping &amp; Payment</button></li>
          </ul>
        </div>

        <div className="help">
          <h3>HELP</h3>
          <ul>
            <li><button type="button" className="footer-link" onClick={() => navigate('/privacy')}>Privacy Policy</button></li>
            <li><button type="button" className="footer-link" onClick={() => navigate('/terms')}>Terms &amp; Conditions</button></li>
            <li><button type="button" className="footer-link" onClick={() => navigate('/contact')}>Contact Us</button></li>
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
          <a href="https://www.instagram.com/kode.and.co/" target="_blank" rel="noopener noreferrer">
            Designed &amp; Developed by Kode &amp; Co.
          </a>
        </p>
      </div>
    </footer>
  );
}