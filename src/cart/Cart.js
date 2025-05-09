import React from 'react';
import Header from '../components/user-components/Header';
import Button from '../components/Button';
import OperationsButton from '../components/OperationsButton';
import { useNavigate } from 'react-router-dom';
import { useStateValue } from '../context/CartContext';
import { useStateValue as useWishlistState } from '../context/WishlistContext';
import './Cart.css';

const Cart = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useStateValue();
  const { state: wishlistState, dispatch: wishlistDispatch } = useWishlistState();

  // Handle Quantity Change
  const handleQuantityChange = (id, delta) => {
    const item = state.cart.find(item => item._id === id);
    if (item) {
      const newQuantity = item.quantity + delta;
      if (newQuantity > 0) {
        dispatch({
          type: 'UPDATE_QUANTITY',
          _id: id,  // Changed from id to _id to match reducer
          quantity: newQuantity
        });
      }
    }
  };

  // Handle Remove Item from Cart
  const handleRemove = (id) => {
    dispatch({
      type: 'REMOVE_FROM_CART',
      _id: id  // Changed from id to _id to match reducer
    });
  };

  // Move item to Wishlist
  const moveToWishlist = (item) => {
    const existsInWishlist = wishlistState.wishlist.find(w => w._id === item._id);
    if (!existsInWishlist) {
      wishlistDispatch({
        type: 'ADD_TO_WISHLIST',
        item: {
          _id: item._id,  // Use _id instead of id to maintain consistency
          title: item.name || item.title,
          image: item.image,
          price: item.price || 0
        }
      });
    }
    handleRemove(item._id); // Remove item from cart after moving to wishlist
  };

  // Calculate Total
  const calculateTotal = () => {
    return state.cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };
const navToCheckout = () => {
    navigate('/checkout');
  };
  // Calculate Item Total
  const calculateItemTotal = (item) => {
    return item.price * item.quantity;
  };

  const navToWishlist = () => {
    navigate('/wishlist');
  };

  return (
    <div className="cart-page">
      <Header />
      <div className="cart-container">
        <div className="cart-header">
          <h1 className="title">Shopping Cart</h1>
          <div className="wishlist-button">
            <Button text='View Wishlist' onClick={navToWishlist} />
          </div>
        </div>

        <div className="cart-content">
          {state.cart.length > 0 ? (
            <div className="item-grid">
              {state.cart.map((item) => (
                <div className="cart-item" key={item._id}>
                  <div className="item-image-container">
                    <img src={item.image} alt={item.name || item.title || 'Product'} className="item-image" />
                  </div>
                  <div className="item-details">
                    <div className="item-header">
                      <h2 className="item-name">{item.name || item.title}</h2>
                      {item.category && (
                        <span className="item-category">{item.category}</span>
                      )}
                    </div>
                    <div className="price-section">
                      <p className="item-price">₹{item.price} each</p>
                      <p className="item-subtotal">
                        Subtotal: ₹{calculateItemTotal(item)}
                      </p>
                    </div>
                    <div className="quantity-controls">
                      <OperationsButton 
                        text='-' 
                        onClick={() => handleQuantityChange(item._id, -1)} 
                      />
                      <span className="quantity-display">{item.quantity}</span>
                      <OperationsButton 
                        text='+' 
                        onClick={() => handleQuantityChange(item._id, 1)} 
                      />
                    </div>
                  </div>
                  <div className="item-actions">
                    <OperationsButton 
                      text='Remove' 
                      onClick={() => handleRemove(item._id)} 
                      className="remove-button"
                    />
                    <OperationsButton 
                      text='Move to Wishlist' 
                      onClick={() => moveToWishlist(item)} 
                      className="wishlist-button"
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-cart">
              <p className="empty-message">Your cart is empty</p>
              <Button text='Continue Shopping' onClick={() => navigate('/')} />
            </div>
          )}

          {state.cart.length > 0 && (
            <div className="total-container">
              <div className="total-details">
                <p className="total-label">Total Items: {state.cart.reduce((sum, item) => sum + item.quantity, 0)}</p>
                <p className="total-amount">Total Amount: ₹{calculateTotal()}</p>
              </div>
              <Button text='Proceed to Checkout' onClick={() => navToCheckout()} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;