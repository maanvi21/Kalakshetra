import React from "react";
import "./Browse.css";
import ProductCard from "../components/ProductCard";
import Search from "../components/Search";
import Header from '../components/Header';
import productItems from './data/ProductData.js'


export default function Browse() {
  return (
    <div>
      <Header/>
<div className="browse_header"> 
        <Search/>
        </div>

      <div className="category">
        <h2>Kalamkari Sarees</h2>
        <div className="scroll-container">
          <div className="horizontal-scroll">
            {productItems.map((item, index) => (
              <ProductCard key={index} items={[item]} />
            ))}
          </div>
        </div>
      </div>

      <div className="category">
        <h2>Kalamkari Kurtis</h2>
        <div className="scroll-container">
          <div className="horizontal-scroll">
            {productItems.map((item, index) => (
              <ProductCard key={index} items={[item]} />
            ))}
          </div>
        </div>
      </div>

      <div className="category">
        <h2>Offers</h2>
        <div className="scroll-container">
          <div className="horizontal-scroll">
            {productItems.map((item, index) => (
              <ProductCard key={index} items={[item]} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}