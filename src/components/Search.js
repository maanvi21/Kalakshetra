import React from 'react'
import './Search.css'
export default function Search() {
  return (
    <div className='search_container'>
       <input type="text" className="search-bar" placeholder="Search.." />
        <button className="search-btn">🔍</button>

    </div>
  )
}
