import React, { useEffect, useState } from "react";
import axios from "axios";
import "./BagsProducts.css";
import ProductCard from "../components/ProductCard";
import Search from "../components/Search";
import Header from '../components/user-components/Header.js';
import { useStateValue } from '../context/CartContext';

export default function BagsPage() {
  const { state } = useStateValue();
  const [bagsData, setBagsData] = useState({
    handbags: [],
    totes: [],
    backpacks: [],
    wallets: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [debug, setDebug] = useState({});

  useEffect(() => {
    const fetchBagsData = async () => {
      try {
        // Add debug information
        console.log("Fetching bags product data...");
        
        // Fetch each category separately to better identify issues
        const fetchCategory = async (category) => {
          console.log(`Fetching ${category}...`);
          const url = `https://kalakshetra3-6.onrender.com/bags/fetch/${category}`;
          try {
            const response = await axios.get(url);
            console.log(`${category} response:`, response.data);
            return { success: true, data: response.data.items || [] };
          } catch (err) {
            console.error(`Error fetching ${category}:`, err);
            return { success: false, error: err.message };
          }
        };

        const handbagsResult = await fetchCategory('handbags');
        const totesResult = await fetchCategory('totes');
        const backpacksResult = await fetchCategory('backpacks');
        const walletsResult = await fetchCategory('wallets');

        // Store debug info
        setDebug({
          handbags: handbagsResult,
          totes: totesResult,
          backpacks: backpacksResult,
          wallets: walletsResult
        });

        // Update state with successful responses
        setBagsData({
          handbags: handbagsResult.success ? handbagsResult.data : [],
          totes: totesResult.success ? totesResult.data : [],
          backpacks: backpacksResult.success ? backpacksResult.data : [],
          wallets: walletsResult.success ? walletsResult.data : [],
        });

        setLoading(false);
      } catch (error) {
        console.error("Error in fetchBagsData:", error);
        setError("Failed to load products: " + error.message);
        setLoading(false);
      }
    };

    fetchBagsData();
  }, []);

  // Loading and error handling
  if (loading) {
    return <div className="loading-container">Loading bags...</div>;
  }

  // Display detailed error information if available
  if (error) {
    return (
      <div className="error-container">
        <h2>Error Loading Bags</h2>
        <p>{error}</p>
        <div className="debug-info">
          <h3>Debug Information:</h3>
          <pre>{JSON.stringify(debug, null, 2)}</pre>
        </div>
      </div>
    );
  }

  // Check if we have any products at all
  const hasAnyProducts = Object.values(bagsData).some(array => array.length > 0);
  
  return (
    <div className="bags-page">
      <Header />
      <div className="bags_header">
       
      </div>
      
      <div className="bags_banner">
        <h1>Bags Collection</h1>
        <p>Handcrafted bags to complement your traditional attire</p>
      </div>

      {/* No products message */}
      {!hasAnyProducts && (
        <div className="no-products">
          <h2>No products found</h2>
          <p>There are currently no products available in our bags collection.</p>
        </div>
      )}

      {/* Display each category dynamically */}
      {['handbags', 'totes', 'backpacks', 'wallets'].map((category) => (
        bagsData[category].length > 0 ? (
          <div className="category" key={category}>
            <h2>{category.charAt(0).toUpperCase() + category.slice(1)}</h2>
            <div className="scroll-container">
              <div className="horizontal-scroll">
                {bagsData[category].map((item) => (
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
                ...bagsData.handbags, 
                ...bagsData.totes, 
                ...bagsData.backpacks
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