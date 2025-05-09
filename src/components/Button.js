import React from 'react';
import './Button.css';

export default function Button({ text, onClick }) {
  return (
    <button className='btn_container' onClick={onClick}>
      {text}
    </button>
  );
}
