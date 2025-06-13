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
  
  
 
  
  return (
    <div>
      <header className="navbar">
        
        <nav>
          <ul>
            <li onClick={navToHome}>Home</li>
            {/* <li> <LoginToggle/> </li> */}
            <li><OperationsButton text='Manage Items' onClick={navToManageItems}/></li>
            <li><NavDrawer/></li>
          </ul>
        </nav>
      </header>
    </div>
  )
}