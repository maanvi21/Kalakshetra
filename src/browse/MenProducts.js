import React from "react";
import "./MenProducts.css";
import ProductCard from "../components/ProductCard";
import Search from "../components/Search";
import Header from '../components/user-components/Header.js';
import { useStateValue } from '../context/CartContext';
import { useState, useEffect } from "react";
import axios from "axios";
export default function MenProducts() {
  const [menData, setMenData] = useState({
    shirts: [],
    trousers: [],
    jackets: [],
    shoes: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [debug, setDebug] = useState({});

  useEffect(() => {
    const fetchMenData = async () => {
      try {
        // Add debug information
        console.log("Fetching Men's product data...");
        
        // Fetch each category separately to better identify issues
        const fetchCategory = async (category) => {
          console.log(`Fetching ${category}...`);
          const url = `http://localhost:5000/men/fetch/${category}`;
          try {
            const response = await axios.get(url);
            console.log(`${category} response:`, response.data);
            return { success: true, data: response.data.items || [] };
          } catch (err) {
            console.error(`Error fetching ${category}:`, err);
            return { success: false, error: err.message };
          }
        };

        const shirtsResult = await fetchCategory('shirts');
        const trousersResult = await fetchCategory('trousers');
        const jacketsResult = await fetchCategory('jackets');
        const shoesResult = await fetchCategory('shoes');

        // Store debug info
        setDebug({
          shirts: shirtsResult,
          trousers: trousersResult,
          jackets: jacketsResult,
          shoes: shoesResult
        });

        // Update state with successful responses
        setMenData({
          shirts: shirtsResult.success ? shirtsResult.data : [],
          trousers: trousersResult.success ? trousersResult.data : [],
          jackets: jacketsResult.success ? jacketsResult.data : [],
          shoes: shoesResult.success ? shoesResult.data : [],
        });

        setLoading(false);
      } catch (error) {
        console.error("Error in fetchMenData:", error);
        setError("Failed to load products: " + error.message);
        setLoading(false);
      }
    };

    fetchMenData();
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
  const hasAnyProducts = Object.values(menData).some(array => array.length > 0);
  
  return (
    <div className="men-page">
      <Header />
      <div className="men_header">
        <Search />
      </div>

      <div className="men_banner">
        <h1>Men Collection</h1>
        <p>Handcrafted men's wear to complement your traditional attire</p>
      </div>

      {/* Display debug button in development */}
      <button 
        onClick={() => console.log("Men data:", menData)} 
        style={{ margin: '10px', padding: '5px' }}
      >
      </button>

      {/* No products message */}
      {!hasAnyProducts && (
        <div className="no-products">
          <h2>No products found</h2>
          <p>There are currently no products available in our men's collection.</p>
        </div>
      )}

      {/* Display each category dynamically */}
      {['shirts', 'trousers', 'jackets', 'shoes'].map((category) => (
        menData[category].length > 0 ? (
          <div className="category" key={category}>
            <h2>{category.charAt(0).toUpperCase() + category.slice(1)}</h2>
            <div className="scroll-container">
              <div className="horizontal-scroll">
                {menData[category].map((item) => (
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
              {[...menData.shirts, ...menData.trousers, ...menData.jackets]
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