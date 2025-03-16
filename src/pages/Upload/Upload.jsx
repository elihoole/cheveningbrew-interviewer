import React, { useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import ActionBox from "../../components/ActionBox/ActionBox";
import Uploader from "../../components/Uploader/Uploader";
import PaymentBox from "../../components/PaymentBox/PaymentBox";
import styles from "./Upload.module.css";
import { useNavigate } from "react-router-dom";


const Upload = () => {
  const [filePath, setFilePath] = useState(null);
  const navigate = useNavigate();

  const handleUploadSuccess = (path) => {
    setFilePath(filePath);
    console.log("File path:", filePath);


    // Navigate to Interview page
    navigate("/interview");
  };

  return (
    <MainLayout>
      <ActionBox>
        <div className={styles.uploadContainer}>
          <h1 className={styles.title}>
            Download your Chevening Application as a PDF file and upload it
            here.
          </h1>
          <Uploader onUploadSuccess={handleUploadSuccess} />
        </div>
      </ActionBox>
    </MainLayout>
  );
};

export default Upload;
