import React from "react";
import "./HomepageCarousel.css";
import Header from '../components/user-components/Header.js';

export default function HomepageCarousel({ items }) {
  // Duplicate the items to create a seamless scrolling effect
  const duplicatedItems = [...items, ...items];

  return (
    <>
      <Header /> {/* ✅ Navbar appears at the top */}

      <div className="carousel-container-wrapper">
        <div className="carousel-container">
          <section className="hero">
            <div className="carousel-row">
              {duplicatedItems.map((item, index) => (
                <div className="carousel-item" key={index}>
                  <img src={item.image} alt={item.alt} />
                  <div className="hero-content">
                    <h1>{item.title}</h1>
                    <h3>{item.description}</h3>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
