import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import styles from './PaymentBox.module.css';

const PaymentBox = ({ 
  email, // Add email prop 
  amount, 
  description,
  session,
  onPaymentComplete, 
  onPaymentError, 
  onPaymentDismissed  
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [payHereLoaded, setPayHereLoaded] = useState(false);

  // Load PayHere script
  useEffect(() => {
    const loadPayHereScript = () => {
      const script = document.createElement("script");
      script.src = "https://www.payhere.lk/lib/payhere.js";
      script.async = true;
      script.onload = () => {
        console.log("PayHere script loaded successfully");
        setPayHereLoaded(true);
      };
      script.onerror = () => {
        console.error("Failed to load PayHere script");
      };
      document.body.appendChild(script);
    };

    loadPayHereScript();
  }, []);

  // Handle payment completion
  const handlePaymentComplete = (orderId) => {
    console.log("Payment completed. Order ID:", orderId);
    // Store payment status in localStorage
    localStorage.setItem("paymentCompleted", "true");
    onPaymentComplete(orderId);
    setIsProcessing(false);
  };

  // Handle payment errors
  const handlePaymentError = (error) => {
    console.error("Payment error:", error);
    onPaymentError(error);
    setIsProcessing(false);
  };

  // Handle payment dismissal
  const handlePaymentDismissed = () => {
    console.log("Payment dismissed.");
    onPaymentDismissed();
    setIsProcessing(false);
  };

  // Initiate payment
  const initiatePayment = useCallback(async () => {
    if (!window.payhere || isProcessing) {
      console.error("PayHere not loaded or payment already processing");
      alert("Payment system not loaded. Please refresh the page and try again.");
      return;
    }

    setIsProcessing(true);

    try {
      // Prepare payment details
      const paymentDetails = {
        order_id: `ORDER-${Date.now()}`,
        amount: amount.toFixed(2), // Dynamic amount
        currency: "USD",
        first_name: "",
        last_name: "",
        email: email,
        phone: "",
        address: "",
        city: "",
        country: "Sri Lanka",
        custom_1: "interview_prep",
        custom_2: "one_time",
      };

      // Get hash from server
      const API_URL = process.env.REACT_APP_PAYMENTS_SERVER_URL || "http://localhost:4001";
      const hashResponse = await axios.post(`${API_URL}/payment/start`, paymentDetails);

      if (!hashResponse.data || !hashResponse.data.hash) {
        throw new Error("Failed to generate payment hash");
      }

      const { hash, merchant_id } = hashResponse.data;

      console.log("Sandbox", process.env.REACT_APP_SANDBOX === "true" || true);

      // Configure payment object with hash from server
      const payment = {
        sandbox: process.env.REACT_APP_SANDBOX === "true" || true,
        merchant_id: merchant_id,
        return_url: process.env.REACT_APP_RETURN_URL || window.location.href,
        cancel_url: process.env.REACT_APP_CANCEL_URL || window.location.href,
        notify_url: process.env.REACT_APP_NOTIFY_URL || `${API_URL}/payment/notify`,
        order_id: paymentDetails.order_id,
        items: "Chevening Interview Prep - One-time Access",
        amount: paymentDetails.amount,
        currency: paymentDetails.currency,
        hash: hash,
        first_name: paymentDetails.first_name,
        last_name: paymentDetails.last_name,
        email: paymentDetails.email,
        phone: paymentDetails.phone,
        address: paymentDetails.address,
        city: paymentDetails.city,
        country: paymentDetails.country,
        custom_1: paymentDetails.custom_1,
        custom_2: paymentDetails.custom_2,
      };

      // Set up PayHere event handlers
      window.payhere.onCompleted = handlePaymentComplete;
      window.payhere.onDismissed = handlePaymentDismissed;
      window.payhere.onError = handlePaymentError;

      // Start PayHere payment
      window.payhere.startPayment(payment);
    } catch (error) {
      console.error("Payment initialization error:", error);
      alert("There was an error initializing the payment. Please try again.");
      setIsProcessing(false);
    }
  }, [email, amount, isProcessing, onPaymentComplete, onPaymentDismissed, onPaymentError]);

  return (
  
      <div className={styles.tierInfo}>
        {description && <p className={styles.tierDescription}>{description}</p>}
        <button
          className={styles.paymentButton}
          onClick={initiatePayment}
          disabled={!payHereLoaded || isProcessing}
        >
          {isProcessing ? (
            <span>
              <i className={styles.loadingIcon}></i> Processing...
            </span>
          ) : (
            <span>
              <i className={styles.paymentIcon}></i> Pay ${amount}
            </span>
          )}
        </button>
        <div className="flex flex-col space-y-2 align-left">
          <p>session:{session}</p>
        </div>
      </div>

  );
};

export default PaymentBox;
