import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Interview from "../pages/Interview/Interview";
import Upload from "../pages/Upload/Upload";
import Feedback from "../pages/Feedback/Feedback";
import LandingPage from "../pages/Landing/LandingPage"; // Check this import path
import Help from "../pages/SupportPages/Help/Help";
import About from "../pages/SupportPages/About/About";
import Pricing from "../pages/SupportPages/Pricing/Pricing";
import Privacy from "../pages/SupportPages/Privacy/Privacy";
import Terms from "../pages/SupportPages/Terms/Terms";

export const router = createBrowserRouter([
  {
    path: "/", // Default landing page
    element: <LandingPage />,
  },
  {
    path: "/interview",
    element: <Interview />,
  },
  {
    path: "/upload",
    element: <Upload />,
  },
  {
    path: "/feedback",
    element: <Feedback />,
  },
  {
    path: "/help",
    element: <Help />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/pricing",
    element: <Pricing />,
  },
  {
    path: "/privacy",
    element: <Privacy />,
  },
  {
    path: "/terms",
    element: <Terms />,
  },
]);
