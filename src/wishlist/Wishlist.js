import React from 'react'
import './Wishlist.css'
import Button from '../components/Button'
import productItems from '../data/ProductData'
import Header from '../components/Header'
import { useNavigate } from 'react-router-dom'
export default function Wishlist() {
    const navigate=useNavigate();
  return (
    <div>
       <Header/>
                <div>
                  {productItems.length > 0 ? (
                    <div className="item-grid">
                      {productItems.map((item) => (
                        <div className="wishlist-item" key={item.id}>
                          <img src={item.image} alt={item.name} className="item-image" />
                          <div className="item-details">
                            <h2 className="item-name">{item.name}</h2>
                            <p className="item-price">₹{item.price}</p>
                          </div>
                       <Button text='Move to Cart' onClick={() => navigate('/cart')} />
                        
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="empty-message">Your wishlist is empty.</p>
                  )}
                </div>
              
    </div>
  )
}
