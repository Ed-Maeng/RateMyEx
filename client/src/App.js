import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { themeSettings } from "./theme";

// Pages & Components
import EmailVerification from "./components/Verification/EmailVerification";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import ReviewFormPage from "./pages/ReviewFormPage";
import ReviewPage from "./pages/ReviewPage";
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

              { /* User Pages */ }            
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/profile" element={<ProfilePage />} />

              { /* Section Pages */ }
              <Route path="/internships" element={<SectionPage />} />
              <Route path="/dorms" element={<SectionPage />} />
              <Route path="/professors" element={<SectionPage />} />
              <Route path="/clubs" element={<SectionPage />} />

              { /* Review Pages */ }
              <Route path="/internships/reviews" element={<ReviewPage />} />
              <Route path="/dorms/reviews" element={<ReviewPage />} />
              <Route path="/professors/reviews" element={<ReviewPage />} />
              <Route path="/clubs/reviews" element={<ReviewPage />} />

              { /* Review Form */ }
              <Route path="/internships/form" element={<ReviewFormPage />} />
              <Route path="/dorms/form" element={<ReviewFormPage />} />
              <Route path="/professors/form" element={<ReviewFormPage />} />
              <Route path="/clubs/form" element={<ReviewFormPage />} />
            </Routes>
          </div>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
