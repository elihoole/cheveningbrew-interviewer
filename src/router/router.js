import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Interview from "../pages/Interview/Interview";
import Upload from "../pages/Upload/Upload";
import Feedback from "../pages/Feedback/Feedback";
import LandingPage from "../pages/Landing/LandingPage"; // Ensure this is the correct import
import LoginSignup from "../components/LoginSignup/LoginSignup";  // If you're using LoginSignup separately
import Help from "../pages/SupportPages/Help/Help";
import About from "../pages/SupportPages/About/About";
import Pricing from "../pages/SupportPages/Pricing/Pricing";
import Privacy from "../pages/SupportPages/Privacy/Privacy";
import Terms from "../pages/SupportPages/Terms/Terms";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />, // Ensure LandingPage is rendered on the root path
  },
  {
    path: "/login-signup",
    element: <LoginSignup />, // If you have a separate login page
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
    path: "/interview",
    element: <Interview />,
  },
  // Add other routes as needed
]);
