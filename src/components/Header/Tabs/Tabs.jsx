// src/components/Header/Tabs/Tabs.jsx
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
    <nav className="flex items-center justify-center w-full">
      {tabs.map((tab, index) => (
        <React.Fragment key={tab.path}>
          <Link
            to={tab.path}
            className={`px-8 py-2 text-base font-medium transition-all duration-300 text-center min-w-[120px]
              ${location.pathname === tab.path 
                ? 'text-[#dd0c7e] font-semibold' 
                : 'text-gray-600 hover:text-[#dd0c7e]'}`}
          >
            {tab.label}
          </Link>
          {index < tabs.length - 1 && (
            <span className="text-gray-400 text-xl px-2">|</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Tabs;
