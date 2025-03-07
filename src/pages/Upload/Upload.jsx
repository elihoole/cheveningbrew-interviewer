import React, { useRef } from "react";
import MainLayout from "../../layouts/MainLayout";
import ActionBox from "../../components/ActionBox/ActionBox";
import styles from "./Upload.module.css";
import Logo from "../../components/Logo/Logo"; // Ensure correct import path

const Upload = () => {
  const fileInputRef = useRef(null);

  const handleBrowseClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log("Selected file:", file.name);
    }
  };

  return (
    <MainLayout>
      {/* Logo positioned at the top-left corner */}

      <ActionBox>
        <div className={styles.uploadContainer}>
          <h1 className={styles.title}>
            Download your Chevening Application as a PDF file and upload it
            here.
          </h1>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".pdf"
            className={styles.hiddenInput}
          />
          <button className={styles.browseButton} onClick={handleBrowseClick}>
            Browse file
          </button>
        </div>
      </ActionBox>
    </MainLayout>
  );
};

export default Upload;
