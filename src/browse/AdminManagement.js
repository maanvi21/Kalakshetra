import React, { useState } from 'react';
import './AdminManagement.css';
import Button from '../components/Button';

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

  const handleUpload = () => {
    if (!file || !name || !description || !price) {
      return alert('Please fill out all fields and select a file.');
    }
    alert(`Uploading item: ${name}, Description: ${description}, Price: ${price}, File: ${file.name} to ${activeSubcategory}`);
    setFile(null);
    setName('');
    setDescription('');
    setPrice('');
  };

  const handleViewItems = () => {
    setViewItems(true);
    setShowUpload(false);
  };

  return (
    <div className="admin-management">
      <h2>Admin Management</h2>
      <div className="category-buttons">
        <Button text='Women' onClick={() => handleCategoryClick('women')} />
        <Button text='Men' onClick={() => handleCategoryClick('men')} />
        <Button text='Bags' onClick={() => handleCategoryClick('bags')} />
        <Button text='Accessories' onClick={() => handleCategoryClick('accessories')} />
      </div>

      {activeCategory && (
        <div className="subcategory-options">
          {['Kurtis', 'Sarees', 'Tops', 'Trousers'].map((sub) => (
            activeCategory === 'women' && <Button key={sub} text={sub} onClick={() => handleSubcategoryClick(sub.toLowerCase())} />
          ))}
          {['Shirts', 'Trousers'].map((sub) => (
            activeCategory === 'men' && <Button key={sub} text={sub} onClick={() => handleSubcategoryClick(sub.toLowerCase())} />
          ))}
          {['Bag 1', 'Bag 2'].map((sub) => (
            activeCategory === 'bags' && <Button key={sub} text={sub} onClick={() => handleSubcategoryClick(sub.toLowerCase())} />
          ))}
          {['Acc 1', 'Acc 2'].map((sub) => (
            activeCategory === 'accessories' && <Button key={sub} text={sub} onClick={() => handleSubcategoryClick(sub.toLowerCase())} />
          ))}
        </div>
      )}

      {activeSubcategory && (
        <div className="admin-actions">
          <h3>{activeSubcategory} Management</h3>
          <Button text='Upload ' onClick={() => { setShowUpload(true); setViewItems(false); }} />
          <Button text='View ' onClick={handleViewItems} />
          <Button text='Delete'  />
          <Button text='Update'  />

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
              
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
