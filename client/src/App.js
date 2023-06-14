import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { themeSettings } from "./theme";

// Pages & Components
import EmailVerification from "./components/verification/EmailVerification";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import ReviewPage from "./pages/ReviewPage";
import SchoolPage from "./pages/SchoolPage";
import SectionPage from "./pages/SectionPage";
import AccountFormPage from "./pages/forms/AccountFormPage";

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

              { /* User Pages */ }            
              <Route path="/" element={<HomePage />} />
              <Route path="/signin" element={<AccountFormPage page={"signin"} />} />
              <Route path="/reset/:emailToken" element={<AccountFormPage page={"reset"} />} />
              <Route path="/profile" element={<ProfilePage />} />

              { /* School Pages */ }
              <Route path="/:schoolName" element={<SchoolPage />} />

              { /* Section Pages */ }
              <Route path="/:schoolName/internships" element={<SectionPage />} />
              <Route path="/:schoolName/dorms" element={<SectionPage />} />
              <Route path="/:schoolName/professors" element={<SectionPage />} />
              <Route path="/:schoolName/clubs" element={<SectionPage />} />

              { /* Review Pages */ }
              <Route path="/:schoolName/internships/:internshipName" element={<ReviewPage />} />
              <Route path="/:schoolName/dorms/:dormName" element={<ReviewPage />} />
              <Route path="/:schoolName/professors/:professorName" element={<ReviewPage />} />
              <Route path="/:schoolName/clubs/:clubName" element={<ReviewPage />} />
            </Routes>
          </div>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
