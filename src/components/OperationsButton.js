import React from 'react'
import './OperationsButton.css'
export default function OperationsButton({text,onClick}) {
  return (
    <div>
      <button className='op-btn_container' onClick={onClick}>
      {text}
    </button>
    </div>
  )
}
