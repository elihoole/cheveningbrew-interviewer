import React from "react";
import SupportPagesLayout from "../../../layouts/SupportPagesLayout";
import ActionBox from "../../../components/ActionBox/ActionBox";
import styles from "../SupportPages.module.css";

const Privacy = () => {
  const privacyPolicyText = `
    Privacy Policy
    Effective Date: March 1, 2025.

    At Cheveningbrew, we are committed to protecting your privacy and the security of your personal information. This Privacy Policy outlines how we collect, use, and safeguard your information when you use our platform. By using Cheveningbrew, you consent to the practices described in this policy.

    Information We Collect
    When you use our platform, we may collect the following information:

    Personal Information:
    - Name and email address provided through Google Authentication
    - Additional profile information you choose to share

    Authentication Data:
    - We use Google Authentication for secure sign-in and identity verification

    Technical Information:
    - IP address, browser type, device details, and usage data collected automatically via cookies and similar technologies

    Use of Information
    We use the collected information for:
    - Account Management: To create and manage user accounts securely through Google Auth
    - Payments:
    - Service Delivery: To provide access to our platform and features
    - Platform Improvement: To enhance our services based on usage patterns
    - Security and Compliance: To detect and prevent unauthorized access

    Information Sharing
    We respect your privacy and will not sell, trade, or transfer your personal information without your consent, except:
    - Service Providers: We share information with Google for authentication purposes
    - Legal Obligations: We may disclose information to comply with applicable laws

    Data Security
    We implement industry-standard security measures, including secure authentication via Google, to protect your personal information. However, no online transmission is 100% secure, and we cannot guarantee absolute security.

    Cookies and Tracking Technologies
    We use cookies to enhance your experience and analyze platform usage. You can manage cookie preferences through your browser settings.

    Changes to the Privacy Policy
    We may update this Privacy Policy periodically. Changes will be posted here with a revised "Effective Date."

    Contact Us
    For questions about this Privacy Policy, contact us at:
    Email: help@cheveningbrew.com
  `;

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
