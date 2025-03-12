import React from "react";
import SupportPagesLayout from "../../../layouts/SupportPagesLayout";
import ActionBox from "../../../components/ActionBox/ActionBox";
import styles from "../SupportPages.module.css";

const Pricing = () => {
  return (
    <SupportPagesLayout>
      <ActionBox>
        <div className={styles.pricingContent}>
          <h1 className={styles.title}>Pricing</h1>
          <p className={styles.description}>
            Explore our pricing plans to find the perfect fit for your needs. We
            offer a range of options to help you succeed.
          </p>
          <div className={styles.pricingPlans}>
            <div className={styles.planBox}>
              <h2>Basic Plan</h2>
              <p>2 interview slots</p>
              <p className={styles.price}>$10</p>
            </div>
            <div className={styles.planBox}>
              <h2>Premium Plan</h2>
              <p>5 interview slots</p>
              <p className={styles.price}>$20</p>
            </div>
          </div>
        </div>
      </ActionBox>
    </SupportPagesLayout>
  );
};

export default Pricing;
