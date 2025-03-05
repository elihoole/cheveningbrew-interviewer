import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Tabs = () => {
  const location = useLocation();

  const tabs = [
    { path: '/upload', label: 'Upload' },
    { path: '/interview', label: 'Interview' },
    { path: '/feedback', label: 'Feedback' }
  ];

  return (
    <div className="tabs-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px', fontSize: '24px', fontFamily: "'Cascadia Mono', monospace", color: 'white' }}> 
      {tabs.map((tab) => (
        <Link
          to={tab.path}
          key={tab.path}
          className={`tab-link ${location.pathname === tab.path ? 'active' : ''}`}
          style={{
            padding: '20px 100px',
            textDecoration: 'none',
            color: location.pathname === tab.path ? '#dd0c7e' : 'white',
            fontWeight: location.pathname === tab.path ? 'bold' : 'normal',
            borderRadius: '4px',
            transition: 'all 0.3s',
            textAlign: 'center',
            width: '100%', // Ensures it spans the available width in the vertical layout
            marginTop: tab.label === 'Upload' ? '300px' : '0' // Adds margin-top only for the "Upload" tab
          }}
        >
          {tab.label}
        </Link>
      ))}
    </div>
  );
};

export default Tabs;
