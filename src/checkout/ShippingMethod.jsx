import React, { useState, useEffect } from 'react';

const ShippingMethod = ({ address, pincode, state, onShippingMethodChange, selectedMethod }) => {
  const [shippingOptions, setShippingOptions] = useState([]);

  useEffect(() => {
    // Check if address details are filled to show shipping methods
    if (address && pincode && state) {
      setShippingOptions([
        { 
          id: 'standard',
          name: 'Standard Shipping',
          description: '3-5 business days',
          cost: 40
        },
        {
          id: 'express',
          name: 'Express Shipping',
          description: '1-2 business days',
          cost: 100
        }
      ]);
      
      // Select the standard shipping by default if nothing is selected yet
      if (!selectedMethod) {
        onShippingMethodChange('standard', 40);
      }
    } else {
      setShippingOptions([]);
    }
  }, [address, pincode, state, selectedMethod, onShippingMethodChange]);

  const handleShippingMethodSelect = (methodId, cost) => {
    onShippingMethodChange(methodId, cost);
  };

  return (
    <div className="form-section">
      <div className="section-title">Shipping method</div>
      
      {shippingOptions.length > 0 ? (
        shippingOptions.map(option => (
          <div 
            key={option.id}
            className={`payment-option ${selectedMethod === option.id ? 'selected' : ''}`}
            onClick={() => handleShippingMethodSelect(option.id, option.cost)}
          >
            <input 
              type="radio" 
              name="shippingMethod" 
              id={`${option.id}-shipping`} 
              checked={selectedMethod === option.id}
              onChange={() => {}}
            />
            <label htmlFor={`${option.id}-shipping`}>{option.name} ({option.description})</label>
            <div className="payment-icons">₹{option.cost.toFixed(2)}</div>
          </div>
        ))
      ) : (
        <p>Enter your shipping address to view available shipping methods.</p>
      )}
    </div>
  );
};

export default ShippingMethod;