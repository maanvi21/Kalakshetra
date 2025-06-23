import React, { useState } from 'react';
import './AdminManagement.css';
import Button from '../components/Button';
import AdminHeader from "../components/admin-components/AdminHeader.js";
import ProductImage from '../browse/ProductImage.js';

export default function AdminManagement() {
  const [activeCategory, setActiveCategory] = useState(null);
  const [activeSubcategory, setActiveSubcategory] = useState(null);
  const [subcategoryDisplay, setSubcategoryDisplay] = useState(null); // For display purposes
  const [files, setFiles] = useState({
    image1: null,
    image2: null,
    image3: null,
   
  });
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [items, setItems] = useState([]);
  const [viewItems, setViewItems] = useState(false);
  const [showUpload, setShowUpload] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editingItem, setEditingItem] = useState(null);
  const [imagePreviews, setImagePreviews] = useState({
    image1: null,
    image2: null,
    image3: null,
 
  });

  // Helper function to format price for display
  const formatPrice = (price) => {
    const numPrice = parseFloat(price) || 0;
    return numPrice.toFixed(2);
  };

  // Handle file select for image preview
  const handleFileChange = (e, imageKey) => {
    const selectedFile = e.target.files[0];
    
    // Update the files state
    setFiles(prev => ({
      ...prev,
      [imageKey]: selectedFile
    }));
    
    // Create a preview for the selected image
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviews(prev => ({
          ...prev,
          [imageKey]: reader.result
        }));
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setImagePreviews(prev => ({
        ...prev,
        [imageKey]: null
      }));
    }
  };

  const handleDeleteItem = async (itemId) => {
    if (!window.confirm('Are you sure you want to delete this item?')) {
      return;
    }
    
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await fetch(
        `https://kalakshetra3-6.onrender.com/${activeCategory}/delete/${activeSubcategory}/${itemId}`, 
        { method: 'DELETE' }
      );
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }
      
      // Remove the deleted item from the state
      setItems(items.filter(item => item._id !== itemId));
      alert('Item deleted successfully!');
    } catch (err) {
      setError(`Failed to delete item: ${err.message}`);
      console.error('Delete error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditItem = (item) => {
    setEditingItem(item);
    setName(item.name);
    setDescription(item.description);
    setPrice(item.price.toString()); // Ensure it's a string for the input
    
    // Set the current images as previews
    setImagePreviews({
      image1: item.image1 || null,
      image2: item.image2 || null,
      image3: item.image3 || null,
      
    });
    
    setShowUpload(true);
    setViewItems(false);
  };

  const handleUpdate = async () => {
    if (!editingItem || !name || !description || !price || !imagePreviews.image1) {
      return alert('Please fill out all required fields including the primary image.');
    }
    
    try {
      setIsLoading(true);
      setError(null);
      
      const formData = new FormData();
      const priceValue = parseFloat(price) || 0;
      
      // Only append the files if new ones were selected
      if (files.image1) formData.append('image1', files.image1);
      if (files.image2) formData.append('image2', files.image2);
      if (files.image3) formData.append('image3', files.image3);
      
      formData.append('name', name);
      formData.append('description', description);
      formData.append('price', priceValue.toString());
      formData.append('category', activeCategory);
      
      const hasNewImages = files.image1 || files.image2 || files.image3;
      
      const response = await fetch(
        `https://kalakshetra3-6.onrender.com/${activeCategory}/update/${activeSubcategory}/${editingItem._id}`,
        {
          method: 'PUT',
          // If we have any new files, send as FormData, otherwise as JSON
          ...(hasNewImages 
            ? { body: formData } 
            : {
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  name,
                  description,
                  price: priceValue,
                  category: activeCategory
                })
              }
          )
        }
      );
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }
      
      alert('Item updated successfully!');
      
      // Reset form
      resetForm();
      
      // Refresh the items list
      handleViewItems();
    } catch (err) {
      setError(`Failed to update item: ${err.message}`);
      console.error('Update error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setName('');
    setDescription('');
    setPrice('');
    setFiles({
      image1: null,
      image2: null,
      image3: null,
      
    });
    setEditingItem(null);
    setImagePreviews({
      image1: null,
      image2: null,
      image3: null,
      
    });
    
    // Reset file inputs
    const fileInputs = document.querySelectorAll('input[type="file"]');
    fileInputs.forEach(input => {
      if (input) input.value = '';
    });
  };

  const handleCategoryClick = (category) => {
    setActiveCategory(activeCategory === category ? null : category);
    setActiveSubcategory(null);
    setSubcategoryDisplay(null);
    setViewItems(false);
    setShowUpload(false);
    resetForm();
  };

  const handleSubcategoryClick = (subcategory, displayName) => {
    // Store lowercase for API requests
    const subcategoryLower = subcategory.toLowerCase();
    setActiveSubcategory(activeSubcategory === subcategoryLower ? null : subcategoryLower);
    setSubcategoryDisplay(displayName || subcategory);
    setViewItems(false);
    setShowUpload(false);
    resetForm();
  };

  const handleUpload = async () => {
    if (!files.image1 || !name || !description || !price) {
      return alert('Please fill out all required fields and select a primary image (Image 1).');
    }

    try {
      setIsLoading(true);
      setError(null);
      
      const formData = new FormData();
      const priceValue = parseFloat(price) || 0;
      
      formData.append('image1', files.image1);
      if (files.image2) formData.append('image2', files.image2);
      if (files.image3) formData.append('image3', files.image3);
      
      formData.append('name', name);
      formData.append('description', description);
      formData.append('price', priceValue.toString());
      formData.append('category', activeCategory);

      const apiUrl = `https://kalakshetra3-6.onrender.com/${activeCategory}/add/${activeSubcategory}`;
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }

      const result = await response.json();
      
      resetForm();
      
      alert('Product uploaded successfully!');
      
      if (viewItems) {
        handleViewItems();
      }
    } catch (err) {
      setError(`Failed to upload product: ${err.message}`);
      console.error('Upload error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // 1. Add debugging to your handleViewItems function
  const handleViewItems = async () => {
    if (!activeCategory || !activeSubcategory) return;
    try {
      setIsLoading(true);
      setError(null);
      
      console.log('Fetching items for:', { activeCategory, activeSubcategory });
      
      const response = await fetch(`https://kalakshetra3-6.onrender.com/${activeCategory}/fetch/${activeSubcategory}`);
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }
      
      const data = await response.json();
      
      // DEBUG: Log the response to see what's actually returned
      console.log('API Response:', data);
      console.log('Items count:', data.items ? data.items.length : 'No items array');
      console.log('Items:', data.items);
      
      setItems(data.items || []); // Ensure items is always an array
      setViewItems(true);
      setShowUpload(false);
    } catch (err) {
      setError(`Failed to fetch items: ${err.message}`);
      console.error('Fetch error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // 2. Add a function to clear cache and force refresh
  const forceRefresh = async () => {
    if (!activeCategory || !activeSubcategory) return;
    
    try {
      setIsLoading(true);
      // Clear React state
      setItems([]);
      
      // Clear any browser cache headers
      const response = await fetch(`https://kalakshetra3-6.onrender.com/${activeCategory}/fetch/${activeSubcategory}`, {
        method: 'GET',
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache',
          'Expires': '0'
        }
      });
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log('Force refresh data:', data);
      setItems(data.items || []);
      setViewItems(true);
    } catch (err) {
      setError(`Failed to force refresh: ${err.message}`);
      console.error('Force refresh error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // 3. Add a function to check all categories (in case items are in wrong category)
  const checkAllCategories = async () => {
    const categories = ['women', 'men', 'bags', 'accessories'];
    const subcategories = {
      women: ['kurtis', 'sarees', 'tops', 'trousers'],
      men: ['shirts', 'trousers', 'jackets', 'shoes'],
      bags: ['handbags', 'totes', 'wallets', 'backpacks'],
      accessories: ['earrings', 'necklaces', 'rings', 'bracelets', 'watches']
    };
    
    console.log('Checking all categories for items...');
    
    for (const category of categories) {
      for (const subcategory of subcategories[category]) {
        try {
          const response = await fetch(`https://kalakshetra3-6.onrender.com/${category}/fetch/${subcategory}`);
          if (response.ok) {
            const data = await response.json();
            if (data.items && data.items.length > 0) {
              console.log(`Found ${data.items.length} items in ${category}/${subcategory}:`, data.items);
            }
          }
        } catch (err) {
          console.log(`Error checking ${category}/${subcategory}:`, err.message);
        }
      }
    }
    console.log('Finished checking all categories. Check console for results.');
  };

  return (
    <> 
      <AdminHeader />
      <div className="admin-management">
        <h2>Admin Management</h2>
        {/* Category Buttons */}
        <div className="category-buttons">
          <Button text='Women' onClick={() => handleCategoryClick('women')} />
          <Button text='Men' onClick={() => handleCategoryClick('men')} />
          <Button text='Bags' onClick={() => handleCategoryClick('bags')} />
          <Button text='Accessories' onClick={() => handleCategoryClick('accessories')} />
        </div>

        {/* Category Options */}
        {activeCategory === 'women' && (
          <div className="women-options">
            <Button text='Kurtis' onClick={() => handleSubcategoryClick('kurtis', 'Kurtis')} />
            <Button text='Sarees' onClick={() => handleSubcategoryClick('sarees', 'Sarees')} />
            <Button text='Tops' onClick={() => handleSubcategoryClick('tops', 'Tops')} />
            <Button text='Trousers' onClick={() => handleSubcategoryClick('trousers', 'Trousers')} />
          </div>
        )}
        {activeCategory === 'men' && (
          <div className="men-options">
            <Button text='Shirts' onClick={() => handleSubcategoryClick('shirts', 'Shirts')} />
            <Button text='Trousers' onClick={() => handleSubcategoryClick('trousers', 'Trousers')} />
            <Button text='Jackets' onClick={() => handleSubcategoryClick('jackets', 'Jackets')} />
            <Button text='Shoes' onClick={() => handleSubcategoryClick('shoes', 'Shoes')} />
          </div>
        )}
        {activeCategory === 'bags' && (
          <div className="bag-options">
            <Button text='Handbags' onClick={() => handleSubcategoryClick('handbags', 'Handbags')} />
            <Button text='Totes' onClick={() => handleSubcategoryClick('totes', 'Totes')} />
            <Button text='Wallets' onClick={() => handleSubcategoryClick('wallets', 'Wallets')} />
            <Button text='Backpacks' onClick={() => handleSubcategoryClick('backpacks', 'Backpacks')} />
          </div>
        )}
       
        {activeCategory === 'accessories' && (
          <div className="accessory-options">
            <Button text='Earrings' onClick={() => handleSubcategoryClick('earrings', 'Earrings')} />
            <Button text='Necklaces' onClick={() => handleSubcategoryClick('necklaces', 'Necklaces')} />
            <Button text='Rings' onClick={() => handleSubcategoryClick('rings', 'Rings')} />
            <Button text='Bracelets' onClick={() => handleSubcategoryClick('bracelets', 'Bracelets')} />
            <Button text='Watches' onClick={() => handleSubcategoryClick('watches', 'Watches')} />
          </div>
        )}

        {/* Actions and Upload Form */}
        {activeSubcategory && (
          <div className="admin-actions">
            <h3>{subcategoryDisplay} Management</h3>
            <Button text='Upload' onClick={() => { setShowUpload(true); setViewItems(false); resetForm(); }} />
            <Button text='View' onClick={handleViewItems} />

            
            {/* Add this temporarily for debugging */}
            <div style={{marginTop: '10px', padding: '10px', border: '1px solid #ccc', backgroundColor: '#f5f5f5'}}>
              <h4>Debug Info:</h4>
              <p>Active Category: {activeCategory}</p>
              <p>Active Subcategory: {activeSubcategory}</p>
              <p>Items Count: {items.length}</p>
              <p>API URL: https://kalakshetra3-6.onrender.com/{activeCategory}/fetch/{activeSubcategory}</p>
              <p>View Items State: {viewItems ? 'true' : 'false'}</p>
            </div>
            
            {showUpload && (
              <div className="upload-section">
                <h3>{editingItem ? 'Update Product' : 'Add New Product'}</h3>
                <div className="form-group">
                  <label htmlFor="name">Product Name:</label>
                  <input 
                    id="name"
                    type="text" 
                    placeholder="Product Name" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="description">Description:</label>
                  <textarea 
                    id="description"
                    placeholder="Description" 
                    value={description} 
                    onChange={(e) => setDescription(e.target.value)} 
                    rows="3"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="price">Price:</label>
                  <input 
                    id="price"
                    type="number" 
                    step="0.01"
                    min="0"
                    placeholder="Price" 
                    value={price} 
                    onChange={(e) => setPrice(e.target.value)} 
                  />
                </div>
                
                {/* Image Upload Fields */}
                <div className="form-group">
                  <label htmlFor="image1">Primary Image (Required):</label>
                  <input 
                    id="image1"
                    type="file" 
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, 'image1')}
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="image2">Additional Image 1 (Optional):</label>
                  <input 
                    id="image2"
                    type="file" 
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, 'image2')}
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="image3">Additional Image 2 (Optional):</label>
                  <input 
                    id="image3"
                    type="file" 
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, 'image3')}
                  />
                </div>
                
                {/* Image Preview Section */}
                <div className="image-previews">
                  {imagePreviews.image1 && (
                    <div className="image-preview">
                      <h4>Primary Image:</h4>
                      <ProductImage 
                        src={imagePreviews.image1} 
                        alt={`${name || "Product"} primary image`} 
                        size="medium"
                      />
                    </div>
                  )}
                  
                  {imagePreviews.image2 && (
                    <div className="image-preview">
                      <h4>Additional Image 1:</h4>
                      <ProductImage 
                        src={imagePreviews.image2} 
                        alt={`${name || "Product"} additional image 1`} 
                        size="medium"
                      />
                    </div>
                  )}
                  
                  {imagePreviews.image3 && (
                    <div className="image-preview">
                      <h4>Additional Image 2:</h4>
                      <ProductImage 
                        src={imagePreviews.image3} 
                        alt={`${name || "Product"} additional image 2`} 
                        size="medium"
                      />
                    </div>
                  )}
                </div>
                
                <div className="form-actions">
                  {editingItem ? (
                    <>
                      <Button text='Update Product' onClick={handleUpdate} />
                      <Button text='Cancel' onClick={resetForm} />
                    </>
                  ) : (
                    <Button text='Upload Product' onClick={handleUpload} />
                  )}
                </div>
                
                {isLoading && <p className="loading-indicator">Processing...</p>}
                {error && <p className="error-message">{error}</p>}
              </div>
            )}
          </div>
        )}

        {/* Display Items */}
        {viewItems && (
          <div className="items-list">
            <h3>Items in {subcategoryDisplay}</h3>
            {isLoading ? (
              <p>Loading items...</p>
            ) : error ? (
              <p className="error">{error}</p>
            ) : items.length === 0 ? (
              <p>No items found in this category.</p>
            ) : (
              <table className="items-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Price</th>
                    <th>Images</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => (
                    <tr key={item._id}>
                      <td>{item._id.substring(0, 8)}...</td>
                      <td>{item.name}</td>
                      <td>{item.description.length > 50 ? `${item.description.substring(0, 50)}...` : item.description}</td>
                      <td>₹{formatPrice(item.price)}</td>
                      <td className="image-cell">
                        <ProductImage 
                          src={item.image1} 
                          alt={`${item.name} primary`} 
                          size="small"
                        />
                        {item.image2 && (
                          <div className="thumbnail">
                            <ProductImage 
                              src={item.image2} 
                              alt={`${item.name} additional 1`} 
                              size="small"
                            />
                          </div>
                        )}
                        {item.image3 && (
                          <div className="thumbnail">
                            <ProductImage 
                              src={item.image3} 
                              alt={`${item.name} additional 2`} 
                              size="small"
                            />
                          </div>
                        )}
                      </td>
                      <td className="actions-column">
                        <button 
                          className="edit-button" 
                          onClick={() => handleEditItem(item)}
                        >
                          Edit
                        </button>
                        <button 
                          className="delete-button" 
                          onClick={() => handleDeleteItem(item._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>
    </>
  );
}