import React, { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Offers.css';

const BASE_URL = 'https://kalakshetra3-5 .onrender.com';

const BADGE_COLORS = {
  HOT: '#ff4d2e',
  NEW: '#2c6e49',
  FESTIVE: '#c8891a',
  SALE: '#1a4a8a',
  EXCLUSIVE: '#5c2d8a',
  LIMITED: '#1c1c1c',
};

const OfferCard = ({ offer }) => {
  const navigate = useNavigate();

  const handleShopNow = (e) => {
    e.stopPropagation();
    if (offer.link) {
      navigate(offer.link);
    } else {
      navigate('/womenProducts');
    }
  };

  return (
    <div className="offer-card">
      <div className="offer-card-img">
        <img src={offer.image} alt={offer.title} loading="lazy" />
        {offer.badge && (
          <span
            className="offer-badge"
            style={{ background: BADGE_COLORS[offer.badge] || '#333' }}
          >
            {offer.badge}
          </span>
        )}
        <div className="offer-card-overlay">
          <button className="offer-shop-btn" onClick={handleShopNow}>
            Shop Now →
          </button>
        </div>
      </div>
      <div className="offer-card-body">
        <h3 className="offer-card-title">{offer.title}</h3>
        <p className="offer-card-desc">{offer.description}</p>
      </div>
    </div>
  );
};

const SkeletonCard = () => (
  <div className="offer-card offer-card--skeleton">
    <div className="offer-skeleton-img" />
    <div className="offer-card-body">
      <div className="offer-skeleton-line offer-skeleton-line--title" />
      <div className="offer-skeleton-line" />
      <div className="offer-skeleton-line offer-skeleton-line--short" />
    </div>
  </div>
);

const Offers = () => {
  const trackRef = useRef(null);
  const [offers, setOffers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const res = await fetch(`${BASE_URL}/offers/active`);
        if (!res.ok) throw new Error(`${res.status}`);
        const data = await res.json();
        setOffers(data.offers || []);
      } catch (err) {
        setError('Could not load offers right now.');
        console.error('Offers fetch error:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchOffers();
  }, []);

  const scroll = (dir) => {
    if (!trackRef.current) return;
    trackRef.current.scrollBy({ left: dir * 340, behavior: 'smooth' });
  };

  return (
    <section className="offers-section">
      <div className="offers-header">
        <div>
          <p className="offers-eyebrow">Exclusive Deals</p>
          <h2 className="offers-title">Current Offers</h2>
        </div>
        <div className="offers-nav">
          <button
            className="offers-nav-btn"
            onClick={(e) => { e.stopPropagation(); scroll(-1); }}
            aria-label="Previous"
          >
            ‹
          </button>
          <button
            className="offers-nav-btn"
            onClick={(e) => { e.stopPropagation(); scroll(1); }}
            aria-label="Next"
          >
            ›
          </button>
        </div>
      </div>

      <div className="offers-track-wrapper">
        <div className="offers-track" ref={trackRef}>
          {isLoading && [1, 2, 3].map((i) => <SkeletonCard key={i} />)}

          {!isLoading && error && (
            <p className="offers-error">{error}</p>
          )}

          {!isLoading && !error && offers.length === 0 && (
            <p className="offers-empty">No offers available right now.</p>
          )}

          {!isLoading && !error && offers.map((offer) => (
            <OfferCard key={offer._id} offer={offer} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Offers;