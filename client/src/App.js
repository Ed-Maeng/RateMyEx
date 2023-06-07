import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { themeSettings } from "./theme";

// Pages & Components
import EmailVerification from "./components/verification/EmailVerification";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import ReviewPage from "./pages/ReviewPage";
import SchoolPage from "./pages/SchoolPage";
import SectionPage from "./pages/SectionPage";

function App() {
  const theme = createTheme(themeSettings());

  return (
    <div className="App">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <div className="pages">
            <CssBaseline />
            <Routes>
              { /* Email Verification Page */ }
              <Route path="/verifyemail/:emailToken" element={<EmailVerification />} />

              { /* Reset Password Page */ }
              <Route path="/reset/:emailToken" element={<ResetPasswordPage />} />

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
