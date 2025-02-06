import React from 'react'
import './Navbar.css'
import { useNavigate } from 'react-router-dom'
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
  const navToLocatet=()=>{
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
            <li onClick={navToLocatet}>Locate Our Branches</li>
            <li onClick={navToContact}>Contact Us</li>
          </ul>
        </nav>
      </header>
    </div>
  )
}