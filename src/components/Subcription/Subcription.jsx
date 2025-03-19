import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import PaymentBox from "../PaymentBox/PaymentBox";
import styles from "../../pages/Upload/Upload.module.css";
import { PRICING_PLANS } from "../../constants/pricing"; // Ensure correct path
import Sub_price from "./Sub_price";

export default function Subscription() {
    const [showPaymentPopup, setShowPaymentPopup] = useState(true);
    const [paymentCompleted, setPaymentCompleted] = useState(false);
    const { user } = useAuth();
    
      const handlePaymentComplete = () => {
        setPaymentCompleted(true);
        setShowPaymentPopup(false);
      };
    
      const handlePaymentError = () => {
        alert("There was an error with the payment. Please try again.");
      };
    
      const handlePaymentDismissed = () => {
        console.log("Payment dismissed by user");
      };

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
              {/* Pricing Plans Grid */}
              {/* <div className={styles.pricingGrid}>
                {Object.keys(PRICING_PLANS).map((planKey) => {
                  const plan = PRICING_PLANS[planKey]; // Extract the plan object

                  return (
                    <PaymentBox
                      key={planKey}
                      amount={parseInt(plan.price)}
                      description={plan.title}
                      session={plan.session} // ✅ Fix: Access session from plan
                      email={user?.email || ""}
                      onPaymentComplete={handlePaymentComplete}
                      onPaymentError={handlePaymentError}
                      onPaymentDismissed={handlePaymentDismissed}
                    />
                  );
                })}
              </div> */}
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
