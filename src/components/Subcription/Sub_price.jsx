import React from 'react'
import { useState } from 'react';
import { useAuth } from "../../context/AuthContext";
import PaymentBox from "../PaymentBox/PaymentBox";
import { PRICING_PLANS } from "../../constants/pricing";
import styles from "../../pages/Upload/Upload.module.css";

export default function Sub_price() {
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
      <div className={styles.pricingGrid}>
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
              </div>
  )
}
