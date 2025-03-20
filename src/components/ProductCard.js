import React, { useState, useCallback } from 'react';
import './ProductCard.css';
import Button from './Button';
import { useStateValue as useWishlistState } from '../context/WishlistContext';
import { useStateValue as useCartState } from '../context/CartContext';

export default function ProductCard({ items }) {
  const [likedItems, setLikedItems] = useState({});
  const { state: wishlistState, dispatch: wishlistDispatch } = useWishlistState();
  const { state: cartState, dispatch: cartDispatch } = useCartState();

  const handleLikeToggle = useCallback((index) => {
    const item = items[index];
    
    setLikedItems(prevLiked => {
      const currentLikedState = prevLiked[index];
      
      if (!currentLikedState) {
        // Check if item is already in wishlist before dispatching
        const isAlreadyInWishlist = wishlistState.wishlist.some(
          wishlistItem => wishlistItem.id === item.id
        );

        if (!isAlreadyInWishlist) {
          wishlistDispatch({ 
            type: 'ADD_TO_WISHLIST', 
            item: {
              id: item.id,
              title: item.title,
              image: item.image,
              alt: item.alt,
            }
          });
        }
      } else {
        wishlistDispatch({ 
          type: 'REMOVE_FROM_WISHLIST', 
          id: item.id 
        });
      }

      // Return new state
      return {
        ...prevLiked,
        [index]: !currentLikedState
      };
    });
  }, [items, wishlistDispatch]);

  const handleAddToCart = useCallback((item) => {
    const existingItem = cartState.cart.find((cartItem) => cartItem.id === item.id);
    
    const newItem = {
      id: item.id,
      name: item.name || item.title,
      price: item.price || 0,
      image: item.image,
      quantity: 1,
      category: item.category || 'Uncategorized',
    };

    if (existingItem) {
      cartDispatch({
        type: 'UPDATE_QUANTITY',
        id: item.id,
        quantity: existingItem.quantity + 1
      });
    } else {
      cartDispatch({ 
        type: 'ADD_TO_CART', 
        item: newItem 
      });
    }
  }, [cartState.cart, cartDispatch]);

  return (
    <div className="product-card-container">
      {items.map((item, index) => (
        <div className="prod_container" key={item.id || index}>
          <div className="prod_image-wrapper">
            <img src={item.image} alt={item.alt || 'Product Image'} />
          </div>
          <div className="prod_desc">
            <div className="title-container">
              <button 
                className="like-button" 
                onClick={() => handleLikeToggle(index)}
              >
                <img
                  src={likedItems[index] ? 'assets/liked.png' : 'assets/unliked.png'}
                  alt="like"
                  className="like-icon"
                />
              </button>
              <h3>{item.title}</h3>
            </div>
            <div className="btn">
              <Button 
                text="Add to Cart" 
                onClick={() => handleAddToCart(item)} 
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}