import React from 'react'
import './Footer.css'
export default function Footer() {
  return (
    <div>
        
      <footer>
        <div className="quick-links">
          <h3>QUICK LINKS</h3>
          <ul>
            <li><a href="#">Size Guide</a></li>
            <li><a href="#">About Us</a></li>
          </ul>
        </div>
        <div className="help">
          <h3>HELP</h3>
          <ul>
            <li><a href="#">Track Orders</a></li>
            <li><a href="#">Return/Exchange Policy</a></li>
            <li><a href="#">Shipping & Payment</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms & Conditions</a></li>
            <li><a href="#">Contact Us</a></li>
          </ul>
        </div>
        <div className="social-media">
          <img src='assets/Gmail.png' alt='gmail' onClick={''}/>
          <img src='assets/instagram.png' alt='instagram' onClick={''}/>
          <img src='assets/Phone.png' alt='phone' onClick={''}/>
          <img src='assets/whatsapp.png' alt='whatsapp' onClick={''}/>
        </div>
      </footer>
      
    </div>
  )
}
