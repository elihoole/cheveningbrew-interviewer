import React, { useState, useEffect } from "react";
import MainLayout from "../../layouts/MainLayout";
import ActionBox from "../../components/ActionBox/ActionBox";
import Uploader from "../../components/Uploader/Uploader";
import styles from "./Upload.module.css";
import { useNavigate } from "react-router-dom";
import Subscription from "../../components/Subcription/Subcription";

const Upload = () => {
  const [filePath, setFilePath] = useState(null);
  const [showPaymentPopup, setShowPaymentPopup] = useState(false);
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const navigate = useNavigate();

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
                <div className={styles.paymentPopup}>
                  <div className={styles.paymentPopupHeader}>
                    <h2 className={styles.h2}>One-time payment required</h2>
                  </div>
                  <div className={styles.pricingContent}>
                    <div className={styles.pricingCard}>
                      <p className={styles.pricingText}>Access the app by paying a one-time fee of $5 for a 20 min interview</p>
                    </div>
                  </div>

                  <PaymentBox
                    onPaymentComplete={handlePaymentComplete}
                    onPaymentError={handlePaymentError}
                    onPaymentDismissed={handlePaymentDismissed}
                  />
                </div>
              </div>
            )
          )}
        </div>
      </ActionBox>
    </MainLayout>
  );
};

export default Upload;