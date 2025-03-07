import React from "react";
import SupportPagesLayout from "../../../layouts/SupportPagesLayout";
import ActionBox from "../../../components/ActionBox/ActionBox";
import styles from "./Terms.module.css";

const Terms = () => {
  const termsText =
    "This is a placeholder for the Terms text. Replace this with your actual Terms content.";

  return (
    <SupportPagesLayout>
      <ActionBox>
        <div className={styles.privacyContent}>
          <h1 className={styles.title}>Terms</h1>
          <p className={styles.description}>{termsText}</p>
        </div>
      </ActionBox>
    </SupportPagesLayout>
  );
};

export default Terms;
