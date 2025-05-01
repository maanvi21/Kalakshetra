import React from 'react';
import './Wishlist.css';
import Button from '../components/Button';
import Header from '../components/user-components/Header';
import { useNavigate } from 'react-router-dom';
import { useStateValue as useWishlistState } from '../context/WishlistContext';
import { useStateValue as useCartState } from '../context/CartContext';

export default function Wishlist() {
  const navigate = useNavigate();
  const { state: wishlistState, dispatch: wishlistDispatch } = useWishlistState();
  const { dispatch: cartDispatch } = useCartState();
  
  // Function to move item from wishlist to cart
  const moveToCart = (item) => {
    // Add to cart
    cartDispatch({
      type: 'ADD_TO_CART',
      item: {
        _id: item._id, // Fixed: changed 'id' to '_id'
        name: item.name || item.title || 'Product',
        title: item.title || item.name || 'Product',
        price: Number(item.price) || 0,
        image: item.image || '',
        quantity: 1,
        category: item.category || 'Uncategorized',
      }
    });
    
    // Remove from wishlist
    wishlistDispatch({
      type: 'REMOVE_FROM_WISHLIST',
      _id: item._id // Fixed: changed 'id' to '_id'
    });
  };
  
  // Remove item from wishlist
  const removeFromWishlist = (itemId) => {
    wishlistDispatch({
      type: 'REMOVE_FROM_WISHLIST',
      _id: itemId // Fixed: changed 'id' to '_id'
    });
  };

  return (
    <div>
      <Header />
      
      <div className="wishlist-container">
        <h1>My Wishlist</h1>
        
        {wishlistState?.wishlist?.length > 0 ? (
          <div className="item-grid">
            {wishlistState.wishlist.map((item) => (
              <div className="wishlist-item" key={item._id}>
                <div className="wishlist-item-header">
                  <button
                    className="remove-button"
                    onClick={() => removeFromWishlist(item._id)}
                    aria-label="Remove from wishlist"
                  >
                    ✕
                  </button>
                </div>
                <img src={item.image} alt={item.name || 'Product image'} className="item-image" />
                <div className="item-details">
                  <h2 className="item-name">{item.name || item.title}</h2>
                  <p className="item-price">₹{item.price}</p>
                </div>
                <Button text='Move to Cart' onClick={() => moveToCart(item)} />
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-wishlist">
            <p className="empty-message">Your wishlist is empty.</p>
            <Button text='Continue Shopping' onClick={() => navigate('/')} />
          </div>
        )}
      </div>
    </div>
  );
}