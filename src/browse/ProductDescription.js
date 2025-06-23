import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ProductDescription.css';
import { useProductState } from '../context/ProductContext';
import AddToCartButton from './AddToCart';

import AddToWishlistButton from './AddToWishlist';


const ProductDescription = () => {
  const { category, id } = useParams();
  const navigate = useNavigate();
  
  // Get product from context
  const { state: productState } = useProductState();
  const product = productState.selectedProduct;
  
  // State management
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  

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
            <AddToCartButton 
              product={product}
              className="primary-action"
              showQuantity={true}
            />
            
            <AddToWishlistButton 
              product={product}
              className="secondary-action"
              variant="outline"
            />
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

  
    </div>
  );
};

export default ProductDescription;