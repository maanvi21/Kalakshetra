import React, { useEffect, useState } from "react";
import axios from "axios";
import "./WomenProducts.css";
import ProductCard from "../components/ProductCard";
import Search from "../components/Search";
import Header from '../components/user-components/Header.js';

export default function WomenProducts() {
  const [womenData, setWomenData] = useState({
    kurtis: [],
    sarees: [],
    tops: [],
    trousers: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [debug, setDebug] = useState({});

  useEffect(() => {
    const fetchWomenData = async () => {
      try {
        // Add debug information
        console.log("Fetching women's product data...");
        
        // Fetch each category separately to better identify issues
        const fetchCategory = async (category) => {
          console.log(`Fetching ${category}...`);
          const url = `https://kalakshetra3-backend.vercel.app/women/fetch/${category}`;
          try {
            const response = await axios.get(url);
            console.log(`${category} response:`, response.data);
            return { success: true, data: response.data.items || [] };
          } catch (err) {
            console.error(`Error fetching ${category}:`, err);
            return { success: false, error: err.message };
          }
        };

        const kurtisResult = await fetchCategory('kurtis');
        const sareesResult = await fetchCategory('sarees');
        const topsResult = await fetchCategory('tops');
        const trousersResult = await fetchCategory('trousers');

        // Store debug info
        setDebug({
          kurtis: kurtisResult,
          sarees: sareesResult,
          tops: topsResult,
          trousers: trousersResult
        });

        // Update state with successful responses
        setWomenData({
          kurtis: kurtisResult.success ? kurtisResult.data : [],
          sarees: sareesResult.success ? sareesResult.data : [],
          tops: topsResult.success ? topsResult.data : [],
          trousers: trousersResult.success ? trousersResult.data : [],
        });

        setLoading(false);
      } catch (error) {
        console.error("Error in fetchWomenData:", error);
        setError("Failed to load products: " + error.message);
        setLoading(false);
      }
    };

    fetchWomenData();
  }, []);

  // Loading and error handling
  if (loading) {
    return <div className="loading-container">Loading products...</div>;
  }

  // Display detailed error information if available
  if (error) {
    return (
      <div className="error-container">
        <h2>Error Loading Products</h2>
        <p>{error}</p>
        <div className="debug-info">
          <h3>Debug Information:</h3>
          <pre>{JSON.stringify(debug, null, 2)}</pre>
        </div>
      </div>
    );
  }

  // Check if we have any products at all
  const hasAnyProducts = Object.values(womenData).some(array => array.length > 0);
  
  return (
    <div className="women-page">
      <Header />
      <div className="women_header">
       
      </div>

      <div className="women_banner">
        <h1>Women Collection</h1>
        <p>Handcrafted women's wear to complement your traditional attire</p>
      </div>

      {/* Display debug button in development */}
      <button 
        onClick={() => console.log("Women data:", womenData)} 
        style={{ margin: '10px', padding: '5px' }}
      >
      </button>

      {/* No products message */}
      {!hasAnyProducts && (
        <div className="no-products">
          <h2>No products found</h2>
          <p>There are currently no products available in our women's collection.</p>
        </div>
      )}

      {/* Display each category dynamically */}
      {['kurtis', 'sarees', 'tops', 'trousers'].map((category) => (
        womenData[category].length > 0 ? (
          <div className="category" key={category}>
            <h2>{category.charAt(0).toUpperCase() + category.slice(1)}</h2>
            <div className="scroll-container">
              <div className="horizontal-scroll">
                {womenData[category].map((item) => (
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
          {/* <h2>Special Offers</h2>
          <div className="scroll-container">
            <div className="horizontal-scroll">
              {[...womenData.kurtis, ...womenData.sarees, ...womenData.tops]
                .slice(0, 5)
                .map((item) => (
                    <ProductCard key={item._id} item={item} />

                ))}
            </div>
          </div> */}
        </div>
      )}
    </div>
  );
}