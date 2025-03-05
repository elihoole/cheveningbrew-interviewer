import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Interview from '../pages/Interview/Interview';
import Upload from '../pages/Upload/Upload';
import Feedback from '../pages/Feedback/Feedback';
import LandingPage from '../pages/Landing/LandingPage';  // Check this import path

export const router = createBrowserRouter([
  {
    path: '/',  // Default landing page
    element: <LandingPage />,
  },
  {
    path: '/interview',
    element: <Interview />,
  },
  {
    path: '/upload',
    element: <Upload />,
  },
  {
    path: '/feedback',
    element: <Feedback />,
  },
]);
