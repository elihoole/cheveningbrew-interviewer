import React from "react";
import SupportPagesLayout from "../../../layouts/SupportPagesLayout";
import ActionBox from "../../../components/ActionBox/ActionBox";
import styles from "../SupportPages.module.css";
import { useAuth } from '../../../context/AuthContext';
import Sub_price from "../../../components/Subcription/Sub_price";

const Pricing = () => {
  const { user } = useAuth();

  // Define pricing plans with dynamic session count
  const plans = [
    { title: "Basic", price: 5, description: "Basic Access", sessionCount: 1 },
    { title: "Standard", price: 10, description: "Standard Access", sessionCount: 3 },
    { title: "Premium", price: 20, description: "Premium Access", sessionCount: 5 },
  ];

  return (
    <SupportPagesLayout>
      <ActionBox>
        <div className={styles.supportContent}>
          <h1 className={styles.pageTitle}>Pricing</h1>
          <p className={styles.description}>
            Explore our pricing plans to find the perfect fit for your needs.
          </p>
          <Sub_price />
        </div>
      </ActionBox>
    </SupportPagesLayout>
  );
};

export default Pricing;
