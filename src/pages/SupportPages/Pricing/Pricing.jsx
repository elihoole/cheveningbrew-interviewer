import React from "react";
import SupportPagesLayout from "../../../layouts/SupportPagesLayout";
import ActionBox from "../../../components/ActionBox/ActionBox";
import styles from "../SupportPages.module.css";
import Sub_price from "../../../components/Subcription/Sub_price";

const Pricing = () => {
return (
    <SupportPagesLayout>
      <ActionBox>
        <div className={styles.supportContent}>
          <h1 className={styles.pageTitle}>Pricing</h1>
          <p className={styles.description}>
            Explore our pricing plans to find the perfect fit for your needs.
          </p>
          <Sub_price/>
        </div>
      </ActionBox>
    </SupportPagesLayout>
  );
};

export default Pricing;
