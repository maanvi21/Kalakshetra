import React, { useState, useEffect } from 'react';
import { UploadCloud, Trash2, Plus, Eye } from 'lucide-react';

import AdminHeader from '../components/admin-components/AdminHeader';

const AdminManagement = () => {
  const [selectedMainCategory, setSelectedMainCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [categoryItems, setCategoryItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [uploadForm, setUploadForm] = useState({
    title: '',
    description: '',
    file: null
  });
  const [showUploadForm, setShowUploadForm] = useState(false);

  // Define available categories and their subcategories
  const categories = {
    'Women': ['Sarees', 'Kurtis', 'Tops', 'Trousers'],
    'Men': ['Shirts', 'Trousers', 'Jackets', 'Shoes'],
    'Bags': ['Handbags', 'Backpacks', 'Wallets', 'Totes', 'Clutches'],
    'Accessories': ['Jewellery', 'Belts', 'Scarves', 'Watches']
  };

  // Function to get appropriate API endpoint based on category
  const getEndpoint = (mainCategory, subCategory) => {
    const main = mainCategory.toLowerCase();
    const sub = subCategory.toLowerCase();
    
    // Map to your actual backend routes
    const endpointMap = {
        'women': `/women/${sub}`,
        'men': `/men/${sub}`,
        'bags': `/bags/${sub}`,
        'accessories': `/accessories/${sub}`
    };
    
    return endpointMap[main] || '';
};

  // Fetch items when a subcategory is selected
  useEffect(() => {
    const fetchItems = async () => {
      if (selectedMainCategory && selectedSubCategory) {
        setLoading(true);
        setError(null);
        try {
          const endpoint = getEndpoint(selectedMainCategory, selectedSubCategory);
          const response = await fetch(endpoint);
          
          if (!response.ok) {
            throw new Error(`Failed to fetch ${selectedSubCategory}: ${response.statusText}`);
          }
          
          const data = await response.json();
          setCategoryItems(data.items || []);
        } catch (error) {
          console.error('Error fetching items:', error);
          setError(`Failed to load ${selectedSubCategory}: ${error.message}`);
          setCategoryItems([]);
        } finally {
          setLoading(false);
        }
      }
    };

    if (selectedMainCategory && selectedSubCategory) {
      fetchItems();
    }
  }, [selectedMainCategory, selectedSubCategory]);

  // Form input handlers
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setUploadForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    setUploadForm(prev => ({
      ...prev,
      file: e.target.files[0]
    }));
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    
    if (!uploadForm.file || !uploadForm.title || !uploadForm.description) {
        setError('Please fill all fields and select an image');
        return;
    }

    const endpoint = getEndpoint(selectedMainCategory, selectedSubCategory);
    
    const formData = new FormData();
    formData.append('file', uploadForm.file);
    formData.append('title', uploadForm.title);
    formData.append('description', uploadForm.description);
    
    try {
        const response = await fetch(`http://localhost:5000${endpoint}`, {
            method: 'POST',
            body: formData,
            // Don't set Content-Type header - the browser will set it automatically
            // with the correct boundary for FormData
        });

        if (!response.ok) throw new Error('Upload failed');
        
        // Handle success
    } catch (error) {
        // Handle error
    }
};

  // Delete item
  const handleDeleteItem = async (itemId) => {
    if (!selectedMainCategory || !selectedSubCategory) return;
    
    if (!window.confirm('Are you sure you want to delete this item?')) {
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const endpoint = `${getEndpoint(selectedMainCategory, selectedSubCategory)}/${itemId}`;
      
      const response = await fetch(endpoint, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error(`Failed to delete: ${response.statusText}`);
      }

      // Refresh items after deletion
      const updatedResponse = await fetch(getEndpoint(selectedMainCategory, selectedSubCategory));
      const updatedData = await updatedResponse.json();
      setCategoryItems(updatedData.items || []);
      
    } catch (error) {
      console.error('Error deleting item:', error);
      setError(`Delete failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#F5E6D3',
      fontFamily: 'Arial, sans-serif'
    }}>
      {/* Header */}
      <AdminHeader />

      {/* Error Display */}
      {error && (
        <div style={{
          padding: '1rem',
          backgroundColor: '#FEE2E2',
          color: '#B91C1C',
          margin: '1rem',
          borderRadius: '4px',
          textAlign: 'center'
        }}>
          {error}
        </div>
      )}

      {/* Main Category Selection */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '1rem',
        padding: '1rem',
        backgroundColor: '#F5E6D3',
        flexWrap: 'wrap'
      }}>
        {Object.keys(categories).map((mainCategory) => (
          <button
            key={mainCategory}
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: selectedMainCategory === mainCategory ? '#D2691E' : '#D2A679',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: selectedMainCategory === mainCategory ? 'bold' : 'normal',
              transition: 'background-color 0.3s ease'
            }}
            onClick={() => {
              setSelectedMainCategory(mainCategory);
              setSelectedSubCategory(null);
              setError(null);
              setShowUploadForm(false);
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
          backgroundColor: '#F5E6D3',
          flexWrap: 'wrap'
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
                fontWeight: selectedSubCategory === subCategory ? 'bold' : 'normal',
                transition: 'background-color 0.3s ease'
              }}
              onClick={() => {
                setSelectedSubCategory(subCategory);
                setError(null);
                setShowUploadForm(false);
              }}
            >
              {subCategory}
            </button>
          ))}
        </div>
      )}

      {/* Main Content */}
      {selectedMainCategory && selectedSubCategory && (
        <div style={{
          padding: '1rem 2rem'
        }}>
          <h2 style={{
            textAlign: 'center',
            fontSize: '1.5rem',
            marginBottom: '1.5rem',
            color: '#8B4513'
          }}>
            Manage {selectedMainCategory} - {selectedSubCategory}
          </h2>

          {/* Upload Controls */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '1.5rem'
          }}>
            {!showUploadForm ? (
              <button 
                onClick={() => setShowUploadForm(true)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  backgroundColor: '#8B4513',
                  color: '#FFFFFF',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  border: 'none',
                  fontSize: '1rem'
                }}
              >
                <Plus size={20} style={{ marginRight: '0.5rem' }} />
                Add New Item
              </button>
            ) : (
              <div style={{
                backgroundColor: '#FFFFFF',
                padding: '1.5rem',
                borderRadius: '8px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                width: '100%',
                maxWidth: '500px'
              }}>
                <h3 style={{ marginBottom: '1rem', color: '#8B4513', textAlign: 'center' }}>
                  Add New {selectedSubCategory} Item
                </h3>
                
                <form onSubmit={handleUpload}>
                  <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                      Title
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={uploadForm.title}
                      onChange={handleFormChange}
                      style={{
                        width: '100%',
                        padding: '0.5rem',
                        border: '1px solid #D2A679',
                        borderRadius: '4px'
                      }}
                      required
                    />
                  </div>
                  
                  <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                      Description
                    </label>
                    <textarea
                      name="description"
                      value={uploadForm.description}
                      onChange={handleFormChange}
                      style={{
                        width: '100%',
                        padding: '0.5rem',
                        border: '1px solid #D2A679',
                        borderRadius: '4px',
                        minHeight: '100px'
                      }}
                      required
                    />
                  </div>
                  
                  <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                      Image
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      style={{
                        width: '100%',
                        padding: '0.5rem',
                        border: '1px solid #D2A679',
                        borderRadius: '4px',
                        backgroundColor: '#F9F5F1'
                      }}
                      required
                    />
                  </div>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <button
                      type="button"
                      onClick={() => setShowUploadForm(false)}
                      style={{
                        padding: '0.5rem 1rem',
                        backgroundColor: '#D3D3D3',
                        color: '#333',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                      }}
                    >
                      Cancel
                    </button>
                    
                    <button
                      type="submit"
                      disabled={loading}
                      style={{
                        padding: '0.5rem 1rem',
                        backgroundColor: '#8B4513',
                        color: '#FFFFFF',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: loading ? 'not-allowed' : 'pointer',
                        opacity: loading ? 0.7 : 1,
                        display: 'flex',
                        alignItems: 'center'
                      }}
                    >
                      <UploadCloud size={20} style={{ marginRight: '0.5rem' }} />
                      {loading ? 'Uploading...' : 'Upload Item'}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>

          {/* Items Grid */}
          <div style={{
            backgroundColor: '#FFFFFF',
            padding: '1.5rem',
            borderRadius: '8px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
          }}>
            {loading && !showUploadForm ? (
              <div style={{ textAlign: 'center', padding: '2rem', color: '#8B4513' }}>
                Loading items...
              </div>
            ) : (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                gap: '1.5rem'
              }}>
                {Array.isArray(categoryItems) && categoryItems.length > 0 ? (
                  categoryItems.map((item) => (
                    <div 
                      key={item._id || item.id} 
                      style={{
                        position: 'relative',
                        borderRadius: '8px',
                        overflow: 'hidden',
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                        backgroundColor: '#F9F9F9',
                        display: 'flex',
                        flexDirection: 'column'
                      }}
                    >
                      <div style={{ position: 'relative', height: '200px' }}>
                        <img 
                          src={item.image} 
                          alt={item.title} 
                          style={{
                            width: '100%',
                            height: '100%',
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
                          onClick={() => handleDeleteItem(item._id || item.id)}
                          disabled={loading}
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                      
                      <div style={{ padding: '0.75rem', flex: 1 }}>
                        <h3 style={{ 
                          margin: '0 0 0.5rem 0', 
                          fontSize: '1rem',
                          color: '#8B4513',
                          textOverflow: 'ellipsis',
                          overflow: 'hidden',
                          whiteSpace: 'nowrap'
                        }}>
                          {item.title}
                        </h3>
                        <p style={{ 
                          margin: 0, 
                          fontSize: '0.875rem',
                          color: '#666',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis'
                        }}>
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div style={{ 
                    gridColumn: '1 / -1', 
                    textAlign: 'center', 
                    color: '#888',
                    padding: '2rem'
                  }}>
                    No items found in this category
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminManagement;