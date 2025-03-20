import React, { useState } from "react";
import styles from "../../pages/Upload/Upload.module.css";
import Sub_price from "./Sub_price";

export default function Subscription() {
    const [showPaymentPopup, setShowPaymentPopup] = useState(true);
    const [paymentCompleted, setPaymentCompleted] = useState(false);

  return (
    <div>
      {showPaymentPopup && !paymentCompleted && (
        <div className={styles.paymentPopup}>
          <div className={styles.paymentPopupHeader}>
            <h2 className={styles.h2}>Choose Your Payment Option</h2>
          </div>
          <div className={styles.pricingContent}>
            <div className={styles.pricingCard}>
              <p className={styles.pricingText}>Select a payment tier:</p>
              <Sub_price />
            </div>
          </div>
        </div>
      )}

      {paymentCompleted && (
        <div className={styles.paymentSuccess}>
          <h3>🎉 Payment Successful!</h3>
          <p>
            Thank you for your purchase. You now have access to premium
            features.
          </p>
        </div>
      )}
    </div>
  );
}
