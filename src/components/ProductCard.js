import React, { useState, useCallback, useEffect } from 'react';
import './ProductCard.css';
import Button from './Button';
import { useStateValue as useWishlistState } from '../context/WishlistContext';
import { useStateValue as useCartState } from '../context/CartContext';

export default function ProductCard({ items }) {
  const [likedItems, setLikedItems] = useState({});
  const { state: wishlistState, dispatch: wishlistDispatch } = useWishlistState();
  const { state: cartState, dispatch: cartDispatch } = useCartState();
  
  // Debug on mount to check for undefined values
  useEffect(() => {
    console.log('ProductCard mounted - Cart state:', cartState);
    console.log('Wishlist state:', wishlistState);
    
    // Check if cart state is properly defined
    if (!cartState || !cartState.cart) {
      console.error('Cart state is undefined or missing cart array!');
    }
    
    // Check if wishlist state is properly defined
    if (!wishlistState || !wishlistState.wishlist) {
      console.error('Wishlist state is undefined or missing wishlist array!');
    }
  }, [cartState, wishlistState]);
  
  const handleLikeToggle = useCallback((index) => {
    const item = items[index];
    
    // Safety check
    if (!wishlistState || !wishlistState.wishlist) {
      console.error('Wishlist state is undefined!');
      return;
    }
    
    setLikedItems(prevLiked => {
      const currentLikedState = prevLiked[index];
      
      if (!currentLikedState) {
        // Safely check if item exists in wishlist
        const isAlreadyInWishlist = wishlistState.wishlist && 
          wishlistState.wishlist.some(wishlistItem => wishlistItem.id === item.id);
        
        if (!isAlreadyInWishlist) {
          wishlistDispatch({
            type: 'ADD_TO_WISHLIST',
            item: {
              id: item.id,
              title: item.title || item.name || 'Product',
              image: item.image || '',
              price: item.price || 0,
              alt: item.alt || item.title || 'Product image',
            }
          });
        }
      } else {
        wishlistDispatch({
          type: 'REMOVE_FROM_WISHLIST',
          id: item.id
        });
      }
      
      return {
        ...prevLiked,
        [index]: !currentLikedState
      };
    });
  }, [items, wishlistDispatch, wishlistState]);
  
  const handleAddToCart = useCallback((item) => {
    // Safety check to prevent TypeError
    if (!cartState || !cartState.cart) {
      console.error('Cart state is undefined!');
      return;
    }
    
    console.log('Adding item to cart:', item);
    
    // Make sure the item has a valid ID
    if (!item.id) {
      console.error('Item missing ID!', item);
      return;
    }
    
    // Safely find existing item
    const existingItem = cartState.cart.find(cartItem => cartItem.id === item.id);
    
    const newItem = {
      id: item.id,
      name: item.title || item.name || 'Product',
      title: item.title || item.name || 'Product',
      price: Number(item.price) || 0,
      image: item.image || '',
      quantity: 1,
      category: item.category || 'Uncategorized',
    };
    
    console.log('Prepared cart item:', newItem);
    
    if (existingItem) {
      console.log('Item exists in cart, updating quantity', existingItem);
      cartDispatch({
        type: 'UPDATE_QUANTITY',
        id: item.id,
        quantity: existingItem.quantity + 1
      });
    } else {
      console.log('Adding new item to cart', newItem);
      cartDispatch({
        type: 'ADD_TO_CART',
        item: newItem
      });
    }
  }, [cartState, cartDispatch]);
  
  // Check if items array exists
  if (!items || !Array.isArray(items) || items.length === 0) {
    return <div className="product-card-container">No products available</div>;
  }
  
  return (
    <div className="product-card-container">
      {items.map((item, index) => (
        <div className="prod_container" key={item.id || `item-${index}`}>
          <div className="prod_image-wrapper">
            <img 
              src={item.image || '/placeholder.png'} 
              alt={item.alt || item.title || 'Product Image'} 
            />
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
              <h3>{item.title || item.name || 'Product'}</h3>
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