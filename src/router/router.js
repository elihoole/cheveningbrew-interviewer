import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Interview from '../pages/Interview/Interview';
import Upload from '../pages/Upload/Upload';
import Feedback from '../pages/Feedback/Feedback';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Interview />,
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
