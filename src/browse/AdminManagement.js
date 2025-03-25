import React, { useState } from 'react';
import { UploadCloud, Trash2 } from 'lucide-react';

import AdminHeader from '../components/admin-components/AdminHeader';

const AdminManagement = () => {
  const [items, setItems] = useState({
    'Women': {
      'Sarees': [],
      'Kurtis': [],
      'Tops': [],
      'Trousers': []
    },
    'Men': {
      'Shirts': [],
      'Trousers': []
    },
    'Accessories': {
      'Jewellery': [],
      'Hand Bags': []
    }
  });

  const categories = {
    'Women': ['Sarees', 'Kurtis', 'Tops', 'Trousers'],
    'Men': ['Shirts', 'Trousers'],
    'Accessories': ['Jewellery', 'Hand Bags']
  };

  const [selectedMainCategory, setSelectedMainCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file && selectedMainCategory && selectedSubCategory) {
      const newItemObject = {
        id: Date.now(),
        file: file,
        preview: URL.createObjectURL(file)
      };
      setItems(prevItems => ({
        ...prevItems,
        [selectedMainCategory]: {
          ...prevItems[selectedMainCategory],
          [selectedSubCategory]: [
            ...prevItems[selectedMainCategory][selectedSubCategory], 
            newItemObject
          ]
        }
      }));
    }
  };

  const handleDeleteItem = (mainCategory, subCategory, itemId) => {
    setItems(prevItems => ({
      ...prevItems,
      [mainCategory]: {
        ...prevItems[mainCategory],
        [subCategory]: prevItems[mainCategory][subCategory].filter(item => item.id !== itemId)
      }
    }));
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#F5E6D3',
      fontFamily: 'Arial, sans-serif'
    }}>
      {/* Header */}
    <AdminHeader/>
 

      {/* Main Category Selection */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '1rem',
        padding: '1rem',
        backgroundColor: '#F5E6D3'
      }}>
        {Object.keys(categories).map((mainCategory) => (
          <button
            key={mainCategory}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: selectedMainCategory === mainCategory ? '#D2691E' : '#D2A679',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              transition: 'background-color 0.3s ease'
            }}
            onClick={() => {
              setSelectedMainCategory(mainCategory);
              setSelectedSubCategory(null);
            }}
          >
            {mainCategory}
          </button>
        ))}
      </div>

      {/* Sub Category Selection */}
      {selectedMainCategory && (
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '1rem',
          padding: '1rem',
          backgroundColor: '#F5E6D3'
        }}>
          {categories[selectedMainCategory].map((subCategory) => (
            <button
              key={subCategory}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: selectedSubCategory === subCategory ? '#8B4513' : '#D2A679',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                transition: 'background-color 0.3s ease'
              }}
              onClick={() => setSelectedSubCategory(subCategory)}
            >
              {subCategory}
            </button>
          ))}
        </div>
      )}

      {/* Main Content */}
      {selectedMainCategory && selectedSubCategory && (
        <div style={{
          padding: '2rem'
        }}>
          <h2 style={{
            textAlign: 'center',
            fontSize: '1.5rem',
            marginBottom: '1.5rem'
          }}>
            Manage {selectedMainCategory} - {selectedSubCategory}
          </h2>

          <div style={{
            backgroundColor: '#FFFFFF',
            padding: '1.5rem',
            borderRadius: '8px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              marginBottom: '1.5rem'
            }}>
              <label 
                htmlFor="file-upload" 
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  backgroundColor: '#8B4513',
                  color: '#FFFFFF',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  gap: '0.5rem'
                }}
              >
                <UploadCloud style={{ marginRight: '0.5rem' }} />
                Upload New Item
                <input 
                  type="file" 
                  id="file-upload"
                  style={{ display: 'none' }}
                  onChange={handleFileUpload}
                  accept="image/*"
                />
              </label>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
              gap: '1rem'
            }}>
              {items[selectedMainCategory][selectedSubCategory].map((item) => (
                <div 
                  key={item.id} 
                  style={{
                    position: 'relative',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                  }}
                >
                  <img 
                    src={item.preview} 
                    alt="Uploaded item" 
                    style={{
                      width: '100%',
                      height: '250px',
                      objectFit: 'cover'
                    }}
                  />
                  <button 
                    style={{
                      position: 'absolute',
                      top: '0.5rem',
                      right: '0.5rem',
                      backgroundColor: 'rgba(255, 0, 0, 0.7)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '50%',
                      width: '32px',
                      height: '32px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      transition: 'background-color 0.2s'
                    }}
                    onClick={() => handleDeleteItem(selectedMainCategory, selectedSubCategory, item.id)}
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminManagement;