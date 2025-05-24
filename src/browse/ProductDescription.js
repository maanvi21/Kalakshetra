import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ProductDescription.css';
import { useStateValue as useCartState } from '../context/CartContext';
import { useStateValue as useWishlistState } from '../context/WishlistContext';
import { useProductState } from '../context/ProductContext';

const ProductDescription = () => {
  const { category, id } = useParams();
  const navigate = useNavigate();
  
  // Get product from context
  const { state: productState } = useProductState();
  const product = productState.selectedProduct;
  
  // State management
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [userComment, setUserComment] = useState('');
  const [userName, setUserName] = useState('');
  const [comments, setComments] = useState([
    {
      id: 1,
      name: "Sarah Johnson",
      comment: "Absolutely beautiful craftsmanship! The colors are vibrant and the quality is exceptional.",
      date: "2024-03-15"
    },
    {
      id: 2,
      name: "Michael Chen",
      comment: "Great product with excellent attention to detail. Shipping was fast and packaging was secure.",
      date: "2024-03-10"
    },
    {
      id: 3,
      name: "Emma Wilson",
      comment: "Perfect addition to my wardrobe. The texture and patterns are even more beautiful in person.",
      date: "2024-03-08"
    }
  ]);

  // Context for cart and wishlist
  const { state: cartState, dispatch: cartDispatch } = useCartState();
  const { state: wishlistState, dispatch: wishlistDispatch } = useWishlistState();

  // Validate product data on component mount
  useEffect(() => {
    console.log('ProductDescription mounted');
    console.log('URL params - category:', category, 'id:', id);
    console.log('Product from context:', product);
    
    // Check if we have the product and if it matches the URL
    if (!product) {
      console.warn('No product found in context');
    } else if (product._id !== id) {
      console.warn('Product ID mismatch:', product._id, 'vs', id);
    } else {
      console.log('Product successfully loaded from context');
    }
  }, [product, category, id]);

  // Get available images
  const getProductImages = () => {
    if (!product) return ['/placeholder.png'];
    
    const images = [];
    if (product.image1) images.push(product.image1);
    if (product.image2) images.push(product.image2);
    if (product.image3) images.push(product.image3);
    
    return images.length > 0 ? images : ['/placeholder.png'];
  };

  // Handle image navigation
  const handleImageChange = (index) => {
    setCurrentImageIndex(index);
  };

  // Handle comment submission
  const handleSubmitComment = (e) => {
    e.preventDefault();
    if (userComment.trim() && userName.trim()) {
      const newComment = {
        id: comments.length + 1,
        name: userName.trim(),
        comment: userComment.trim(),
        date: new Date().toISOString().split('T')[0]
      };
      setComments([newComment, ...comments]);
      setUserComment('');
      setUserName('');
    }
  };

  // Check if item is in wishlist
  const isItemInWishlist = (itemId) => {
    return wishlistState?.wishlist?.some(wishlistItem => wishlistItem._id === itemId) || false;
  };

  // Handle add to cart
  const handleAddToCart = () => {
    if (!product) return;
    
    const existingItem = cartState.cart.find(cartItem => cartItem._id === product._id);
    const newItem = {
      _id: product._id,
      name: product.name || product.title || 'Product',
      title: product.title || product.name || 'Product',
      price: Number(product.price) || 0,
      image: product.image1 || '/placeholder.png',
      quantity: 1,
      
    };

    if (existingItem) {
      cartDispatch({
        type: 'UPDATE_QUANTITY',
        _id: product._id,
        quantity: existingItem.quantity + 1
      });
    } else {
      cartDispatch({
        type: 'ADD_TO_CART',
        item: newItem
      });
    }
  };

  // Handle wishlist toggle
  const handleWishlistToggle = () => {
    if (!product) return;
    
    const isInWishlist = isItemInWishlist(product._id);
    if (isInWishlist) {
      wishlistDispatch({ type: 'REMOVE_FROM_WISHLIST', _id: product._id });
    } else {
      wishlistDispatch({
        type: 'ADD_TO_WISHLIST',
        item: {
          _id: product._id,
          title: product.title || product.name || 'Product',
          name: product.name || product.title || 'Product',
          image: product.image1 || '/placeholder.png',
          price: product.price || 0,
          alt: product.alt || product.title || 'Product image',
        }
      });
    }
  };

  // Error state - No product found in context
  if (!product) {
    return (
      <div className="error-container">
        <h2>Product Not Found</h2>
        <p>No product data available. Please navigate to this page from the product list.</p>
        <div className="debug-info">
          <p><strong>Category:</strong> {category}</p>
          <p><strong>Product ID:</strong> {id}</p>
          <p><strong>Current URL:</strong> {window.location.pathname}</p>
          <p><strong>Context State:</strong> {product ? 'Product found' : 'No product in context'}</p>
        </div>
        <button onClick={() => navigate(-1)} className="back-button">
          Go Back
        </button>
      </div>
    );
  }

  // ID mismatch warning
  if (product._id !== id) {
    console.warn('Product ID mismatch detected');
  }

  const productImages = getProductImages();
  const currentQuantity = cartState.cart.find(cartItem => cartItem._id === product._id)?.quantity || 0;

  return (
    <div className="product-container">
      {/* Back button */}
      <button onClick={() => navigate(-1)} className="back-button">
        ← Back to Products
      </button>

      <div className="product-content">
        {/* Image Gallery Section */}
        <div className="image-gallery">
          <div className="main-image">
            <img 
              src={productImages[currentImageIndex]} 
              alt={product.name || product.title || 'Product'} 
              className="product-image"
              onError={(e) => {
                e.target.src = '/placeholder.png';
              }}
            />
          </div>
          {productImages.length > 1 && (
            <div className="thumbnail-container">
              {productImages.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`${product.name || 'Product'} ${index + 1}`}
                  className={`thumbnail ${index === currentImageIndex ? 'active' : ''}`}
                  onClick={() => handleImageChange(index)}
                  onError={(e) => {
                    e.target.src = '/placeholder.png';
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Product Details Section */}
        <div className="product-details">
          <div className="product-header">
            <h1 className="product-title">{product.name || product.title || 'Product'}</h1>
            <div className="product-info">
              <span className="product-category">{product.category || category}</span>
              <span className="review-count">({comments.length} comments)</span>
            </div>
          </div>

          <div className="product-price">
            <span className="current-price">₹{product.price || 0}</span>
          </div>

          <div className="product-description">
            <h3>Product Description</h3>
            <p>
              {product.description || 'This exquisite product represents the pinnacle of traditional craftsmanship, where every detail tells a story of culture and care. Handcrafted by skilled artisans using time-honored techniques passed down through generations, this piece seamlessly fuses tradition with contemporary design.'}
            </p>
          </div>

          <div className="product-actions">
            <button 
              onClick={handleAddToCart}
              className="add-to-cart-btn"
            >
              Add to Cart {currentQuantity > 0 && `(${currentQuantity})`}
            </button>
            
            <button 
              onClick={handleWishlistToggle}
              className={`wishlist-btn ${isItemInWishlist(product._id) ? 'active' : ''}`}
            >
              {isItemInWishlist(product._id) ? '❤️ Remove from Wishlist' : '🤍 Add to Wishlist'}
            </button>
          </div>

          <div className="product-meta">
            <p><strong>Product ID:</strong> {product._id}</p>
            <p><strong>Category:</strong> {product.category || category}</p>
            {product.createdAt && (
              <p><strong>Added:</strong> {new Date(product.createdAt).toLocaleDateString()}</p>
            )}
          </div>
        </div>
      </div>

      {/* Comments Section */}
      <div className="comments-section">
        <h2 className="comments-title">Customer Comments</h2>
        
        {/* Add Comment Form */}
        <div className="add-comment">
          <h3>Leave a Comment</h3>
          <form onSubmit={handleSubmitComment} className="comment-form">
            <div className="name-input">
              <label htmlFor="user-name">Your Name:</label>
              <input
                type="text"
                id="user-name"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Enter your name..."
                required
              />
            </div>
            <div className="comment-input">
              <label htmlFor="comment-text">Your Comment:</label>
              <textarea
                id="comment-text"
                value={userComment}
                onChange={(e) => setUserComment(e.target.value)}
                placeholder="Share your thoughts about this product..."
                rows="4"
                required
              />
            </div>
            <button type="submit" className="submit-comment-btn">
              Post Comment
            </button>
          </form>
        </div>

        {/* Display Comments */}
        <div className="comments-list">
          {comments.map((comment) => (
            <div key={comment.id} className="comment-item">
              <div className="comment-header">
                <div className="commenter-info">
                  <span className="commenter-name">{comment.name}</span>
                  <span className="comment-date">{new Date(comment.date).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}</span>
                </div>
              </div>
              <p className="comment-text">{comment.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDescription;