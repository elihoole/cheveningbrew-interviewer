import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './router/router';  // Ensure the path is correct
import './App.css';

function App() {
  return <RouterProvider router={router} />;
}

export default App;
