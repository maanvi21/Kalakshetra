import React, { useState } from 'react';
import './ProductCard.css';

export default function ProductCard({ items }) {
  const [liked, setLiked] = useState({}); // Track liked state for each item

  const toggleLike = (index) => {
    setLiked((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <div className="product-card-container">
      {items.map((item, index) => (
        <div className="prod_container" key={index}>
          <div className="prod_image-wrapper">
            <img src={item.image} alt={item.alt} />
          </div>
          <div className="prod_desc">
            <div className="title-container">
              
              <button className="like-button" onClick={() => toggleLike(index)}>
                <img
                  src={liked[index] ? 'assets/liked.png' : 'assets/unliked.png'}
                  alt="like"
                  className="like-icon"
                />
              </button>
              <h3>{item.title}</h3>
            </div>
           
          </div>
        </div>
      ))}
    </div>
  );
}
