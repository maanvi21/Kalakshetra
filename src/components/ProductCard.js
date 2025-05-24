import React, { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProductCard.css';
import Button from './Button';
import { useStateValue as useWishlistState } from '../context/WishlistContext';
import { useStateValue as useCartState } from '../context/CartContext';
import { useProductState } from '../context/ProductContext';
import OperationsButton from './OperationsButton';

export default function ProductCard({ item }) {
  // for the description button 
  const navigate = useNavigate();
  const { dispatch: productDispatch } = useProductState();
  
  const handleDescriptionClick = useCallback(() => {
    // Debug logging to see what data we have
    console.log('ProductCard item data:', item);
    console.log('Category:', item?.category);
    console.log('ID:', item?._id);
    
    if (item?._id) {
      // Determine category from current URL or item data
      const currentPath = window.location.pathname;
      let category = item.category || item.type;
      
      // If no category in item, infer from current page URL
      if (!category) {
        if (currentPath.includes('/men') || currentPath.includes('men')) {
          category = 'men';
        } else if (currentPath.includes('/women') || currentPath.includes('women')) {
          category = 'women';
        } else if (currentPath.includes('/accessories') || currentPath.includes('accessories')) {
          category = 'accessories';
        } else if (currentPath.includes('/bags') || currentPath.includes('bags')) {
          category = 'bags';
        } else {
          // Default fallback - you might need to adjust this based on your routing
          category = 'men'; // or whatever your default category should be
        }
      }
      
      // Store the complete product data in context
      productDispatch({
        type: 'SET_SELECTED_PRODUCT',
        product: {
          ...item,
          // Ensure we have all necessary fields
          _id: item._id,
          name: item.name || item.title,
          title: item.title || item.name,
          price: item.price,
          category: category,
          image1: item.image1,
          image2: item.image2,
          image3: item.image3,
          description: item.description,
          alt: item.alt,
          createdAt: item.createdAt
        }
      });

      console.log('Determined category:', category);
      console.log('Navigating to:', `/${category}/${item._id}`);
      navigate(`/${category}/${item._id}`);
    } else {
      console.error('ProductCard: Missing _id for navigation. Item:', item);
      // Optionally show user-friendly error
      alert('Unable to view product details. Please try again.');
    }
  }, [navigate, item, productDispatch]);

  //context initialization
  const { state: wishlistState, dispatch: wishlistDispatch } = useWishlistState();
  const { state: cartState, dispatch: cartDispatch } = useCartState();

  useEffect(() => {
    console.log('ProductCard mounted - Cart state:', cartState);
    console.log('Wishlist state:', wishlistState);
    // Debug the item data when component mounts
    console.log('ProductCard item:', item);
  }, [cartState, wishlistState, item]);

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

  // Early return if item is not properly defined
  if (!item || !item._id) {
    console.error('ProductCard: Invalid item data:', item);
    return (
      <div className="product-card-container">
        <div className="prod_container error-state">
          <p>Error: Invalid product data</p>
        </div>
      </div>
    );
  }

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
            <OperationsButton text="Description" onClick={handleDescriptionClick}/>
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