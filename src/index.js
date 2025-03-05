import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

function LoadFonts() {
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    // Optionally, you can add a clean-up function
    return () => {
      document.head.removeChild(link);
    };
  }, []); // Empty dependency array ensures this effect runs only once
  
  return null;
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <LoadFonts />
    <App />
  </React.StrictMode>
);

reportWebVitals();
