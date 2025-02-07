import React, { useState, useEffect } from 'react';
import './ProductCard.css';
import Button from './Button';
import { useStateValue } from '../context/WishlistContext';

export default function ProductCard({ items}) {
  const [liked, setLiked] = useState({}); 
  const { dispatch } = useStateValue();

  // like functionality with context
  const toggleLike = (index) => {
    setLiked((prev) => {
      const newLikedState = { ...prev, [index]: !prev[index] };
      const item = {
        id: items[index].id, 
        title: items[index].title,
        image: items[index].image,
        alt: items[index].alt,
      };

      // Dispatch ADD_TO_WISHLIST or REMOVE_FROM_WISHLIST based on the like state
      if (newLikedState[index]) {
        dispatch({
          type: 'ADD_TO_WISHLIST',
          item,
        });
      } else {
        dispatch({
          type: 'REMOVE_FROM_WISHLIST',
          item,
        });
      }

      return newLikedState;
    });
  };

  // Use useEffect to show alert only when liked state changes
  useEffect(() => {
    for (let index in liked) {
      if (liked[index]) {
        alert('Added to Wishlist');
      } else {
        alert('Removed from Wishlist');
      }
    }
  }, [liked]); // This will run when liked state changes
  
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
            <div className="btn">
              <Button text="View" onClick={''} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}