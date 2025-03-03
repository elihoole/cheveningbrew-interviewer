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
    <nav className="flex space-x-4">
      {tabs.map((tab) => (
        <Link
          key={tab.path}
          to={tab.path}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 
            ${location.pathname === tab.path 
              ? 'bg-gradient-to-br from-[#dd0c7e] via-[#ca1582] to-[#a6208e] text-white shadow-lg' 
              : 'text-gray-600 hover:text-[#dd0c7e]'}`}
        >
          {tab.label}
        </Link>
      ))}
    </nav>
  );
};

export default Tabs;
