import React, { useEffect, useState } from 'react';
import md5 from 'blueimp-md5';
import './PaymentBox.module.css';

const PaymentBox = ({
  amount = "1000.00",
  currency = "LKR",
  orderId = "ItemNo12345",
  itemName = "Door bell wireless",
  customerDetails = {
    firstName: "Saman",
    lastName: "Perera",
    email: "samanp@gmail.com",
    phone: "0771234567",
    address: "No.1, Galle Road",
    city: "Colombo",
    country: "Sri Lanka",
  },
  deliveryDetails = {
    address: "No. 46, Galle road, Kalutara South",
    city: "Kalutara",
    country: "Sri Lanka",
  },
  onPaymentComplete,
  onPaymentDismissed,
  onPaymentError
}) => {
  const [paymentInitialized, setPaymentInitialized] = useState(false);

  useEffect(() => {
    // Load PayHere script when component mounts
    const script = document.createElement('script');
    script.src = 'https://www.payhere.lk/lib/payhere.js';
    script.async = true;
    script.onload = () => setPaymentInitialized(true);
    document.body.appendChild(script);

    // Clean up script when component unmounts
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    // Set up PayHere event handlers once script is loaded
    if (paymentInitialized && window.payhere) {
      window.payhere.onCompleted = function(orderId) {
        console.log("Payment completed. OrderID:" + orderId);
        if (onPaymentComplete) onPaymentComplete(orderId);
      };

      window.payhere.onDismissed = function() {
        console.log("Payment dismissed");
        if (onPaymentDismissed) onPaymentDismissed();
      };

      window.payhere.onError = function(error) {
        console.log("Error:" + error);
        if (onPaymentError) onPaymentError(error);
      };
    }
  }, [paymentInitialized, onPaymentComplete, onPaymentDismissed, onPaymentError]);

  const handlePayment = () => {
    if (!window.payhere) {
      console.error('PayHere script not loaded');
      return;
    }

    const MERCHANT_ID = "1229782";
    const MERCHANT_SECRET = "NzcyNDEzODI2MzUzMTM0MTk2NDgzNDUxNjg5MjEzMTM0NDczMzU=";
    const RETURN_URL = "http://localhost:3002/return";
    const CANCEL_URL = "http://localhost:3002/cancel";
    const NOTIFY_URL = "http://localhost:3002/notify";

    const toUpperCase = (str) => str.toUpperCase();
    const hash = toUpperCase(
      md5(
        MERCHANT_ID +
        orderId +
        amount +
        currency +
        toUpperCase(md5(MERCHANT_SECRET))
      )
    );

    const payment = {
      sandbox: true,
      merchant_id: MERCHANT_ID,
      return_url: RETURN_URL,
      cancel_url: CANCEL_URL,
      notify_url: NOTIFY_URL,
      order_id: orderId,
      items: itemName,
      amount: amount,
      currency: currency,
      hash: hash,
      first_name: customerDetails.firstName,
      last_name: customerDetails.lastName,
      email: customerDetails.email,
      phone: customerDetails.phone,
      address: customerDetails.address,
      city: customerDetails.city,
      country: customerDetails.country,
      delivery_address: deliveryDetails.address,
      delivery_city: deliveryDetails.city,
      delivery_country: deliveryDetails.country,
      custom_1: "",
      custom_2: ""
    };

    window.payhere.startPayment(payment);
  };

  return (
    <div className="payment-box">
      <button
        className="payhere-button"
        onClick={handlePayment}
        disabled={!paymentInitialized}
      >
        {paymentInitialized ? 'PayHere Pay' : 'Loading Payment...'}
      </button>
    </div>
  );
};

export default PaymentBox;