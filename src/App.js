import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import LandingPage from "./pages/Landing/LandingPage";
import Upload from "./pages/Upload/Upload";
import Interview from "./pages/Interview/Interview";
import Feedback from "./pages/Feedback/Feedback";
import Help from "./pages/SupportPages/Help/Help";
import About from "./pages/SupportPages/About/About";
import Pricing from "./pages/SupportPages/Pricing/Pricing";
import Privacy from "./pages/SupportPages/Privacy/Privacy";
import Terms from "./pages/SupportPages/Terms/Terms";

function App() {
  return (
    <GoogleOAuthProvider clientId="604376306081-u6ojtrf8evjilup6blg2hh5t6mt4bbei.apps.googleusercontent.com">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/interview" element={<Interview />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/help" element={<Help />} />
          <Route path="/about" element={<About />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />

          {/* Add other routes */}
        </Routes>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
}

export default App;
