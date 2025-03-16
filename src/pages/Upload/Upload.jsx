import React, { useState, useEffect, useCallback, useRef } from "react";
import MainLayout from "../../layouts/MainLayout";
import ActionBox from "../../components/ActionBox/ActionBox";
import Uploader from "../../components/Uploader/Uploader";
import PaymentBox from "../../components/PaymentBox/PaymentBox";
import styles from "./Upload.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Upload = () => {
  const [filePath, setFilePath] = useState(null);
  const [showPaymentPopup, setShowPaymentPopup] = useState(false);
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [payHereLoaded, setPayHereLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Load PayHere script
    const loadPayHereScript = () => {
      const script = document.createElement('script');
      script.src = 'https://www.payhere.lk/lib/payhere.js';
      script.async = true;
      script.onload = () => {
        console.log('PayHere script loaded successfully');
        setPayHereLoaded(true);
      };
      script.onerror = () => {
        console.error('Failed to load PayHere script');
      };
      document.body.appendChild(script);
    };

    loadPayHereScript();

    // Check if the user has already paid (from localStorage)
    const hasUserPaid = localStorage.getItem("paymentCompleted") === "true";

    if (!hasUserPaid) {
      // Show payment popup if user hasn't paid
      setShowPaymentPopup(true);
    } else {
      // User has already paid
      setPaymentCompleted(true);
    }
  }, []);

  const handleUploadSuccess = (path) => {
    setFilePath(path);
    console.log("File path:", path);

    // Navigate to Interview page
    navigate("/interview");
  };

  const handlePaymentComplete = (orderId) => {
    console.log("Payment completed. Order ID:", orderId);
    // Store payment status in localStorage
    localStorage.setItem("paymentCompleted", "true");
    setPaymentCompleted(true);
    setShowPaymentPopup(false);
    setIsProcessingPayment(false);
  };

  const handlePaymentDismissed = () => {
    console.log("Payment dismissed.");
    setIsProcessingPayment(false);
  };

  const handlePaymentError = (error) => {
    console.error("Payment error:", error);
    // Handle the error appropriately
    alert("There was an error with the payment. Please try again.");
    setIsProcessingPayment(false);
  };

  // Function to handle closing the popup
  const handleClosePaymentPopup = () => {
    setShowPaymentPopup(false);
  };

  // Function to directly initiate the PayHere payment process
  const initiatePaymentDirectly = useCallback(async () => {
    if (!window.payhere || isProcessingPayment) {
      console.error('PayHere not loaded or payment already processing');
      alert("Payment system not loaded. Please refresh the page and try again.");
      return;
    }

    setIsProcessingPayment(true);

    try {
      // Prepare payment details
      const paymentDetails = {
        order_id: `ORDER-${Date.now()}`,
        amount: "10.00",
        currency: "USD",
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        country: "Sri Lanka",
        custom_1: "interview_prep",
        custom_2: "one_time",
      };

      // Get hash from server (more secure than generating on client)
      const API_URL = process.env.REACT_APP_CHEVENINGBREW_SERVER_URL || "http://localhost:8001";
      const hashResponse = await axios.post(
        `${API_URL}/start`,
        paymentDetails
      );

      if (!hashResponse.data || !hashResponse.data.hash) {
        throw new Error('Failed to generate payment hash');
      }

      const { hash, merchant_id } = hashResponse.data;

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
      console.error('Payment initialization error:', error);
      alert("There was an error initializing the payment. Please try again.");
      setIsProcessingPayment(false);
    }
  }, [isProcessingPayment]);

  return (
    <MainLayout>
      {showPaymentPopup && (
      <div className={styles.paymentPopupOverlay}>
        <div className={styles.paymentPopup}>
          <div className={styles.paymentPopupHeader}>
            <h2>One-Time Payment Required</h2>
            <button
              className={styles.closeButton}
              onClick={handleClosePaymentPopup}
            >
              ×
            </button>
          </div>
          <PaymentBox
            onPaymentComplete={handlePaymentComplete}
            onPaymentError={handlePaymentError}
            onPaymentDismissed={handlePaymentDismissed}
            isProcessing={isProcessingPayment}
            setIsProcessing={setIsProcessingPayment}
          />
        </div>
      </div>
    )}

      <ActionBox>
        <div className={styles.uploadContainer}>
          <h1 className={styles.title}>
            Download your Chevening Application as a PDF file and upload it
            here.
          </h1>
          {paymentCompleted ? (
            <Uploader onUploadSuccess={handleUploadSuccess} />
          ) : (
            <div className={styles.paymentRequired}>
              <p>You need to complete the payment to access the upload functionality.</p>
              <button
                className={styles.showPaymentButton}
                onClick={() => setShowPaymentPopup(true)}
              >
                Make Payment
              </button>
            </div>
          )}
        </div>
      </ActionBox>
    </MainLayout>
  );
};

export default Upload;