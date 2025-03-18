import React from "react";
import SupportPagesLayout from "../../../layouts/SupportPagesLayout";
import ActionBox from "../../../components/ActionBox/ActionBox";
import styles from "../SupportPages.module.css";


const Pricing = ({ plans }) => {
  return (
    <SupportPagesLayout>
      <ActionBox>
        <div className={styles.supportContent}>
          <h1 className={styles.pageTitle}>Pricing</h1>
          <p className={styles.description}>
            Explore our pricing plans to find the perfect fit for your needs.
            Each interview slot is 15 minutes long, covering the breadth of the
            Chevening interview.
          </p>
          <div className={styles.pricingContainer}>
            {plans.map((plan) => (
              <div className={styles.pricingContent} key={plan.title}>
                <h3 className={styles.pricingTitle}>{plan.title}</h3>
                {plan.description}
              </div>
            ))}
          </div>
        </div>
      </ActionBox>
    </SupportPagesLayout>
  );
};

export default Pricing;