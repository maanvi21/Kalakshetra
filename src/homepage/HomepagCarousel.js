import React from "react";
import "./HomepageCarousel.css";
import CarouselData from '../data/CarouselData.js'
export default function HomepageCarousel({ items}) {
  return (
    <div className="carousel-container">
      <section className="hero">
        <div className="carousel-row">
          {items.map((item, index) => (
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
  );
}
