import React, { useState, useEffect } from 'react';
import './AdminManagement.css';
import Button from '../components/Button';
import AdminHeader from "../components/admin-components/AdminHeader.js";
import ProductImage from '../browse/ProductImage.js';

const BASE_URL = 'https://kalakshetra3-5.onrender.com';

export default function AdminManagement() {
  const [activeCategory, setActiveCategory] = useState(null);
  const [activeSubcategory, setActiveSubcategory] = useState(null);
  const [subcategoryDisplay, setSubcategoryDisplay] = useState(null);
  const [files, setFiles] = useState({ image1: null, image2: null, image3: null });
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [items, setItems] = useState([]);
  const [viewItems, setViewItems] = useState(false);
  const [showUpload, setShowUpload] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editingItem, setEditingItem] = useState(null);
  const [imagePreviews, setImagePreviews] = useState({ image1: null, image2: null, image3: null });
  const [serverReady, setServerReady] = useState(false);

  // ✅ Ping the server on mount so Render wakes up before user clicks anything
  useEffect(() => {
    const wakeServer = async () => {
      try {
        await fetch(`${BASE_URL}/health`, { method: 'GET' });
      } catch (_) {
        // Silently ignore — even a failed ping starts the wake-up process
      } finally {
        setServerReady(true);
      }
    };
    wakeServer();
  }, []);

  const formatPrice = (price) => (parseFloat(price) || 0).toFixed(2);

  const handleFileChange = (e, imageKey) => {
    const selectedFile = e.target.files[0];
    setFiles(prev => ({ ...prev, [imageKey]: selectedFile }));
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviews(prev => ({ ...prev, [imageKey]: reader.result }));
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setImagePreviews(prev => ({ ...prev, [imageKey]: null }));
    }
  };

  const handleDeleteItem = async (itemId) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch(
        `${BASE_URL}/${activeCategory}/delete/${activeSubcategory}/${itemId}`,
        { method: 'DELETE' }
      );
      if (!response.ok) throw new Error(`${response.status} - ${response.statusText}`);
      setItems(items.filter(item => item._id !== itemId));
      alert('Item deleted successfully!');
    } catch (err) {
      setError(`Failed to delete item: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditItem = (item) => {
    setEditingItem(item);
    setName(item.name);
    setDescription(item.description);
    setPrice(item.price.toString());
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
      if (files.image1) formData.append('image1', files.image1);
      if (files.image2) formData.append('image2', files.image2);
      if (files.image3) formData.append('image3', files.image3);
      formData.append('name', name);
      formData.append('description', description);
      formData.append('price', parseFloat(price).toString());
      formData.append('category', activeCategory);

      const response = await fetch(
        `${BASE_URL}/${activeCategory}/update/${activeSubcategory}/${editingItem._id}`,
        { method: 'PUT', body: formData }
      );
      if (!response.ok) throw new Error(`${response.status} - ${response.statusText}`);
      alert('Item updated successfully!');
      resetForm();
      handleViewItems();
    } catch (err) {
      setError(`Failed to update item: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setName('');
    setDescription('');
    setPrice('');
    setFiles({ image1: null, image2: null, image3: null });
    setEditingItem(null);
    setImagePreviews({ image1: null, image2: null, image3: null });
    document.querySelectorAll('input[type="file"]').forEach(input => {
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
      formData.append('image1', files.image1);
      if (files.image2) formData.append('image2', files.image2);
      if (files.image3) formData.append('image3', files.image3);
      formData.append('name', name);
      formData.append('description', description);
      formData.append('price', parseFloat(price).toString());
      formData.append('category', activeCategory);

      const response = await fetch(
        `${BASE_URL}/${activeCategory}/add/${activeSubcategory}`,
        { method: 'POST', body: formData }
      );
      if (!response.ok) throw new Error(`${response.status} - ${response.statusText}`);
      resetForm();
      alert('Product uploaded successfully!');
      if (viewItems) handleViewItems();
    } catch (err) {
      setError(`Failed to upload product: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewItems = async () => {
    if (!activeCategory || !activeSubcategory) return;
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch(
        `${BASE_URL}/${activeCategory}/fetch/${activeSubcategory}`,
        { headers: { 'Cache-Control': 'no-cache' } }
      );
      if (!response.ok) throw new Error(`${response.status} - ${response.statusText}`);
      const data = await response.json();
      setItems(data.items || []);
      setViewItems(true);
      setShowUpload(false);
    } catch (err) {
      setError(`Failed to fetch items: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <AdminHeader />
      <div className="admin-management">
        <h2>Admin Management</h2>

        {/* Server wake-up indicator */}
        {!serverReady && (
          <p className="server-warming">⏳ Connecting to server, please wait...</p>
        )}

        {/* Category Buttons */}
        <div className="category-buttons">
          <Button text='Women' onClick={() => handleCategoryClick('women')} />
          <Button text='Men' onClick={() => handleCategoryClick('men')} />
          <Button text='Bags' onClick={() => handleCategoryClick('bags')} />
          <Button text='Accessories' onClick={() => handleCategoryClick('accessories')} />
        </div>

        {/* Subcategory Buttons */}
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

        {/* Actions */}
        {activeSubcategory && (
          <div className="admin-actions">
            <h3>{subcategoryDisplay} Management</h3>
            <Button text='Upload' onClick={() => { setShowUpload(true); setViewItems(false); resetForm(); }} />
            <Button text='View' onClick={handleViewItems} />

            {showUpload && (
              <div className="upload-section">
                <h3>{editingItem ? 'Update Product' : 'Add New Product'}</h3>

                <div className="form-group">
                  <label htmlFor="name">Product Name:</label>
                  <input
                    id="name" type="text" placeholder="Product Name"
                    value={name} onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="description">Description:</label>
                  <textarea
                    id="description" placeholder="Description"
                    value={description} onChange={(e) => setDescription(e.target.value)} rows="3"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="price">Price:</label>
                  <input
                    id="price" type="number" step="0.01" min="0" placeholder="Price"
                    value={price} onChange={(e) => setPrice(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="image1">Primary Image (Required):</label>
                  <input id="image1" type="file" accept="image/*" onChange={(e) => handleFileChange(e, 'image1')} />
                </div>

                <div className="form-group">
                  <label htmlFor="image2">Additional Image 1 (Optional):</label>
                  <input id="image2" type="file" accept="image/*" onChange={(e) => handleFileChange(e, 'image2')} />
                </div>

                <div className="form-group">
                  <label htmlFor="image3">Additional Image 2 (Optional):</label>
                  <input id="image3" type="file" accept="image/*" onChange={(e) => handleFileChange(e, 'image3')} />
                </div>

                <div className="image-previews">
                  {imagePreviews.image1 && (
                    <div className="image-preview">
                      <h4>Primary Image:</h4>
                      <ProductImage src={imagePreviews.image1} alt={`${name || "Product"} primary`} size="medium" />
                    </div>
                  )}
                  {imagePreviews.image2 && (
                    <div className="image-preview">
                      <h4>Additional Image 1:</h4>
                      <ProductImage src={imagePreviews.image2} alt={`${name || "Product"} additional 1`} size="medium" />
                    </div>
                  )}
                  {imagePreviews.image3 && (
                    <div className="image-preview">
                      <h4>Additional Image 2:</h4>
                      <ProductImage src={imagePreviews.image3} alt={`${name || "Product"} additional 2`} size="medium" />
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

        {/* Items Table */}
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
                        <ProductImage src={item.image1} alt={`${item.name} primary`} size="small" />
                        {item.image2 && <div className="thumbnail"><ProductImage src={item.image2} alt={`${item.name} additional 1`} size="small" /></div>}
                        {item.image3 && <div className="thumbnail"><ProductImage src={item.image3} alt={`${item.name} additional 2`} size="small" /></div>}
                      </td>
                      <td className="actions-column">
                        <button className="edit-button" onClick={() => handleEditItem(item)}>Edit</button>
                        <button className="delete-button" onClick={() => handleDeleteItem(item._id)}>Delete</button>
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