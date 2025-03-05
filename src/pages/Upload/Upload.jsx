import React from 'react';
import MainLayout from '../../layouts/MainLayout';
import styles from './Upload.module.css'; // Changed to use CSS Modules

const Upload = () => {
  return (
    <MainLayout>
      <div className="h-full flex items-center justify-center">
        <div className={styles.uploadContainer}>
          
          <div className={styles.uploadBox}>
          <h1 className="text-2xl font-bold text-black text-center  mt-0 mb-4 "> 
            Upload your Chevening application here
          </h1>
            <div className={styles.uploadArea}>
              <p className="text-black text-lg mb-6, padding-top: 80px">
               Drag and drop your Chevening Application here or 
               
              </p>
              <button className="bg-gradient-to-br from-[#dd0c7e] via-[#ca1582] to-[#a6208e] text-white px-8 py-3 rounded-full hover:shadow-lg transition-all duration-300 text-lg font-medium">
                Brows file
              </button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Upload;

