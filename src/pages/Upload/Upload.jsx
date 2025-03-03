// src/pages/Upload/Upload.jsx
import React from 'react';
import MainLayout from '../../layouts/MainLayout';
import styles from './Upload.module.css'; // Changed to use CSS Modules

const Upload = () => {
  return (
    <MainLayout>
      <div className="h-[calc(100vh-8rem)] flex items-center justify-center">
        <div className={styles.uploadContainer}>
          <h1 className="text-2xl font-bold text-black mb-8 text-center">
            Upload Essays
          </h1>
          <div className={styles.uploadBox}>
            <div className={styles.uploadArea}>
              <p className="text-black text-lg mb-6">
                Drop your essay here or click to upload
              </p>
              <button className="bg-gradient-to-br from-[#dd0c7e] via-[#ca1582] to-[#a6208e] text-white px-8 py-3 rounded-full hover:shadow-lg transition-all duration-300 text-lg font-medium">
                Choose File
              </button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Upload;
