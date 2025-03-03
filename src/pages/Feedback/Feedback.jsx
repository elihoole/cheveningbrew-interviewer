import React from 'react';
import MainLayout from '../../layouts/MainLayout';
import './Feedback.css';

const Feedback = () => {
  return (
    <MainLayout>
      <div className="feedback-container max-w-md w-full mx-auto">
        <div className="content">
          <h1 className="text-3xl font-bold mb-8 text-white">Interview Feedback</h1>
          
          <div className="feedback-box bg-white/10 p-8 rounded-lg backdrop-blur-sm">
            <div className="feedback-section mb-6">
              <h2 className="text-white text-xl mb-4">Content Analysis</h2>
              <div className="progress-bar">
                <div className="progress" style={{ width: '75%' }}></div>
              </div>
              <p className="text-white/70 mt-2">Your response was clear and structured</p>
            </div>

            <div className="feedback-section mb-6">
              <h2 className="text-white text-xl mb-4">Delivery</h2>
              <div className="progress-bar">
                <div className="progress" style={{ width: '85%' }}></div>
              </div>
              <p className="text-white/70 mt-2">Excellent pace and clarity</p>
            </div>

            <button className="bg-gradient-to-br from-[#dd0c7e] via-[#ca1582] to-[#a6208e] text-white px-6 py-2 rounded-full w-full mt-6">
              View Detailed Report
            </button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Feedback;
