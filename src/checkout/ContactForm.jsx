import React from 'react';

const ContactForm = ({ email, newsletter, onChange, errors }) => {
  const handleLoginClick = (e) => {
    e.preventDefault();
    alert('Login feature would be implemented here');
  };

  return (
    <div className="form-section">
      <div className="section-title">
        Contact
        <a href="#" onClick={handleLoginClick}>Log in</a>
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