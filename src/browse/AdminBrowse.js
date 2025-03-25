import React from "react";
import "./Browse.css";
import ProductCard from "../components/ProductCard";
import Search from "../components/Search";
import Header from '../components/user-components/Header.js';
import productItems from '../data/ProductData.js';
import { useStateValue } from '../context/CartContext';
import AdminHeader from "../components/admin-components/AdminHeader.js";

export default function Browse() {
  const { state } = useStateValue(); 

  return (
    <div className="browse-page">
    <AdminHeader />
      <div className="browse_header">
        <Search />
      </div>

      <div className="category">
        <h2>Kalamkari Sarees</h2>
        <div className="scroll-container">
          <div className="horizontal-scroll">
            {productItems.map((item, index) => (
              <ProductCard key={`saree-${item.id}`} items={[item]} />
            ))}
          </div>
        </div>
      </div>

      <div className="category">
        <h2>Kalamkari Kurtis</h2>
        <div className="scroll-container">
          <div className="horizontal-scroll">
            {productItems.map((item, index) => (
              <ProductCard key={`kurti-${item.id}`} items={[item]} />
            ))}
          </div>
        </div>
      </div>

      <div className="category">
        <h2>Offers</h2>
        <div className="scroll-container">
          <div className="horizontal-scroll">
            {productItems.map((item, index) => (
              <ProductCard key={`offer-${item.id}`} items={[item]} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}