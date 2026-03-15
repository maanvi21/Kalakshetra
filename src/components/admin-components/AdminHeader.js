import React from 'react'
import './AdminHeader.css'
import { useNavigate } from 'react-router-dom'
import AdminNavbar from './AdminNavbar';
export default function AdminHeader() {
  const navigate=useNavigate();
  const navToHome = () => {
    navigate('/xyz321');
   }

  return (
    
    <div className='header'>
           <div className="logo">
            <img src='assets/kalakshetralogo.png' alt='logo' onClick={navToHome}/>
        </div>
      <AdminNavbar/>
    </div>
  )
}
