import React from 'react'
import Button from './Button'
import './CategoriesContainer.css'
import { useNavigate } from 'react-router-dom'
export default function CategoriesContainer({items}) {
const navigate=useNavigate();
  const navToBrowse=()=>{
navigate('/browse')
  }
  return (
    <div className='categories-container'> 
    {items.map((item,index)=>
       <div className='container'  key={index}>
      <img src={item.image} alt=''/>
    <h3> 
    {item.title} </h3>
    <p> {items.description}</p>
      <div className='button'> 
        <Button text='View' onClick={navToBrowse}/>
        </div>
    </div>)}
    
    </div>
  )
}
