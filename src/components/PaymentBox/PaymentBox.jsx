import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './PaymentBox.module.css';

const PaymentBox = ({
  amount = "1000.00",
  currency = "LKR",
  orderId,
  itemName = "Premium Service",
  customerDetails = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    country: "Sri Lanka",
  },
  deliveryDetails = {
    address: "",
    city: "",
    country: "Sri Lanka",
  },
  customData = {
    custom_1: "",
    custom_2: "",
  },
  onPaymentComplete,
  onPaymentDismissed,
  onPaymentError
}) => {
  const [paymentInitialized, setPaymentInitialized] = useState(false);

  // Load the PayHere script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://www.payhere.lk/lib/payhere.js';
    script.async = true;
    script.onload = () => setPaymentInitialized(true);
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  // Set up PayHere event handlers
  useEffect(() => {
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
        console.log("PayHere Error:", error);
        console.log("Error type:", typeof error);
        // Try to get more details if possible
        if (typeof error === 'object') {
          console.log("Error details:", JSON.stringify(error));
        }
        if (onPaymentError) onPaymentError(error);
      };

      // Add this for initialization debugging
      console.log("PayHere handlers set up. PayHere object:",
        window.payhere ? "exists" : "missing");
    }
  }, [paymentInitialized, onPaymentComplete, onPaymentDismissed, onPaymentError]);

  const handlePayment = async () => {
    if (!window.payhere) {
      const errorMsg = 'PayHere script not loaded properly';
      console.error(errorMsg);
      if (onPaymentError) onPaymentError(errorMsg);
      return;
    }

    console.log("Starting payment process...");
    console.log("Environment variables:", {
      SANDBOX: process.env.REACT_APP_SANDBOX,
      API_URL: process.env.REACT_APP_PAYMENTS_SERVER_URL,
      RETURN_URL: process.env.REACT_APP_RETURN_URL,
      CANCEL_URL: process.env.REACT_APP_CANCEL_URL,
      NOTIFY_URL: process.env.REACT_APP_NOTIFY_URL
    });

    try {
      // Prepare payment details
      const paymentDetails = {
        order_id: orderId || `ORDER-${Date.now()}`,
        amount: amount,
        currency: currency,
        first_name: customerDetails.firstName,
        last_name: customerDetails.lastName,
        email: customerDetails.email,
        phone: customerDetails.phone,
        address: customerDetails.address,
        city: customerDetails.city,
        country: customerDetails.country,
        custom_1: customData.custom_1,
        custom_2: customData.custom_2,
      };

      console.log("Payment details:", JSON.stringify(paymentDetails, null, 2));

      // Get hash from server (more secure than generating on client)
      const API_URL = process.env.REACT_APP_PAYMENTS_SERVER_URL || "http://localhost:4001";
      console.log("Making API request to:", `${API_URL}/payment/start`);

      try {
        const hashResponse = await axios.post(
          `${API_URL}/payment/start`,
          paymentDetails
        );

        console.log("Server response:", JSON.stringify(hashResponse.data, null, 2));

        if (!hashResponse.data || !hashResponse.data.hash) {
          throw new Error('Failed to generate payment hash - missing data in response');
        }

        const { hash, merchant_id } = hashResponse.data;

        console.log("Payment configuration:", {
          hash: hash ? hash.substring(0, 10) + "..." : "missing",
          merchant_id: merchant_id || "missing",
          sandbox: process.env.REACT_APP_SANDBOX !== "false" ? "true" : "false"
        });

        // Configure payment object with hash from server
        // Configure payment object with hash from server
        const payment = {
          sandbox: false, // Change this to true for testing
          merchant_id: merchant_id,
          return_url: process.env.REACT_APP_RETURN_URL || window.location.href,
          cancel_url: process.env.REACT_APP_CANCEL_URL || window.location.href,
          notify_url: process.env.REACT_APP_NOTIFY_URL || `${API_URL}/payment/notify`,
          order_id: paymentDetails.order_id,
          items: itemName,
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
          delivery_address: deliveryDetails.address,
          delivery_city: deliveryDetails.city,
          delivery_country: deliveryDetails.country,
          custom_1: paymentDetails.custom_1,
          custom_2: paymentDetails.custom_2,
        };

        console.log("Initiating PayHere payment with config:", JSON.stringify({
          ...payment,
          hash: "HIDDEN" // Don't log the actual hash
        }, null, 2));

        // Start PayHere payment
        try {
          console.log("About to call window.payhere.startPayment");
          window.payhere.startPayment(payment);
          console.log("startPayment call completed");
        } catch (paymentError) {
          console.error("Error starting payment:", paymentError);
          if (onPaymentError) onPaymentError(paymentError.message || "Error starting payment");
        }
      }
      catch (hashError) {
        console.error("Error fetching payment hash:", hashError);
        if (onPaymentError) onPaymentError(hashError.message || "Error fetching payment hash");
      }
    } catch (error) {
      console.error('Payment initialization error:', error.message);
      console.error('Stack trace:', error.stack);

      // Check if it's PH-0013 or other PayHere errors
      if (error.message && error.message.includes('PH-0013')) {
        console.error('This is typically a merchant authentication issue or incorrect hash');
        // Additional diagnostic checks
        if (!window.payhere) {
          console.error('PayHere object not found in window object');
        }
      }

      if (onPaymentError) onPaymentError(error.message);
    }
  };

  return (
    <div className={styles["payment-box"]}>
      <button
        className={styles["payhere-button"]}
        onClick={handlePayment}
        disabled={!paymentInitialized}
      >
        {paymentInitialized ? 'Pay Now' : 'Loading Payment...'}
      </button>
    </div>
  );
};

export default PaymentBox;