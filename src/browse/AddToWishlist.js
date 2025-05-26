import React from 'react';
import { useStateValue as useWishlistState } from '../context/WishlistContext';


const AddToWishlist= ({ 
  product, 
  className = '', 
  children,
  iconOnly = false,
  disabled = false,
  variant = 'default' // 'default', 'outline', 'icon-only'
}) => {
  const { state: wishlistState, dispatch: wishlistDispatch } = useWishlistState();

  // Check if item is in wishlist
  const isItemInWishlist = (itemId) => {
    if (!itemId || !wishlistState?.wishlist) return false;
    return wishlistState.wishlist.some(wishlistItem => wishlistItem._id === itemId);
  };

  // Handle wishlist toggle
  const handleWishlistToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!product || disabled) return;
    
    const isInWishlist = isItemInWishlist(product._id);
    
    if (isInWishlist) {
      // Remove from wishlist
      wishlistDispatch({ 
        type: 'REMOVE_FROM_WISHLIST', 
        _id: product._id 
      });
    } else {
      // Add to wishlist
      const wishlistItem = {
        _id: product._id,
        title: product.title || product.name || 'Product',
        name: product.name || product.title || 'Product',
        image: product.image1 || product.image || '/placeholder.png',
        price: Number(product.price) || 0,
        alt: product.alt || product.title || product.name || 'Product image',
        category: product.category || '',
        description: product.description || '',
        createdAt: product.createdAt || new Date().toISOString()
      };
      
      wishlistDispatch({
        type: 'ADD_TO_WISHLIST',
        item: wishlistItem
      });
    }
  };

  const isInWishlist = isItemInWishlist(product?._id);
  
  // Determine button content based on props and state
  const getButtonContent = () => {
    if (children) return children;
    
    if (iconOnly || variant === 'icon-only') {
      return isInWishlist ? '❤️' : '🤍';
    }
    
    return (
      <>
        <span className="wishlist-icon">
          {isInWishlist ? '❤️' : '🤍'}
        </span>
        <span className="wishlist-text">
          {isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
        </span>
      </>
    );
  };

  const buttonClasses = [
    'wishlist-btn',
    className,
    isInWishlist ? 'active' : '',
    variant,
    disabled ? 'disabled' : '',
    iconOnly || variant === 'icon-only' ? 'icon-only' : ''
  ].filter(Boolean).join(' ');

  return (
    <button 
      onClick={handleWishlistToggle}
      className={buttonClasses}
      disabled={disabled}
      aria-label={
        isInWishlist 
          ? `Remove ${product?.name || 'product'} from wishlist`
          : `Add ${product?.name || 'product'} to wishlist`
      }
      title={
        isInWishlist 
          ? 'Remove from wishlist'
          : 'Add to wishlist'
      }
    >
      {getButtonContent()}
    </button>
  );
};

export default AddToWishlist;