import React from "react";
import SupportPagesLayout from "../../../layouts/SupportPagesLayout";
import ActionBox from "../../../components/ActionBox/ActionBox";
import styles from "./Privacy.module.css";

const Privacy = () => {
  const privacyPolicyText =
    "This is a placeholder for the privacy policy text. Replace this with your actual privacy policy content.";

  return (
    <SupportPagesLayout>
      <ActionBox>
        <div className={styles.privacyContent}>
          <h1 className={styles.title}>Privacy Policy</h1>
          <p className={styles.description}>{privacyPolicyText}</p>
        </div>
      </ActionBox>
    </SupportPagesLayout>
  );
};

export default Privacy;
