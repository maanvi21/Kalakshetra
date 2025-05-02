import React from 'react';

const PaymentMethod = ({ selectedMethod, onPaymentMethodChange }) => {
  const handlePaymentMethodSelect = (method) => {
    onPaymentMethodChange(method);
  };

  return (
    <div className="form-section">
      <div className="section-title">Payment</div>
      <p style={{ marginBottom: '15px' }}>All transactions are secure and encrypted.</p>

      <div 
        className={`payment-option ${selectedMethod === 'online' ? 'selected' : ''}`}
        onClick={() => handlePaymentMethodSelect('online')}
      >
        <input 
          type="radio" 
          name="paymentMethod" 
          id="online-payment" 
          checked={selectedMethod === 'online'}
          onChange={() => {}}
        />
        <label htmlFor="online-payment">PhonePe Payment Gateway (UPI, Cards & NetBanking)</label>
        <div className="payment-icons">
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Paytm_Logo_%28standalone%29.svg/2560px-Paytm_Logo_%28standalone%29.svg.png" alt="UPI" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png" alt="Visa" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/MasterCard_Logo.svg/2560px-MasterCard_Logo.svg.png" alt="Mastercard" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/RuPay.svg/2560px-RuPay.svg.png" alt="RuPay" />
        </div>
      </div>

      {selectedMethod === 'online' && (
        <div className="payment-gateway-info">
          <img className="gateway-image" src="https://cdn-icons-png.flaticon.com/512/6214/6214494.png" alt="Payment Gateway" />
          <p>After clicking "Pay now", you will be redirected to <br />PhonePe Payment Gateway (UPI, Cards & NetBanking)<br /> to complete your purchase securely.</p>
        </div>
      )}

      <div 
        className={`payment-option ${selectedMethod === 'cod' ? 'selected' : ''}`}
        onClick={() => handlePaymentMethodSelect('cod')}
      >
        <input 
          type="radio" 
          name="paymentMethod" 
          id="cod" 
          checked={selectedMethod === 'cod'}
          onChange={() => {}}
        />
        <label htmlFor="cod">Cash on Delivery (COD)</label>
      </div>
    </div>
  );
};

export default PaymentMethod;