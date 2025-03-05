// src/layouts/MainLayout.jsx
import React from 'react';
import Tabs from '../components/Header/Tabs/Tabs'; // Adjust path if needed

const MainLayout = ({ children }) => {
  return (
    <div className="main-layout" style={{ background: 'linear-gradient(to bottom, #4B0082, #800080)', height: '100vh' }}>
      <div className="sidebar-container" style={{ display: 'flex' }}>
        <Tabs /> {/* Sidebar navigation */}
        <div className="content" style={{ flexGrow: 1 }}>
          {children} {/* Main content */}
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
