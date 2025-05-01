import React from "react";
import "./AccessoriesProducts.css";
import ProductCard from "../components/ProductCard";
import Search from "../components/Search";
import Header from '../components/user-components/Header.js';
import { useStateValue } from '../context/CartContext';

export default function AccessoriesPage() {
  const { state } = useStateValue();
  
  // Sample product data for accessories
  const earrings = [
    { id: 'e1', name: 'Traditional Jhumkas', price: 1299, image: '/assets/accessories/earrings/jhumkas.jpg', category: 'earrings' },
    { id: 'e2', name: 'Pearl Drop Earrings', price: 999, image: '/assets/accessories/earrings/pearl.jpg', category: 'earrings' },
    { id: 'e3', name: 'Stone Studs', price: 799, image: '/assets/accessories/earrings/studs.jpg', category: 'earrings' },
    { id: 'e4', name: 'Handcrafted Hoops', price: 1499, image: '/assets/accessories/earrings/hoops.jpg', category: 'earrings' },
  ];
  
  const necklaces = [
    { id: 'n1', name: 'Kundan Necklace Set', price: 3999, image: '/assets/accessories/necklaces/kundan.jpg', category: 'necklaces' },
    { id: 'n2', name: 'Beaded Choker', price: 1299, image: '/assets/accessories/necklaces/choker.jpg', category: 'necklaces' },
    { id: 'n3', name: 'Pearl String', price: 2499, image: '/assets/accessories/necklaces/pearl.jpg', category: 'necklaces' },
    { id: 'n4', name: 'Silver Pendant Chain', price: 1799, image: '/assets/accessories/necklaces/pendant.jpg', category: 'necklaces' },
  ];
  
  const rings = [
    { id: 'r1', name: 'Silver Statement Ring', price: 899, image: '/assets/accessories/rings/statement.jpg', category: 'rings' },
    { id: 'r2', name: 'Stone Cocktail Ring', price: 1199, image: '/assets/accessories/rings/cocktail.jpg', category: 'rings' },
    { id: 'r3', name: 'Adjustable Toe Ring', price: 499, image: '/assets/accessories/rings/toe.jpg', category: 'rings' },
    { id: 'r4', name: 'Brass Ring Set', price: 799, image: '/assets/accessories/rings/brass.jpg', category: 'rings' },
  ];
  
  const bracelets = [
    { id: 'b1', name: 'Silver Bangle Set', price: 1699, image: '/assets/accessories/bracelets/bangle.jpg', category: 'bracelets' },
    { id: 'b2', name: 'Beaded Bracelet', price: 799, image: '/assets/accessories/bracelets/beaded.jpg', category: 'bracelets' },
    { id: 'b3', name: 'Gold-plated Kada', price: 2999, image: '/assets/accessories/bracelets/kada.jpg', category: 'bracelets' },
    { id: 'b4', name: 'Thread Bracelet', price: 499, image: '/assets/accessories/bracelets/thread.jpg', category: 'bracelets' },
  ];
  
  const watches = [
    { id: 'w1', name: 'Classic Leather Watch', price: 2499, image: '/assets/accessories/watches/leather.jpg', category: 'watches' },
    { id: 'w2', name: 'Metal Strap Watch', price: 2999, image: '/assets/accessories/watches/metal.jpg', category: 'watches' },
    { id: 'w3', name: 'Smart Watch', price: 3999, image: '/assets/accessories/watches/smart.jpg', category: 'watches' },
    { id: 'w4', name: 'Vintage Timepiece', price: 4999, image: '/assets/accessories/watches/vintage.jpg', category: 'watches' },
  ];
  
  return (
    <div className="accessories-page">
      <Header />
      <div className="accessories_header">
        <Search />
      </div>
      
      <div className="accessories_banner">
        <h1>Accessories Collection</h1>
        <p>Handcrafted accessories to complement your traditional attire</p>
      </div>
      
      <div className="category">
        <h2>Earrings</h2>
        <div className="scroll-container">
          <div className="horizontal-scroll">
            {earrings.map((item) => (
              <ProductCard key={`earring-${item.id}`} items={[item]} />
            ))}
          </div>
        </div>
      </div>
      
      <div className="category">
        <h2>Necklaces</h2>
        <div className="scroll-container">
          <div className="horizontal-scroll">
            {necklaces.map((item) => (
              <ProductCard key={`necklace-${item.id}`} items={[item]} />
            ))}
          </div>
        </div>
      </div>
      
      <div className="category">
        <h2>Rings</h2>
        <div className="scroll-container">
          <div className="horizontal-scroll">
            {rings.map((item) => (
              <ProductCard key={`ring-${item.id}`} items={[item]} />
            ))}
          </div>
        </div>
      </div>
      
      <div className="category">
        <h2>Bracelets</h2>
        <div className="scroll-container">
          <div className="horizontal-scroll">
            {bracelets.map((item) => (
              <ProductCard key={`bracelet-${item.id}`} items={[item]} />
            ))}
          </div>
        </div>
      </div>
      
      <div className="category">
        <h2>Watches</h2>
        <div className="scroll-container">
          <div className="horizontal-scroll">
            {watches.map((item) => (
              <ProductCard key={`watch-${item.id}`} items={[item]} />
            ))}
          </div>
        </div>
      </div>
      
      <div className="category">
        <h2>Special Offers</h2>
        <div className="scroll-container">
          <div className="horizontal-scroll">
            {[...earrings, ...necklaces, ...rings].slice(0, 5).map((item) => (
              <ProductCard key={`offer-${item.id}`} items={[item]} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}