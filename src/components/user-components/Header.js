import React from 'react'
import './Header.css'
import Navbar from './Navbar'
import { useNavigate } from 'react-router-dom'
export default function Header() {
  const navigate=useNavigate();
  const navToHome = () => {
    navigate('/');
   }

  return (
    
    <div className='header'>
           <div className="logo">
            <img src='assets/kalakshetralogo.png' alt='logo' onClick={navToHome}/>
        </div>
      <Navbar/>
    </div>
  )
}
