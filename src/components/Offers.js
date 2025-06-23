import React from 'react';
import './Offers.css';
import Button from './Button';

// Sample promotional offers data
const offersData = [
  {
    id: 1,
    title: '70% Off Clearance Sale',
    description: 'Huge discounts on last season\'s styles. Limited time only!',
    image: 'https://i.pinimg.com/736x/9e/7d/71/9e7d712d5538ef7d5a27737de838c003.jpg'
  },
  {
    id: 2,
    title: 'Diwali Festive Offers',
    description: 'Celebrate with sparkle – get amazing festive discounts!',
    image: '/assets/Offers2.jpg'
  },
  {
    id: 3,
    title: 'New Arrivals',
    description: 'Check out the latest trends and new collection drops.',
    image: 'https://i.pinimg.com/736x/f2/db/05/f2db0563f6cf86ad7780f6a12ec444aa.jpg'
  },{
    id: 4,
    title: '70% Off Clearance Sale',
    description: 'Huge discounts on last season\'s styles. Limited time only!',
    image: 'https://i.pinimg.com/736x/9e/7d/71/9e7d712d5538ef7d5a27737de838c003.jpg'
  },
  {
    id: 5,
    title: 'Diwali Festive Offers',
    description: 'Celebrate with sparkle – get amazing festive discounts!',
    image: '/assets/Offers2.jpg'
  },
  {
    id: 6,
    title: 'New Arrivals',
    description: 'Check out the latest trends and new collection drops.',
    image: 'https://i.pinimg.com/736x/f2/db/05/f2db0563f6cf86ad7780f6a12ec444aa.jpg'
  }
];

// Individual Offer Card Component
const OfferCard = ({ offer }) => (
  <div className="offers-card">
    <div className="card-header">
      <img src={offer.image} alt={offer.title} className="card-image" />
    </div>
    <div className="card-content">
      <h3 className="card-title">{offer.title}</h3>
      <p className="card-description">{offer.description}</p>
    </div>
    <div className="card-footer">
      {/* <Button text="Shop Now" onClick={() => {}} /> */}
    </div>
  </div>
);

// Offers Section Component
const Offers = () => {
  return (
<div className="offers-section">
  <h2 className="section-title">Current Offers</h2>
  <div className="offers-scroll-wrapper">
    <div className="offers-grid animate-scroll">
      {offersData.map((offer) => (
        <OfferCard key={offer.id} offer={offer} />
      ))}
    </div>
  </div>
</div>

  );
};

export default Offers;
