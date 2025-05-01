import React from "react";
import "./BagsProducts.css";
import ProductCard from "../components/ProductCard";
import Search from "../components/Search";
import Header from '../components/user-components/Header.js';
import { useStateValue } from '../context/CartContext';

export default function BagsPage() {
  const { state } = useStateValue();
  
  // Sample product data for Bags
  const Handbags = [
    { id: 'e1', name: 'Traditional Jhumkas', price: 1299, image: '/assets/Bags/Handbags/jhumkas.jpg', category: 'Handbags' },
    { id: 'e2', name: 'Pearl Drop Handbags', price: 999, image: '/assets/Bags/Handbags/pearl.jpg', category: 'Handbags' },
    { id: 'e3', name: 'Stone Studs', price: 799, image: '/assets/Bags/Handbags/studs.jpg', category: 'Handbags' },
    { id: 'e4', name: 'Handcrafted Hoops', price: 1499, image: '/assets/Bags/Handbags/hoops.jpg', category: 'Handbags' },
  ];
  
  const Totes = [
    { id: 'n1', name: 'Kundan Necklace Set', price: 3999, image: '/assets/Bags/Totes/kundan.jpg', category: 'Totes' },
    { id: 'n2', name: 'Beaded Choker', price: 1299, image: '/assets/Bags/Totes/choker.jpg', category: 'Totes' },
    { id: 'n3', name: 'Pearl String', price: 2499, image: '/assets/Bags/Totes/pearl.jpg', category: 'Totes' },
    { id: 'n4', name: 'Silver Pendant Chain', price: 1799, image: '/assets/Bags/Totes/pendant.jpg', category: 'Totes' },
  ];
  
  const backpacks = [
    { id: 'r1', name: 'Silver Statement Ring', price: 899, image: '/assets/Bags/backpacks/statement.jpg', category: 'backpacks' },
    { id: 'r2', name: 'Stone Cocktail Ring', price: 1199, image: '/assets/Bags/backpacks/cocktail.jpg', category: 'backpacks' },
    { id: 'r3', name: 'Adjustable Toe Ring', price: 499, image: '/assets/Bags/backpacks/toe.jpg', category: 'backpacks' },
    { id: 'r4', name: 'Brass Ring Set', price: 799, image: '/assets/Bags/backpacks/brass.jpg', category: 'backpacks' },
  ];
  
 
  const wallets = [
    { id: 'w1', name: 'Classic Leather Watch', price: 2499, image: '/assets/Bags/wallets/leather.jpg', category: 'wallets' },
    { id: 'w2', name: 'Metal Strap Watch', price: 2999, image: '/assets/Bags/wallets/metal.jpg', category: 'wallets' },
    { id: 'w3', name: 'Smart Watch', price: 3999, image: '/assets/Bags/wallets/smart.jpg', category: 'wallets' },
    { id: 'w4', name: 'Vintage Timepiece', price: 4999, image: '/assets/Bags/wallets/vintage.jpg', category: 'wallets' },
  ];
  
  return (
    <div className="Bags-page">
      <Header />
      <div className="Bags_header">
        <Search />
      </div>
      
      <div className="Bags_banner">
        <h1>Bags Collection</h1>
        <p>Handcrafted Bags to complement your traditional attire</p>
      </div>
      
      <div className="category">
        <h2>Handbags</h2>
        <div className="scroll-container">
          <div className="horizontal-scroll">
            {Handbags.map((item) => (
              <ProductCard key={`earring-${item.id}`} items={[item]} />
            ))}
          </div>
        </div>
      </div>
      
      <div className="category">
        <h2>Totes</h2>
        <div className="scroll-container">
          <div className="horizontal-scroll">
            {Totes.map((item) => (
              <ProductCard key={`necklace-${item.id}`} items={[item]} />
            ))}
          </div>
        </div>
      </div>
      
      <div className="category">
        <h2>backpacks</h2>
        <div className="scroll-container">
          <div className="horizontal-scroll">
            {backpacks.map((item) => (
              <ProductCard key={`ring-${item.id}`} items={[item]} />
            ))}
          </div>
        </div>
      </div>
      
      
      
      <div className="category">
        <h2>wallets</h2>
        <div className="scroll-container">
          <div className="horizontal-scroll">
            {wallets.map((item) => (
              <ProductCard key={`watch-${item.id}`} items={[item]} />
            ))}
          </div>
        </div>
      </div>
      
      <div className="category">
        <h2>Special Offers</h2>
        <div className="scroll-container">
          <div className="horizontal-scroll">
            {[...Handbags, ...Totes, ...backpacks].slice(0, 5).map((item) => (
              <ProductCard key={`offer-${item.id}`} items={[item]} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}