import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AccessoriesProducts.css";
import ProductCard from "../components/ProductCard";
import Search from "../components/Search";
import Header from '../components/user-components/Header.js';
import { useStateValue } from '../context/CartContext';

export default function AccessoriesPage() {
  const { state } = useStateValue();
  const [accessoriesData, setAccessoriesData] = useState({
    earrings: [],
    necklaces: [],
    rings: [],
    bracelets: [],
    watches: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [debug, setDebug] = useState({});

  useEffect(() => {
    const fetchAccessoriesData = async () => {
      try {
        // Add debug information
        console.log("Fetching accessories product data...");
        
        // Fetch each category separately to better identify issues
        const fetchCategory = async (category) => {
          console.log(`Fetching ${category}...`);
          const url = `http://localhost:5000/accessories/fetch/${category}`;
          try {
            const response = await axios.get(url);
            console.log(`${category} response:`, response.data);
            return { success: true, data: response.data.items || [] };
          } catch (err) {
            console.error(`Error fetching ${category}:`, err);
            return { success: false, error: err.message };
          }
        };

        const earringsResult = await fetchCategory('earrings');
        const necklacesResult = await fetchCategory('necklaces');
        const ringsResult = await fetchCategory('rings');
        const braceletsResult = await fetchCategory('bracelets');
        const watchesResult = await fetchCategory('watches');

        // Store debug info
        setDebug({
          earrings: earringsResult,
          necklaces: necklacesResult,
          rings: ringsResult,
          bracelets: braceletsResult,
          watches: watchesResult
        });

        // Update state with successful responses
        setAccessoriesData({
          earrings: earringsResult.success ? earringsResult.data : [],
          necklaces: necklacesResult.success ? necklacesResult.data : [],
          rings: ringsResult.success ? ringsResult.data : [],
          bracelets: braceletsResult.success ? braceletsResult.data : [],
          watches: watchesResult.success ? watchesResult.data : [],
        });

        setLoading(false);
      } catch (error) {
        console.error("Error in fetchAccessoriesData:", error);
        setError("Failed to load products: " + error.message);
        setLoading(false);
      }
    };

    fetchAccessoriesData();
  }, []);

  // Loading and error handling
  if (loading) {
    return <div className="loading-container">Loading accessories...</div>;
  }

  // Display detailed error information if available
  if (error) {
    return (
      <div className="error-container">
        <h2>Error Loading Accessories</h2>
        <p>{error}</p>
        <div className="debug-info">
          <h3>Debug Information:</h3>
          <pre>{JSON.stringify(debug, null, 2)}</pre>
        </div>
      </div>
    );
  }

  // Check if we have any products at all
  const hasAnyProducts = Object.values(accessoriesData).some(array => array.length > 0);
  
  return (
    <div className="accessories-page">
      <Header />
      <div className="accessories_header">
       
      </div>
      
      <div className="accessories_banner">
        <h1>Accessories Collection</h1>
        <p>Handcrafted accessories to complement your traditional attire</p>
      </div>

      {/* No products message */}
      {!hasAnyProducts && (
        <div className="no-products">
          <h2>No products found</h2>
          <p>There are currently no products available in our accessories collection.</p>
        </div>
      )}

      {/* Display each category dynamically */}
      {['earrings', 'necklaces', 'rings', 'bracelets', 'watches'].map((category) => (
        accessoriesData[category].length > 0 ? (
          <div className="category" key={category}>
            <h2>{category.charAt(0).toUpperCase() + category.slice(1)}</h2>
            <div className="scroll-container">
              <div className="horizontal-scroll">
                {accessoriesData[category].map((item) => (
                  <ProductCard key={item._id} item={item} />
                ))}
              </div>
            </div>
          </div>
        ) : null
      ))}

      {/* Special Offers: Only show if we have products */}
      {hasAnyProducts && (
        <div className="category">
          <h2>Special Offers</h2>
          <div className="scroll-container">
            <div className="horizontal-scroll">
              {[
                ...accessoriesData.earrings, 
                ...accessoriesData.necklaces, 
                ...accessoriesData.rings
              ]
                .slice(0, 5)
                .map((item) => (
                  <ProductCard key={`offer-${item._id}`} item={item} />
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}