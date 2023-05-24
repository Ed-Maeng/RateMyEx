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
import SchoolPage from "./pages/SchoolPage";
import SectionPage from "./pages/SectionPage";

//Google Analytics
import ReactGA from 'react-ga';

function App() {
  const history = createHistory()
  ReactGA.initialize('G-W280987CCT');
  history.listen((location, action) => {
    ReactGA.pageview(location.pathname + location.search);
    console.log(location.pathname)
  });

  const theme = createTheme(themeSettings());

  return (
    <Router history={history}>
      <div className="App">
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <div className="pages">
              <CssBaseline />
              <Routes>
                { /* Email Verification Page */}
                <Route path="/verifyemail/:emailToken" element={<EmailVerification />} />

                { /* User Pages */}
                <Route path="/" element={<HomePage />} />
                <Route path="/school" element={<SchoolPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/profile" element={<ProfilePage />} />

                { /* Section Pages */}
                <Route path="school/internships" element={<SectionPage />} />
                <Route path="school/dorms" element={<SectionPage />} />
                <Route path="school/professors" element={<SectionPage />} />
                <Route path="school/clubs" element={<SectionPage />} />

                { /* Review Pages */}
                <Route path="school/internships/reviews" element={<ReviewPage />} />
                <Route path="school/dorms/reviews" element={<ReviewPage />} />
                <Route path="school/professors/reviews" element={<ReviewPage />} />
                <Route path="school/clubs/reviews" element={<ReviewPage />} />

                { /* Review Form */}
                <Route path="school/internships/form" element={<ReviewFormPage />} />
                <Route path="school/dorms/form" element={<ReviewFormPage />} />
                <Route path="school/professors/form" element={<ReviewFormPage />} />
                <Route path="school/clubs/form" element={<ReviewFormPage />} />
              </Routes>
            </div>
          </ThemeProvider>
        </BrowserRouter>
      </div>
    </Router>

  );
}

export default App;
