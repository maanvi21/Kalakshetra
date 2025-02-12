import React from 'react';
import Header from '../components/Header';
import Button from '../components/Button';
import OperationsButton from '../components/OperationsButton';
import { useNavigate } from 'react-router-dom';
import { useStateValue } from '../context/CartContext';
import './Cart.css';

const Cart = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useStateValue();

  const handleQuantityChange = (id, delta) => {
    const item = state.cart.find(item => item.id === id);
    if (item) {
      const newQuantity = item.quantity + delta;
      if (newQuantity > 0) {
        dispatch({
          type: 'UPDATE_QUANTITY',
          id: id,
          quantity: newQuantity
        });
      }
    }
  };

  const handleRemove = (id) => {
    dispatch({
      type: 'REMOVE_FROM_CART',
      id: id
    });
  };

  const moveToWishlist = (item) => {
    // You would dispatch to wishlist context here if available
    handleRemove(item.id);
  };

  const calculateTotal = () => {
    return state.cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const navToWishlist = () => {
    navigate('/wishlist');
  }

  return (
    <div className="cart-page">
      <Header/>
      <div className="cart-container">
        <div className='cart-header'>
          <h1 className="title">View Cart</h1>
          <div className='wishlist-button'>
            <Button text='Wishlist' onClick={navToWishlist}/>
          </div>
        </div>
        
        <div className="cart-content">
          {state.cart.length > 0 ? (
            <div className="item-grid">
              {state.cart.map((item) => (
                <div className="cart-item" key={item.id}>
                  <img src={item.image} alt={item.name} className="item-image" />
                  <div className="item-details">
                    <h2 className="item-name">{item.name}</h2>
                    <p className="item-price">₹{item.price}</p>
                    <div className="quantity-controls">
                      <OperationsButton 
                        text='-' 
                        onClick={() => handleQuantityChange(item.id, -1)} 
                      />
                      <span>{item.quantity}</span>
                      <OperationsButton 
                        text='+' 
                        onClick={() => handleQuantityChange(item.id, 1)} 
                      />
                    </div>
                  </div>
                  <div className="item-actions">
                    <Button 
                      text='Move to Wishlist' 
                      onClick={() => moveToWishlist(item)} 
                    />
                    <OperationsButton 
                      text='Remove' 
                      onClick={() => handleRemove(item.id)} 
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="empty-message">Your cart is empty.</p>
          )}
          
          {state.cart.length > 0 && (
            <div className="total-container">
              <p className="total-label">Total: ₹{calculateTotal()}</p>
              <Button text='Checkout' onClick={() => null} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;