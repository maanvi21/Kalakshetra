import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ContactForm from './ContactForm';
import DeliveryForm from './DeliveryForm';
import ShippingMethod from './ShippingMethod';
import PaymentMethod from './PaymentMethod';
import BillingAddress from './BillingAddress';
import OrderSummary from './OrderSummary';
import Button from '../components/Button';
import Header from '../components/user-components/Header';
import { useStateValue } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import './Checkout.css';

const Checkout = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useStateValue();
  const { user } = useAuth();
  
  // Check if cart is empty
  const isCartEmpty = !state.cart || state.cart.length === 0;

  // Order processing states
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  const [formData, setFormData] = useState({
    email: user?.email || '',
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
  const [discount, setDiscount] = useState(0);
  const [discountCode, setDiscountCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);
  
  // Calculate cart subtotal
  const calculateSubtotal = () => {
    return state.cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };
  
  // Calculate total items in cart
  const calculateTotalItems = () => {
    return state.cart.reduce((sum, item) => sum + item.quantity, 0);
  };

  const [subtotal, setSubtotal] = useState(isCartEmpty ? 0 : calculateSubtotal());
  const [total, setTotal] = useState(subtotal);

  // Update subtotal when cart changes
  useEffect(() => {
    if (!isCartEmpty) {
      setSubtotal(calculateSubtotal());
    }
  }, [state.cart]);

  // Update total when dependent values change
  useEffect(() => {
    setTotal(subtotal - discount + shippingCost);
  }, [subtotal, discount, shippingCost]);

  // Update email when user changes
  useEffect(() => {
    if (user?.email) {
      setFormData(prevData => ({
        ...prevData,
        email: user.email
      }));
    }
  }, [user]);

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
      setIsProcessing(true);
      
      // Simulate order processing with a timeout
      setTimeout(() => {
        // Clear cart ONLY after successful checkout
        dispatch({ type: 'CLEAR_CART' });
        
        // Set order as complete
        setIsProcessing(false);
        setOrderComplete(true);
        
        // Log order details for debugging
        console.log('Order completed for user:', user?.email || 'guest');
        console.log('Cart cleared successfully');
        console.log('Order details:', {
          customer: `${formData.firstName} ${formData.lastName}`,
          shipping: formData.address,
          items: state.cart,
          total: total
        });
        
        // Show success message
        alert(`Order placed successfully! ${paymentMethod === 'online' ? 'Redirecting to payment gateway...' : 'Your order has been confirmed!'}`);
        
        // Redirect after a delay
        setTimeout(() => {
          navigate('/order-confirmation', { 
            state: { 
              orderDetails: {
                customer: `${formData.firstName} ${formData.lastName}`,
                email: formData.email,
                items: state.cart,
                total: total,
                paymentMethod: paymentMethod,
                shippingAddress: `${formData.address}, ${formData.city}, ${formData.state}, ${formData.pincode}`
              } 
            } 
          });
        }, 1000);
      }, 1500);
    }
  };

  return (
    <div className="checkout-page">
      <Header />
      
      {orderComplete ? (
        <div className="order-success-container">
          <div className="order-success">
            <h2>Order Placed Successfully!</h2>
            <p>Redirecting to confirmation page...</p>
          </div>
        </div>
      ) : isCartEmpty ? (
        <div className="empty-checkout-container">
          <div className="empty-checkout">
            <p>Your cart is empty. Please add items before checkout.</p>
            <Button text="Continue Shopping" onClick={() => navigate('/')} />
          </div>
        </div>
      ) : (
        <div className="container">
          <h1 className="checkout-title">Checkout</h1>
          
          <div className="checkout-form">
            {/* Uncomment if you want to include ContactForm
            <ContactForm 
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

            <div className="checkout-buttons">
              <Button 
                text="Back to Cart" 
                onClick={() => navigate('/cart')} 
              />
              <Button 
                text={isProcessing ? "Processing..." : (paymentMethod === 'online' ? 'Pay now' : 'Place order')} 
                onClick={handleSubmit}
                disabled={isProcessing}
              />
            </div>
          </div>

          <OrderSummary 
            subtotal={subtotal}
            discount={discount}
            discountCode={discountCode}
            discountApplied={discountApplied}
            shippingCost={shippingCost}
            total={total}
            totalItems={calculateTotalItems()}
            onDiscountCodeChange={(e) => setDiscountCode(e.target.value)}
            onApplyDiscount={applyDiscount}
            cartItems={state.cart}
          />
        </div>
      )}
    </div>
  );
};

export default Checkout;