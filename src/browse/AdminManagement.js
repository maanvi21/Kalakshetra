import React, { useState } from 'react';
import './AdminManagement.css';
import Button from '../components/Button';

export default function AdminManagement() {
  const [activeCategory, setActiveCategory] = useState(null);
  const [activeSubcategory, setActiveSubcategory] = useState(null);
  const [file, setFile] = useState(null);
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
    if (!file) return alert('Please select a file to upload');
    alert(`Uploading file: ${file.name} to ${activeSubcategory}`);
    setFile(null);
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

      {activeCategory === 'women' && (
        <div className="subcategory-options">
          <Button text='Kurtis' onClick={() => handleSubcategoryClick('kurtis')} />
          <Button text='Sarees' onClick={() => handleSubcategoryClick('sarees')} />
          <Button text='Tops' onClick={() => handleSubcategoryClick('tops')} />
          <Button text='Trousers' onClick={() => handleSubcategoryClick('trousers')} />
        </div>
      )}

        {/* Men Subcategories */}
        {activeCategory === 'men' && (
        <div className="subcategory-options">
          <Button text='Shirts' onClick={() => handleSubcategoryClick('shirts')} />
          <Button text='Trousers' onClick={() => handleSubcategoryClick('trousers')} />
        </div>
      )}

      {/* Bags Subcategories */}
      {activeCategory === 'bags' && (
        <div className="subcategory-options">
          <Button text='Bag 1' onClick={() => handleSubcategoryClick('bag1')} />
          <Button text='Bag 2' onClick={() => handleSubcategoryClick('bag2')} />
        </div>
      )}

      {/* Accessories Subcategories */}
      {activeCategory === 'accessories' && (
        <div className="subcategory-options">
          <Button text='Acc 1' onClick={() => handleSubcategoryClick('acc1')} />
          <Button text='Acc 2' onClick={() => handleSubcategoryClick('acc2')} />
        </div>
      )}



      {activeSubcategory && (
        <div className="admin-actions">
          <h3>{activeSubcategory} Management</h3>
          <Button text='Upload Item' onClick={() => { setShowUpload(true); setViewItems(false); }} />
          <Button text='View All Items' onClick={handleViewItems} />

          {/* Upload UI */}
          {showUpload && (
            <div className="upload-section">
              <input type="file" onChange={handleFileChange} />
              <Button text='Upload' onClick={handleUpload} />
            </div>
          )}
        </div>
      )}

      {/* Fetch UI - Table to display items */}
      {viewItems && (
        <div className="items-list">
          <h3>Items in {activeSubcategory}</h3>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {items.map(item => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}