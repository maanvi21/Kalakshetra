import React from 'react'
import './Button.css'
export default function Button({text,onClick}) {
  return (
    <div>
       <div className='btn_container' onClick={onClick}>
           {text}
       </div>
    </div>
  )
}
