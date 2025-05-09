import React from 'react';

const BillingAddress = ({ type, billingAddress, onTypeChange, onAddressChange, errors }) => {
  const handleTypeSelect = (newType) => {
    onTypeChange(newType);
  };

  return (
    <div className="form-section">
      <div className="section-title">Billing address</div>

      <div
        className={`payment-option ${type === 'same' ? 'selected' : ''}`}
        onClick={() => handleTypeSelect('same')}
      >
        <input
          type="radio"
          name="billingAddress"
          id="same-address"
          checked={type === 'same'}
          onChange={() => {}}
        />
        <label htmlFor="same-address">Same as shipping address</label>
      </div>

      <div
        className={`payment-option ${type === 'different' ? 'selected' : ''}`}
        onClick={() => handleTypeSelect('different')}
      >
        <input
          type="radio"
          name="billingAddress"
          id="different-address"
          checked={type === 'different'}
          onChange={() => {}}
        />
        <label htmlFor="different-address">Use a different billing address</label>
      </div>

      {type === 'different' && (
        <div className="billing-form">
          <div className="form-group">
            <label>First Name</label>
            <input
              type="text"
              name="firstName"
              value={billingAddress.firstName}
              onChange={onAddressChange}
            />
            {errors.billingFirstName && <span className="error">{errors.billingFirstName}</span>}
          </div>

          <div className="form-group">
            <label>Last Name</label>
            <input
              type="text"
              name="lastName"
              value={billingAddress.lastName}
              onChange={onAddressChange}
            />
            {errors.billingLastName && <span className="error">{errors.billingLastName}</span>}
          </div>

          <div className="form-group">
            <label>Address</label>
            <input
              type="text"
              name="address"
              value={billingAddress.address}
              onChange={onAddressChange}
            />
            {errors.billingAddress && <span className="error">{errors.billingAddress}</span>}
          </div>

          <div className="form-group">
            <label>Apartment, suite, etc. (optional)</label>
            <input
              type="text"
              name="apartment"
              value={billingAddress.apartment}
              onChange={onAddressChange}
            />
          </div>

          <div className="form-group">
            <label>City</label>
            <input
              type="text"
              name="city"
              value={billingAddress.city}
              onChange={onAddressChange}
            />
            {errors.billingCity && <span className="error">{errors.billingCity}</span>}
          </div>

          <div className="form-group">
            <label>State</label>
            <select
              name="state"
              value={billingAddress.state}
              onChange={onAddressChange}
            >
              <option value="">Select state</option>
              <option value="delhi">Delhi</option>
              <option value="maharashtra">Maharashtra</option>
              <option value="tamilnadu">Tamil Nadu</option>
              <option value="karnataka">Karnataka</option>
              <option value="westbengal">West Bengal</option>
              {/* Add more as needed */}
            </select>
            {errors.billingState && <span className="error">{errors.billingState}</span>}
          </div>

          <div className="form-group">
            <label>PIN Code</label>
            <input
              type="text"
              name="pincode"
              value={billingAddress.pincode}
              onChange={onAddressChange}
            />
            {errors.billingPincode && <span className="error">{errors.billingPincode}</span>}
          </div>
        </div>
      )}
    </div>
  );
};

export default BillingAddress;
