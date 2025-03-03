// MainLayout.jsx
import React from 'react';
import Header from '../components/Header/Header';

const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#2B3147]">
      <Header />
      <main className="pt-32">
        {children}
      </main>
    </div>
  );
};

export default MainLayout;