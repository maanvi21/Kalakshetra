import React, { useState } from 'react';
import './AdminManagement.css';
import Button from '../components/Button';
import AdminHeader from "../components/admin-components/AdminHeader.js";
import ProductImage from '../browse/ProductImage.js'; // Import the new component

export default function AdminManagement() {
  const [activeCategory, setActiveCategory] = useState(null);
  const [activeSubcategory, setActiveSubcategory] = useState(null);
  const [file, setFile] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [items, setItems] = useState([]);
  const [viewItems, setViewItems] = useState(false);
  const [showUpload, setShowUpload] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editingItem, setEditingItem] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  // Handle file select for image preview
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    
    // Create a preview for the selected image
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setImagePreview(null);
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
        `http://localhost:5000/${activeCategory}/delete/${activeSubcategory}/${itemId}`, 
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
    setPrice(item.price);
    setImagePreview(item.image); // Set the current image as preview
    setShowUpload(true);
    setViewItems(false);
  };

  const handleUpdate = async () => {
    if (!editingItem || !name || !description || !price) {
      return alert('Please fill out all fields.');
    }
    
    try {
      setIsLoading(true);
      setError(null);
      
      const formData = new FormData();
      
      // Only append the file if a new one was selected
      if (file) {
        formData.append('image', file);
      }
      
      formData.append('name', name);
      formData.append('description', description);
      formData.append('price', price);
      formData.append('category', activeCategory);
      
      const response = await fetch(
        `http://localhost:5000/${activeCategory}/update/${activeSubcategory}/${editingItem._id}`,
        {
          method: 'PUT',
          // If we have a file, send as FormData, otherwise as JSON
          ...(file 
            ? { body: formData } 
            : {
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  name,
                  description,
                  price,
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
    setFile(null);
    setEditingItem(null);
    setImagePreview(null);
    
    // Reset file input
    const fileInput = document.querySelector('input[type="file"]');
    if (fileInput) fileInput.value = '';
  };

  const handleCategoryClick = (category) => {
    setActiveCategory(activeCategory === category ? null : category);
    setActiveSubcategory(null);
    setViewItems(false);
    setShowUpload(false);
    resetForm();
  };

  const handleSubcategoryClick = (subcategory) => {
    setActiveSubcategory(activeSubcategory === subcategory ? null : subcategory);
    setViewItems(false);
    setShowUpload(false);
    resetForm();
  };

  const handleUpload = async () => {
    if (!file || !name || !description || !price) {
      return alert('Please fill out all fields and select a file.');
    }

    try {
      setIsLoading(true);
      setError(null);
      
      const formData = new FormData();
      formData.append('image', file);
      formData.append('name', name);
      formData.append('description', description);
      formData.append('price', price);
      formData.append('category', activeCategory);
      formData.append('subcategory', activeSubcategory);

      const apiUrl = `http://localhost:5000/${activeCategory}/add/${activeSubcategory}`;
      
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

  const handleViewItems = async () => {
    if (!activeCategory || !activeSubcategory) return;
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await fetch(`http://localhost:5000/${activeCategory}/fetch/${activeSubcategory}`);
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }
      
      const data = await response.json();
      setItems(data.items);
      setViewItems(true);
      setShowUpload(false);
    } catch (err) {
      setError(`Failed to fetch items: ${err.message}`);
      console.error('Fetch error:', err);
    } finally {
      setIsLoading(false);
    }
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
            <Button text='Kurtis' onClick={() => handleSubcategoryClick('Kurtis')} />
            <Button text='Sarees' onClick={() => handleSubcategoryClick('Sarees')} />
            <Button text='Tops' onClick={() => handleSubcategoryClick('Tops')} />
            <Button text='Trousers' onClick={() => handleSubcategoryClick('Trousers')} />
          </div>
        )}
        {activeCategory === 'men' && (
          <div className="men-options">
            <Button text='Shirts' onClick={() => handleSubcategoryClick('shirts')} />
            <Button text='Trousers' onClick={() => handleSubcategoryClick('trousers')} />
            <Button text='Jackets' onClick={() => handleSubcategoryClick('jackets')} />
            <Button text='Shoes' onClick={() => handleSubcategoryClick('shoes')} />
          </div>
        )}
        {activeCategory === 'bags' && (
          <div className="bag-options">
            <Button text='Handbags' onClick={() => handleSubcategoryClick('Handbags')} />
            <Button text='Totes' onClick={() => handleSubcategoryClick('Totes')} />
            <Button text='Wallets' onClick={() => handleSubcategoryClick('Wallets')} />
            <Button text='Backpacks' onClick={() => handleSubcategoryClick('Backpacks')} />
          </div>
        )}
       
        {activeCategory === 'accessories' && (
          <div className="accessory-options">
            <Button text='Earrings' onClick={() => handleSubcategoryClick('Earrings')} />
            <Button text='Necklaces' onClick={() => handleSubcategoryClick('Necklaces')} />
            <Button text='Rings' onClick={() => handleSubcategoryClick('Rings')} />
            <Button text='Bracelets' onClick={() => handleSubcategoryClick('Bracelets')} />
            <Button text='Watches' onClick={() => handleSubcategoryClick('Watches')} />
          </div>
        )}

        {/* Actions and Upload Form */}
        {activeSubcategory && (
          <div className="admin-actions">
            <h3>{activeSubcategory} Management</h3>
            <Button text='Upload' onClick={() => { setShowUpload(true); setViewItems(false); resetForm(); }} />
            <Button text='View' onClick={handleViewItems} />
            
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
                    placeholder="Price" 
                    value={price} 
                    onChange={(e) => setPrice(e.target.value)} 
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="image">Product Image:</label>
                  <input 
                    id="image"
                    type="file" 
                    accept="image/*"
                    onChange={handleFileChange} 
                  />
                </div>
                
                {/* Image Preview Section */}
                {imagePreview && (
                  <div className="image-preview">
                    <h4>Image Preview:</h4>
                    <ProductImage 
                      src={imagePreview} 
                      alt={name || "Product preview"} 
                      size="medium"
                    />
                  </div>
                )}
                
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
            <h3>Items in {activeSubcategory}</h3>
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
                    <th>Image</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => (
                    <tr key={item._id}>
                      <td>{item._id.substring(0, 8)}...</td>
                      <td>{item.name}</td>
                      <td>{item.description.length > 50 ? `${item.description.substring(0, 50)}...` : item.description}</td>
                      <td>₹{item.price}</td>
                      <td>
                        <ProductImage 
                          src={item.image} 
                          alt={item.name} 
                          size="small"
                        />
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