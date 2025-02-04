import React from 'react'
import './ProductCard.css'

export default function ProductCard({items}) {
  return (
    <div className="product-card-container">
      {items.map((item, index) => (
        <div className='prod_container' key={index}>
          <div className='prod_image-wrapper'>
            <img src={item.image} alt={item.alt}/>
          </div>
          <div className='prod_desc'>
            <h3>{item.title}</h3>
            <h5>{item.description}</h5>
          </div>
        </div>
      ))}
    </div>
  )
}