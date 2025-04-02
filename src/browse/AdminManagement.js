import React, { useState } from 'react';
import './AdminManagement.css';
import Button from '../components/Button';
import AdminHeader from "../components/admin-components/AdminHeader.js";

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

  const handleCategoryClick = (category) => {
    setActiveCategory(activeCategory === category ? null : category);
    setActiveSubcategory(null);
    setViewItems(false);
    setShowUpload(false);
  };

  const handleSubcategoryClick = (subcategory) => {
    setActiveSubcategory(activeSubcategory === subcategory ? null : subcategory);
    setViewItems(false);
    setShowUpload(false);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
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
      
      setFile(null);
      setName('');
      setDescription('');
      setPrice('');
      
      document.querySelector('input[type="file"]').value = '';
      
      alert('Product uploaded successfully!');
      
      if (viewItems) {
        const fetchResponse = await fetch(`http://localhost:5000/${activeCategory}/fetch/${activeSubcategory}`);
        
        if (!fetchResponse.ok) {
          throw new Error(`Error: ${fetchResponse.status} - ${fetchResponse.statusText}`);
        }
        
        const data = await fetchResponse.json();
        setItems(data.items);
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
        <div className="category-buttons">
          <Button text='Women' onClick={() => handleCategoryClick('women')} />
          <Button text='Men' onClick={() => handleCategoryClick('men')} />
          <Button text='Bags' onClick={() => handleCategoryClick('bags')} />
          <Button text='Accessories' onClick={() => handleCategoryClick('accessories')} />
        </div>

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
            <Button text='Shirts' onClick={() => handleSubcategoryClick('Shirts')} />
            <Button text='Trousers' onClick={() => handleSubcategoryClick('Trousers')} />
          </div>
        )}

        {activeCategory === 'bags' && (
          <div className="bag-options">
            <Button text='Bag1' onClick={() => handleSubcategoryClick('Bag1')} />
            <Button text='Bag 2' onClick={() => handleSubcategoryClick('Bag 2')} />
          </div>
        )}

        {activeCategory === 'accessories' && (
          <div className="accessory-options">
            <Button text='Acc1' onClick={() => handleSubcategoryClick('Acc1')} />
            <Button text='Acc2' onClick={() => handleSubcategoryClick('Acc2')} />
          </div>
        )}

        {activeSubcategory && (
          <div className="admin-actions">
            <h3>{activeSubcategory} Management</h3>
            <Button text='Upload' onClick={() => { setShowUpload(true); setViewItems(false); }} />
            <Button text='View' onClick={handleViewItems} />
            <Button text='Delete' />
            <Button text='Update' />

            {showUpload && (
              <div className="upload-section">
                <input type="text" placeholder="Product Name" value={name} onChange={(e) => setName(e.target.value)} />
                <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
                <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} />
                <input type="file" onChange={handleFileChange} />
                <Button text='Upload' onClick={handleUpload} />
              </div>
            )}
          </div>
        )}

        {viewItems && (
          <div className="items-list">
            <h3>Items in {activeSubcategory}</h3>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item._id}>
                    <td>{item._id}</td>
                    <td>{item.name}</td>
                    <td>{item.description}</td>
                    <td>{item.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}