import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import React, {useEffect } from 'react';
import { themeSettings } from "./theme";

// Pages & Components
import EmailVerification from "./components/Verification/EmailVerification";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import ReviewPage from "./pages/ReviewPage";
import SchoolPage from "./pages/SchoolPage";
import SectionPage from "./pages/SectionPage";

//Google Analytics
import ReactGA from 'react-ga';
const TRACKING_ID = "G-W280987CCT"; // OUR_TRACKING_ID
ReactGA.initialize(TRACKING_ID);

function App() {
  const theme = createTheme(themeSettings());

  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <div className="pages">
            <CssBaseline />
            <Routes>
              { /* Email Verification Page */ }
              <Route path="/verifyemail/:emailToken" element={<EmailVerification />} />

              { /* User Pages */ }            
              <Route path="/" element={<HomePage />} />
              <Route path="/school" element={<SchoolPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/profile" element={<ProfilePage />} />

              { /* Section Pages */ }
              <Route path="school/internships" element={<SectionPage />} />
              <Route path="school/dorms" element={<SectionPage />} />
              <Route path="school/professors" element={<SectionPage />} />
              <Route path="school/clubs" element={<SectionPage />} />

              { /* Review Pages */ }
              <Route path="school/internships/reviews" element={<ReviewPage />} />
              <Route path="school/dorms/reviews" element={<ReviewPage />} />
              <Route path="school/professors/reviews" element={<ReviewPage />} />
              <Route path="school/clubs/reviews" element={<ReviewPage />} />
            </Routes>
          </div>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
