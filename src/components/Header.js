import React from 'react'
import './Header.css'
import Navbar from './Navbar'
export default function Header() {
  return (
    <div className='header'>
           <div className="logo">
            <img src='assets/kalakshetralogo.png' alt='logo' onClick={''}/>
        </div>
      <Navbar/>
    </div>
  )
}
