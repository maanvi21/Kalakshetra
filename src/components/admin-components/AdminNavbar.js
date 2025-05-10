import React from 'react'
import './AdminNavbar.css'
import { useNavigate } from 'react-router-dom'
import LoginToggle from '../LoginToggle';
import NavDrawer from '../NavDrawer';
import OperationsButton from '../OperationsButton';
export default function AdminNavbar() {
  const navigate=useNavigate();

  const navToHome=()=>{
    navigate('/adminhome')

  }
const navToManageItems=()=>{
    navigate('/adminmanagement')
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
            {/* <li> <LoginToggle/> </li> */}
            <li><OperationsButton text='Manage Items' onClick={navToManageItems}/></li>
            <li><NavDrawer/></li>
          </ul>
        </nav>
      </header>
    </div>
  )
}