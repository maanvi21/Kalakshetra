import React from 'react';
import Button from '../components/Button';
import './OrderSummary.css';

const OrderSummary = ({
  subtotal,
  discount,
  discountCode,
  discountApplied,
  shippingCost,
  total,
  onDiscountCodeChange,
  onApplyDiscount
}) => {
  return (
    <div className="order-summary">
      <h2 className="summary-title">Order Summary</h2>

      <div className="summary-row">
        <span>Subtotal:</span>
        <span>₹{subtotal.toFixed(2)}</span>
      </div>

      <div className="summary-row">
        <span>Shipping:</span>
        <span>{shippingCost > 0 ? `₹${shippingCost.toFixed(2)}` : 'Free'}</span>
      </div>

      {discount > 0 && (
        <div className="summary-row">
          <span>Discount:</span>
          <span className="discount">-₹{discount.toFixed(2)}</span>
        </div>
      )}

      <div className="discount-code-section">
        <input
          type="text"
          placeholder="Enter discount code"
          value={discountCode}
          onChange={onDiscountCodeChange}
          disabled={discountApplied}
        />
        <Button
          text={discountApplied ? 'Applied' : 'Apply'}
          onClick={onApplyDiscount}
        />
      </div>

      <div className="summary-total">
        <strong>Total:</strong>
        <strong>₹{total.toFixed(2)}</strong>
      </div>
    </div>
  );
};

export default OrderSummary;
