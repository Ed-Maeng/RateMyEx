import { Box, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { setCurrentSection } from "../state/auth";

// Pages & Components
import Navbar from "../components/Navbar";

const SectionPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // State of School & Sections
  const school = useSelector((state) => state.school); // TODO: Be able to search through schools to find school specific reviews
  const [sections, setSections] = useState([]);

  // Types of Colors & Reviews
  const primaryMain = useTheme().palette.primary.main;
  const reviewType = useLocation().pathname.split("/")[1];

  const getSections = async () => {
    const response = await fetch(
      `http://localhost:4000/${reviewType}/UCLA`,
      {
        method: "GET",
      }
    );
    const data = await response.json();
    setSections(data);
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
                  dispatch(setCurrentSection({ currentSection: section }));
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
