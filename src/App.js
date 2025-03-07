import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import LandingPage from "./pages/Landing/LandingPage";

import Upload from "./pages/Upload/Upload";

function App() {
  return (
    <GoogleOAuthProvider clientId="604376306081-u6ojtrf8evjilup6blg2hh5t6mt4bbei.apps.googleusercontent.com">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          
          <Route path="/upload" element={<Upload />} />
          {/* Add other routes */}
        </Routes>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
}

export default App;
