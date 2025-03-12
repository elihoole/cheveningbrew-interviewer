import React from "react";
import SupportPagesLayout from "../../../layouts/SupportPagesLayout";
import ActionBox from "../../../components/ActionBox/ActionBox";
import styles from "../SupportPages.module.css";

const Help = () => {
  return (
    <SupportPagesLayout>
      <ActionBox>
        <div className={styles.supportContent}>
          <h1 className={styles.pageTitle}>Help</h1>
          <p className={styles.description}>
            If you need help, please contact us at{" "}
            <a href="mailto:">
              <strong>
                <u>
                  <span className={styles.email}>help@cheveningbrew.com</span>
                </u>
              </strong>
            </a>
          </p>
        </div>
      </ActionBox>
    </SupportPagesLayout>
  );
};

export default Help;
