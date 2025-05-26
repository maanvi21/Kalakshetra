import React from 'react';
import { useStateValue as useCartState } from '../context/CartContext';

const AddToCart = ({ 
  product, 
  className = '', 
  children,
  showQuantity = true,
  disabled = false 
}) => {
  const { state: cartState, dispatch: cartDispatch } = useCartState();

  // Get current quantity of this item in cart
  const getCurrentQuantity = () => {
    if (!product) return 0;
    const existingItem = cartState.cart.find(cartItem => cartItem._id === product._id);
    return existingItem?.quantity || 0;
  };

  // Handle add to cart logic
  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!product || disabled) return;
    
    const existingItem = cartState.cart.find(cartItem => cartItem._id === product._id);
    
    // Create cart item with consistent structure
    const newItem = {
      _id: product._id,
      name: product.name || product.title || 'Product',
      title: product.title || product.name || 'Product',
      price: Number(product.price) || 0,
      image: product.image1 || product.image || '/placeholder.png',
      quantity: 1,
      category: product.category || '',
      alt: product.alt || product.title || product.name || 'Product image'
    };

    if (existingItem) {
      // Update quantity if item already exists
      cartDispatch({
        type: 'UPDATE_QUANTITY',
        _id: product._id,
        quantity: existingItem.quantity + 1
      });
    } else {
      // Add new item to cart
      cartDispatch({
        type: 'ADD_TO_CART',
        item: newItem
      });
    }
  };

  const currentQuantity = getCurrentQuantity();

  return (
    <button 
      onClick={handleAddToCart}
      className={`add-to-cart-btn ${className} ${disabled ? 'disabled' : ''}`}
      disabled={disabled}
      aria-label={`Add ${product?.name || 'product'} to cart`}
    >
      {children || (
        <>
          Add to Cart
          {showQuantity && currentQuantity > 0 && (
            <span className="cart-quantity"> ({currentQuantity})</span>
          )}
        </>
      )}
    </button>
  );
};

export default AddToCart;