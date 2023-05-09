import { Box, useTheme } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { setReviewSection, setSections } from "../state/auth";

// Pages & Components
import Navbar from "../components/Navbar";

const SectionPage = () => {
  const school = useSelector((state) => state.school);
  const sections = useSelector((state) => state.sections);
  const theme = useTheme();
  const primaryMain = theme.palette.primary.main;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const reviewType = location.pathname.split("/")[1];

  const getSections = async () => {
    const response = await fetch(
      `http://localhost:4000/${reviewType}/UCLA`,
      {
        method: "GET",
      }
    );
    const data = await response.json();
    dispatch(setSections({ sections: data }));
  };

  useEffect(() => {
    getSections();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Box>
      <Navbar />
      {
        sections.map((section) => (
            <Box
              key={section._id}
              width="100%"
              padding="0.75rem"
              display={"flex"}
              justifyContent="center"
            >
              <Box
                onClick={() => {
                  dispatch(setReviewSection({ reviewSection: section }));
                  navigate(`/${reviewType}/reviews`)
                }}
                variant="contained" 
                sx={{
                  backgroundColor: primaryMain,
                  width: "150px",
                  borderRadius: "0.25rem",
                  p: "0.25rem 1rem",
                  "&:hover": {
                    backgroundColor: primaryMain
                  }
                }}
              >
                {section.name}
              </Box>
            </Box>
          )
        )
      }
    </Box>
  );
}
 
export default SectionPage;
