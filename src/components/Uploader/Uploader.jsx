import { useState, useRef } from "react";
import { toast } from "react-toastify";
import styles from "./Uploader.module.css";

const Uploader = ({ onUploadSuccess }) => {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(null);
  const fileInputRef = useRef(null);

  const SUPPORTED_FORMATS = ["application/pdf"];

  // Configure server URL based on environment
  const API_URL = process.env.REACT_APP_CHEVENINGBREW_SERVER_URL || "http://localhost:8001";

  console.log("API_URL", API_URL);

  const handleBrowseClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];

    if (!file) return;

    // Check if file is a PDF
    if (!SUPPORTED_FORMATS.includes(file.type)) {
      toast.error("Please upload a PDF file");
      return;
    }

    setUploadedFile(file);
    setUploadProgress("loading");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(`${API_URL}/upload`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const result = await response.json();
      console.log("Upload result:", result);
      setUploadProgress("success");
      toast.success("File uploaded successfully!");

      // Call the callback with the file path if provided
      if (onUploadSuccess) {
        onUploadSuccess(result.interview_questions);
        localStorage.setItem("interviewQuestions", JSON.stringify(result.interview_questions));
      }
    } catch (error) {
      console.error("Upload error:", error);
      setUploadProgress(null);
      toast.error("File upload failed. Please try again.");
    }
  };

  return (
    <div className={styles.uploaderContainer}>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".pdf"
        className={styles.hiddenInput}
      />

      <button
        className={styles.browseButton}
        onClick={handleBrowseClick}
        disabled={uploadProgress === "loading"}
      >
        {uploadProgress === "loading" ? "Uploading..." : "Browse Files"}
      </button>

      {uploadProgress === "loading" && (
        <div className={styles.progressIndicatorContainer}>
        </div>
      )}

      {uploadProgress === "success" && (
        <div className={styles.successMessage}>
          <p className={styles.fileName}>{uploadedFile?.name}</p>
        </div>
      )}
    </div>
  );
};

export default Uploader;
