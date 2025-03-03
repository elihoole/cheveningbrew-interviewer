import React from 'react';
import Header from '../components/Header/Header';

const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#2B3147]">
      <Header />
      <div className="pt-16">
        {children}
      </div>
    </div>
  );
};

export default MainLayout;
