import React from 'react'
import './Navbar.css'
import { useNavigate } from 'react-router-dom'
import LoginToggle from './LoginToggle';
export default function Navbar() {
  const navigate=useNavigate();

  const navToHome=()=>{
    navigate('/')

  }

  const navToAbout=()=>{
    navigate('/about')
    
  }
  const navToContact=()=>{
    navigate('/contact')
    
  }
  const navToLocate=()=>{
    navigate('/')
    
  }
  const navToBrowse=()=>{
    navigate('/browse')
    
  }
  return (
    <div>
      <header className="navbar">
        
        <nav>
          <ul>
            <li onClick={navToHome}>Home</li>
            <li onClick={navToAbout}>About Us</li>
            <li onClick={navToLocate}>Locate Our Branches</li>
            <li onClick={navToContact}>Contact Us</li>
            <li> <LoginToggle/> </li>
          </ul>
        </nav>
      </header>
    </div>
  )
}