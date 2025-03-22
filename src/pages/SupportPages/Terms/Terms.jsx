import React from "react";
import ReactMarkdown from "react-markdown";
import SupportPagesLayout from "../../../layouts/SupportPagesLayout";
import ActionBox from "../../../components/ActionBox/ActionBox";
import termsPolicyText from "./TermsStatement";
import styles from "../SupportPages.module.css";

const Terms = () => {
  const termsText =
    "This is a placeholder for the Terms text. Replace this with your actual Terms content.";

  return (
    <SupportPagesLayout>
      <ActionBox>
        <div className={styles.privacyContent}>
          <h1 className={styles.pageTitle}>Terms</h1>
          <div className={styles.description}>
            <ReactMarkdown>{termsPolicyText}</ReactMarkdown>
          </div>
        </div>
      </ActionBox>
    </SupportPagesLayout>
  );
};

export default Terms;
