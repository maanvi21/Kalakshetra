import React, { useCallback, useEffect } from 'react';
import './ProductCard.css';
import Button from './Button';
import { useStateValue as useWishlistState } from '../context/WishlistContext';
import { useStateValue as useCartState } from '../context/CartContext';

export default function ProductCard({ item }) {
 
  const { state: wishlistState, dispatch: wishlistDispatch } = useWishlistState();
  const { state: cartState, dispatch: cartDispatch } = useCartState();

  useEffect(() => {
    console.log('ProductCard mounted - Cart state:', cartState);
    console.log('Wishlist state:', wishlistState);
  }, [cartState, wishlistState]);

  // Check if item is in wishlist
  const isItemInWishlist = useCallback((itemId) => {
    return wishlistState?.wishlist?.some(wishlistItem => wishlistItem._id === itemId) || false;
  }, [wishlistState]);

  const handleLikeToggle = useCallback((item) => {
    const isInWishlist = isItemInWishlist(item._id);
    if (isInWishlist) {
      console.log('Removing item from wishlist:', item);
      wishlistDispatch({ type: 'REMOVE_FROM_WISHLIST', _id: item._id });
    } else {
      console.log('Adding item to wishlist:', item);
      wishlistDispatch({
        type: 'ADD_TO_WISHLIST',
        item: {
          _id: item._id,
          title: item.title || 'Product',
          name: item.title || 'Product',
          image: item.image1 || '', // Use image1 from database
          price: item.price || 0,
          alt: item.alt || item.title || 'Product image',
        }
      });
    }
  }, [wishlistDispatch, wishlistState]);

  const handleAddToCart = useCallback((item) => {
    const existingItem = cartState.cart.find(cartItem => cartItem._id === item._id);
    const newItem = {
      _id: item._id,
      name: item.name || item.title || 'Product',
      title: item.title || item.name || 'Product',
      price: Number(item.price) || 0,
      image: item.image1 || '/placeholder.png', // Use image1 from database
      quantity: 1,
      category: item.category || item.type || 'Other',
    };
    

    if (existingItem) {
      cartDispatch({
        type: 'UPDATE_QUANTITY',
        _id: item._id,
        quantity: existingItem.quantity + 1
      });
    } else {
      cartDispatch({
        type: 'ADD_TO_CART',
        item: newItem
      });
    }
  }, [cartState.cart, cartDispatch]);

  const handleIncreaseQuantity = (item) => {
    const existingItem = cartState.cart.find(cartItem => cartItem._id === item._id);
    if (existingItem) {
      cartDispatch({
        type: 'UPDATE_QUANTITY',
        _id: item._id,
        quantity: existingItem.quantity + 1
      });
    }
  };

  const handleDecreaseQuantity = (item) => {
    const existingItem = cartState.cart.find(cartItem => cartItem._id === item._id);
    if (existingItem && existingItem.quantity > 1) {
      cartDispatch({
        type: 'UPDATE_QUANTITY',
        _id: item._id,
        quantity: existingItem.quantity - 1
      });
    }
  };

  return (
    <div className="product-card-container">
      <div className="prod_container" key={item._id}>
        <div className="prod_image-wrapper">
          <img src={item.image1 || '/placeholder.png'} alt={item.alt || item.title || 'Product Image'} />
        </div>
        <div className="prod_desc">
          <div className="title-container">
            <h3>{item.name || item.title || 'Product'}</h3>
            <button
              className="like-button"
              onClick={() => handleLikeToggle(item)}
              aria-label={isItemInWishlist(item._id) ? "Remove from wishlist" : "Add to wishlist"}
            >
              <img
                src={isItemInWishlist(item._id) ? 'assets/liked.png' : 'assets/unliked.png'}
                alt="like"
                className="like-icon"
              />
            </button>
          </div>
          
          {/* Price display - centered on its own line */}
          <div className="price-container">
            <p className="product-price">₹{item.price || 0}</p>
          </div>
          
          <div className="btn">
            <Button
              text="Add to Cart"
              onClick={() => handleAddToCart(item)}
            />
            <div className="quantity-controls">
              <button
                onClick={() => handleDecreaseQuantity(item)}
                className="quantity-btn"
              >-</button>
              <span>{cartState.cart.find(cartItem => cartItem._id === item._id)?.quantity || 0}</span>
              <button
                onClick={() => handleIncreaseQuantity(item)}
                className="quantity-btn"
              >+</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}