import React, { useState, useEffect } from 'react';
import ContactForm from './ContactForm';
import DeliveryForm from './DeliveryForm';
import ShippingMethod from './ShippingMethod';
import PaymentMethod from './PaymentMethod';
import BillingAddress from './BillingAddress';
import OrderSummary from './OrderSummary';
import Button from '../components/Button'; // ✅ Import Button component
import './Checkout.css';

const Checkout = () => {
  const [formData, setFormData] = useState({
    email: '',
    newsletter: false,
    firstName: '',
    lastName: '',
    address: '',
    apartment: '',
    city: '',
    state: '',
    pincode: '',
    phone: '',
    saveInfo: false,
    textOffers: false,
    country: 'india',
  });

  const [errors, setErrors] = useState({});
  const [paymentMethod, setPaymentMethod] = useState('online');
  const [billingAddressType, setBillingAddressType] = useState('same');
  const [billingAddress, setBillingAddress] = useState({
    firstName: '',
    lastName: '',
    address: '',
    apartment: '',
    city: '',
    state: '',
    pincode: '',
  });

  const [shippingMethod, setShippingMethod] = useState(null);
  const [shippingCost, setShippingCost] = useState(0);
  const [subtotal, setSubtotal] = useState(999.00);
  const [discount, setDiscount] = useState(0);
  const [discountCode, setDiscountCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);
  const [total, setTotal] = useState(subtotal);

  useEffect(() => {
    setTotal(subtotal - discount + shippingCost);
  }, [subtotal, discount, shippingCost]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });

    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: undefined
      });
    }
  };

  const handleShippingMethodChange = (method, cost) => {
    setShippingMethod(method);
    setShippingCost(cost);
  };

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
  };

  const handleBillingAddressTypeChange = (type) => {
    setBillingAddressType(type);
  };

  const handleBillingAddressChange = (e) => {
    const { name, value } = e.target;
    setBillingAddress({
      ...billingAddress,
      [name]: value
    });
  };

  const applyDiscount = () => {
    if (discountCode.trim() === '') {
      alert('Please enter a discount code');
      return;
    }

    if (discountCode.toLowerCase() === 'welcome10') {
      const discountAmount = subtotal * 0.1;
      setDiscount(discountAmount);
      setDiscountApplied(true);
      alert('Discount applied successfully!');
    } else {
      alert('Invalid discount code');
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const emailPattern = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}|[0-9]{10})$/;
    const pincodePattern = /^[0-9]{6}$/;
    const phonePattern = /^[0-9]{10}$/;

    if (!emailPattern.test(formData.email)) {
      newErrors.email = 'Please enter a valid email or phone number';
    }

    if (formData.firstName.trim() === '') {
      newErrors.firstName = 'Please enter your first name';
    }

    if (formData.lastName.trim() === '') {
      newErrors.lastName = 'Please enter your last name';
    }

    if (formData.address.trim() === '') {
      newErrors.address = 'Please enter your address';
    }

    if (formData.city.trim() === '') {
      newErrors.city = 'Please enter your city';
    }

    if (formData.state === '') {
      newErrors.state = 'Please select your state';
    }

    if (!pincodePattern.test(formData.pincode)) {
      newErrors.pincode = 'Please enter a valid 6-digit PIN code';
    }

    if (!phonePattern.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (billingAddressType === 'different') {
      if (billingAddress.firstName.trim() === '') {
        newErrors.billingFirstName = 'Please enter your first name';
      }

      if (billingAddress.lastName.trim() === '') {
        newErrors.billingLastName = 'Please enter your last name';
      }

      if (billingAddress.address.trim() === '') {
        newErrors.billingAddress = 'Please enter your address';
      }

      if (billingAddress.city.trim() === '') {
        newErrors.billingCity = 'Please enter your city';
      }

      if (billingAddress.state === '') {
        newErrors.billingState = 'Please select your state';
      }

      if (!pincodePattern.test(billingAddress.pincode)) {
        newErrors.billingPincode = 'Please enter a valid 6-digit PIN code';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      alert('Order placed successfully! ' + (paymentMethod === 'online' ? 'Redirecting to payment gateway...' : 'Your order has been confirmed!'));
    }
  };

  return (
    <div className="container">
      <div className="checkout-form">
        {/* <ContactForm 
          email={formData.email}
          newsletter={formData.newsletter}
          onChange={handleInputChange}
          errors={errors}
        /> */}

        <DeliveryForm 
          formData={formData}
          onChange={handleInputChange}
          errors={errors}
        />

        <ShippingMethod 
          address={formData.address}
          pincode={formData.pincode}
          state={formData.state}
          onShippingMethodChange={handleShippingMethodChange}
          selectedMethod={shippingMethod}
        />

        <PaymentMethod 
          selectedMethod={paymentMethod}
          onPaymentMethodChange={handlePaymentMethodChange}
        />

        <BillingAddress 
          type={billingAddressType}
          billingAddress={billingAddress}
          onTypeChange={handleBillingAddressTypeChange}
          onAddressChange={handleBillingAddressChange}
          errors={errors}
        />

        {/* ✅ Replaced native button with custom Button */}
        <Button 
          text={paymentMethod === 'online' ? 'Pay now' : 'Place order'} 
          onClick={handleSubmit} 
        />
      </div>

      <OrderSummary 
        subtotal={subtotal}
        discount={discount}
        discountCode={discountCode}
        discountApplied={discountApplied}
        shippingCost={shippingCost}
        total={total}
        onDiscountCodeChange={(e) => setDiscountCode(e.target.value)}
        onApplyDiscount={applyDiscount}
      />
    </div>
  );
};

export default Checkout;
