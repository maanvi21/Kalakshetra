import React, { useState, useEffect } from 'react';
import './ProductCard.css';
import Button from './Button';
import { useStateValue as useWishlistState } from '../context/WishlistContext';
import { useStateValue as useCartState } from '../context/CartContext';

export default function ProductCard({ items }) {
  const [liked, setLiked] = useState({});
  const { dispatch: wishlistDispatch } = useWishlistState();
  const { state: cartState, dispatch: cartDispatch } = useCartState();

  // Like functionality
  const toggleLike = (index) => {
    setLiked((prev) => {
      const newLikedState = { ...prev, [index]: !prev[index] };
      const item = {
        id: items[index].id,
        title: items[index].title,
        image: items[index].image,
        alt: items[index].alt,
      };

      if (newLikedState[index]) {
        wishlistDispatch({ type: 'ADD_TO_WISHLIST', item });
      } else {
        wishlistDispatch({ type: 'REMOVE_FROM_WISHLIST', id: item.id });
      }

      return newLikedState;
    });
  };

  // Add to cart function
  const addToCart = (item) => {
    console.log('Adding item to cart:', item);
    // Find if item already exists in cart
    const existingItem = cartState.cart.find((cartItem) => cartItem.id === item.id);
    console.log('Existing item:', existingItem);
    if (existingItem) {
      // If item exists, update its quantity
      cartDispatch({
        type: 'UPDATE_QUANTITY',
        id: item.id,
        quantity: existingItem.quantity + 1
      });
    } else {
      // If item doesn't exist, add it with quantity 1
      const newItem = {
        id: item.id,
        name: item.name || item.title,
        price: item.price || 0,
        image: item.image,
        quantity: 1,
     
        category: item.category || 'Uncategorized',
      };
      cartDispatch({ type: 'ADD_TO_CART', item: newItem });
    }

    alert('Item added to cart');
  };

  // wishlist useEffect
  useEffect(() => {
    for (let index in liked) {
      if (liked[index]) {
        console.log('Added to Wishlist');
      } else {
        console.log('Removed from Wishlist');
      }
    }
  }, [liked]);

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
              <Button text="Add to Cart" onClick={() => addToCart(item)} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}