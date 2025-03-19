import React, { useState, useEffect } from "react";
import MainLayout from "../../layouts/MainLayout";
import ActionBox from "../../components/ActionBox/ActionBox";
import Uploader from "../../components/Uploader/Uploader";
import PaymentBox from "../../components/PaymentBox/PaymentBox";
import styles from "./Upload.module.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../../context/AuthContext';
import Subscription from "../../components/Subcription/Subcription";

const Upload = () => {
  const [filePath, setFilePath] = useState(null);
  const [showPaymentPopup, setShowPaymentPopup] = useState(false);
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
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

  const handlePaymentComplete = () => {
    setPaymentCompleted(true);
    setShowPaymentPopup(false);
  };

  const handlePaymentError = (error) => {
    // Just handle UI implications of payment errors
    alert("There was an error with the payment. Please try again.");
  };

  const handlePaymentDismissed = () => {
    // Just handle UI implications of payment dismissal
    console.log("Payment dismissed by user");
  };

  return (
    <MainLayout>
      <ActionBox>
        <div className={styles.uploadContainer}>
          <h1 className={styles.title}>
            Download your Chevening Application as a PDF file and upload it
            here.
          </h1>

          {paymentCompleted ? (
            <Uploader onUploadSuccess={handleUploadSuccess} />
          ) : (
            showPaymentPopup && (
              <div className={styles.paymentPopupOverlay}>
               <Subscription />

              </div>
            )
          )}
        </div>
      </ActionBox>
    </MainLayout>
  );
};

export default Upload;