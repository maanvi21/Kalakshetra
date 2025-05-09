import React from 'react';
import './Offers.css';
import Button from './Button';

// Sample promotional offers data
const offersData = [
  {
    id: 1,
    title: '70% Off Clearance Sale',
    description: 'Huge discounts on last season\'s styles. Limited time only!',
    image: '/images/offer1.png'
  },
  {
    id: 2,
    title: 'Diwali Festive Offers',
    description: 'Celebrate with sparkle – get amazing festive discounts!',
    image: '/images/offer2.png'
  },
  {
    id: 3,
    title: 'New Arrivals',
    description: 'Check out the latest trends and new collection drops.',
    image: '/images/offer3.png'
  },{
    id: 4,
    title: '70% Off Clearance Sale',
    description: 'Huge discounts on last season\'s styles. Limited time only!',
    image: '/images/offer1.png'
  },
  {
    id: 5,
    title: 'Diwali Festive Offers',
    description: 'Celebrate with sparkle – get amazing festive discounts!',
    image: '/images/offer2.png'
  },
  {
    id: 6,
    title: 'New Arrivals',
    description: 'Check out the latest trends and new collection drops.',
    image: '/images/offer3.png'
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
