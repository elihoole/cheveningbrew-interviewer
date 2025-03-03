import React from 'react';
import MainLayout from '../../layouts/MainLayout';
import './Upload.css';

const Upload = () => {
  return (
    <MainLayout>
      <div className="upload-container max-w-md w-full mx-auto">
        <div className="content">
          <h1 className="text-3xl font-bold mb-8 text-white">Upload Essays</h1>
          
          <div className="upload-box bg-white/10 p-8 rounded-lg backdrop-blur-sm">
            <div className="upload-area border-2 border-dashed border-white/30 rounded-lg p-8 text-center">
              <div className="text-white mb-4">
                Drop your essay here or click to upload
              </div>
              <button className="bg-gradient-to-br from-[#dd0c7e] via-[#ca1582] to-[#a6208e] text-white px-6 py-2 rounded-full">
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
