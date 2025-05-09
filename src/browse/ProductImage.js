import React from 'react';

export default function ProductImage({ src, alt, className = '', size = 'medium' }) {
  // If there's no source, return a placeholder
  if (!src) {
    return <div className={`product-image-placeholder ${className}`}>No Image</div>;
  }

  // Handle different size presets
  const sizeStyles = {
    small: { width: '50px', height: '50px' },
    medium: { width: '100px', height: '100px' },
    large: { width: '200px', height: '200px' },
    custom: {} // For custom sizes passed via className
  };

  const style = sizeStyles[size] || sizeStyles.medium;

  return (
    <img
      src={src}
      alt={'Product image'}
      className={`product-image ${className}`}
      style={{ 
        ...style, 
        objectFit: 'cover',
        borderRadius: '4px',
        border: '1px solid #ddd' 
      }}
      onError={(e) => {
        e.target.onerror = null;
        e.target.src = e.target.src ='https://placehold.co/100x100?text=No+Image';;
        ;
      }}
    />
  );
}