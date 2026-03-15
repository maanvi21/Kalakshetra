import React from 'react';
import { useNavigate } from 'react-router-dom';

const ContactForm = ({ email, newsletter, onChange, errors }) => {
  const navigate = useNavigate();

  return (
    <div className="form-section">
      <div className="section-title">
        Contact
        {/* ✅ button instead of <a href="#"> */}
        <button
          type="button"
          className="login-link-btn"
          onClick={() => navigate('/login')}
        >
          Log in
        </button>
      </div>
      <input
        type="email"
        className={`form-control ${errors.email ? 'error' : ''}`}
        name="email"
        value={email}
        onChange={onChange}
        placeholder="Email or mobile phone number"
        required
      />
      {errors.email && (
        <div className="error-message-visible">{errors.email}</div>
      )}
      <div className="checkbox-container">
        <input
          type="checkbox"
          id="newsletter"
          name="newsletter"
          checked={newsletter}
          onChange={onChange}
        />
        <label htmlFor="newsletter">Email me with news and offers</label>
      </div>
    </div>
  );
};

export default ContactForm;