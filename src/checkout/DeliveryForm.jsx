import React from 'react';

const DeliveryForm = ({ formData, onChange, errors }) => {
  return (
    <div className="form-section">
      <div className="section-title">Delivery</div>
      <div className="form-group">
        <select
          className="form-control"
          name="country"
          value={formData.country}
          onChange={onChange}
        >
          <option value="india">India</option>
          <option value="usa">United States</option>
          <option value="uk">United Kingdom</option>
        </select>
      </div>

      <div className="form-row">
        <div className="form-group">
          <input
            type="text"
            className={`form-control ${errors.firstName ? 'error' : ''}`}
            name="firstName"
            value={formData.firstName}
            onChange={onChange}
            placeholder="First name"
            required
          />
          {errors.firstName && (
            <div className="error-message-visible">{errors.firstName}</div>
          )}
        </div>
        <div className="form-group">
          <input
            type="text"
            className={`form-control ${errors.lastName ? 'error' : ''}`}
            name="lastName"
            value={formData.lastName}
            onChange={onChange}
            placeholder="Last name"
            required
          />
          {errors.lastName && (
            <div className="error-message-visible">{errors.lastName}</div>
          )}
        </div>
      </div>

      <div className="form-group">
        <input
          type="text"
          className={`form-control ${errors.address ? 'error' : ''}`}
          name="address"
          value={formData.address}
          onChange={onChange}
          placeholder="Address"
          required
        />
        {errors.address && (
          <div className="error-message-visible">{errors.address}</div>
        )}
      </div>

      <div className="form-group">
        <input
          type="text"
          className="form-control"
          name="apartment"
          value={formData.apartment}
          onChange={onChange}
          placeholder="Apartment, suite, etc. (optional)"
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <input
            type="text"
            className={`form-control ${errors.city ? 'error' : ''}`}
            name="city"
            value={formData.city}
            onChange={onChange}
            placeholder="City"
            required
          />
          {errors.city && (
            <div className="error-message-visible">{errors.city}</div>
          )}
        </div>
        <div className="form-group">
          <select
            className={`form-control ${errors.state ? 'error' : ''}`}
            name="state"
            value={formData.state}
            onChange={onChange}
            required
          >
            <option value="" disabled>State</option>
            <option value="maharashtra">Maharashtra</option>
            <option value="delhi">Delhi</option>
            <option value="karnataka">Karnataka</option>
            {/* Add more states as needed */}
          </select>
          {errors.state && (
            <div className="error-message-visible">{errors.state}</div>
          )}
        </div>
        <div className="form-group">
          <input
            type="text"
            className={`form-control ${errors.pincode ? 'error' : ''}`}
            name="pincode"
            value={formData.pincode}
            onChange={onChange}
            placeholder="PIN code"
            required
          />
          {errors.pincode && (
            <div className="error-message-visible">{errors.pincode}</div>
          )}
        </div>
      </div>

      <div className="form-group">
        <input
          type="tel"
          className={`form-control ${errors.phone ? 'error' : ''}`}
          name="phone"
          value={formData.phone}
          onChange={onChange}
          placeholder="Phone"
          required
        />
        {errors.phone && (
          <div className="error-message-visible">{errors.phone}</div>
        )}
      </div>

      <div className="checkbox-container">
        <input
          type="checkbox"
          id="saveInfo"
          name="saveInfo"
          checked={formData.saveInfo}
          onChange={onChange}
        />
        <label htmlFor="saveInfo">Save this information for next time</label>
      </div>

      <div className="checkbox-container">
        <input
          type="checkbox"
          id="textOffers"
          name="textOffers"
          checked={formData.textOffers}
          onChange={onChange}
        />
        <label htmlFor="textOffers">Text me with news and offers</label>
      </div>
    </div>
  );
};

export default DeliveryForm;