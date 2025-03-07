import React from "react";
import SupportPagesLayout from "../../../layouts/SupportPagesLayout";
import ActionBox from "../../../components/ActionBox/ActionBox";
import styles from "./Pricing.module.css";

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
        </div>
      </ActionBox>
    </SupportPagesLayout>
  );
};

export default Pricing;
