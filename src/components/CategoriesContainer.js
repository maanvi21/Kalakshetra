import React from 'react';
import Button from './Button';
import './CategoriesContainer.css';
import { useNavigate } from 'react-router-dom';

export default function CategoriesContainer({ items }) {
  const navigate = useNavigate();

  const navToBrowse = () => {
    navigate('/browse');
  };

  // Duplicate the items to create a seamless scrolling effect
  const duplicatedItems = [...items, ...items];

  return (
    <div className="categories-scroll-wrapper">
      <div className="categories-container">
        {duplicatedItems.map((item, index) => (
          <div className="category-item" key={index}>
            <img src={item.image} alt="" />
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <div className="button">
              <Button text="Browse" onClick={navToBrowse} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
