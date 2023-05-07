import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { themeSettings } from "./theme";

// Pages & Components
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import ReviewPage from "./pages/ReviewPage";
import DormPage from "./pages/reviews/DormPage";
import InternshipPage from "./pages/reviews/InternshipPage";
import ProfessorPage from "./pages/reviews/ProfessorPage";

function App() {
  const theme = createTheme(themeSettings());

  return (
    <div className="App">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <div className="pages">
            <CssBaseline />
            <Routes>
              { /* User Pages */ }            
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/profile" element={<ProfilePage />} />

              { /* Review Pages */ }
              <Route path="/internships" element={<InternshipPage />} />
              <Route path="/dorms" element={<DormPage />} />
              <Route path="/professors" element={<ProfessorPage />} />

              { /* Write Review */ }
              <Route path="/internships/review" element={<ReviewPage />} />
              <Route path="/dorms/review" element={<ReviewPage />} />
              <Route path="/professors/review" element={<ReviewPage />} />
              <Route path="/clubs/review" element={<ReviewPage />} />
            </Routes>
          </div>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
