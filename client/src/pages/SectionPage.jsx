import { Box, CardMedia, Grid, Rating, Typography, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { setCurrentSection } from "../state/auth";

// Pages & Components
import Navbar from "../components/Navbar";

const SectionPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // State of School, & Sections 
  const school = useSelector((state) => state.school);
  const [sections, setSections] = useState([]);

  // Types of Colors &  Review Types
  const backgroundAlt = useTheme().palette.background.alt;
  const reviewType = useLocation().pathname.split("/")[2];

  const getSections = async () => {
    const response = await fetch(
      `http://ec2-3-239-251-252.compute-1.amazonaws.com:4000/${reviewType}/${school._id}`,
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

      <Box
        width="100%"
        padding="2rem 6%"
        display={"flex"}
        gap="0.5rem"
        justifyContent="space-between"
      >
        <Box m="auto" flexBasis={"20%"}>
          {
            sections.map((section) => (
              <Grid 
                m="1rem 0"
                container spacing={2}
                key={section._id}
                onClick={() => {
                  dispatch(setCurrentSection({ currentSection: section }));
                  navigate(`/school/${reviewType}/reviews`);
                }}
                padding="1.5rem 1.5rem 0.75rem 1.5rem"
                backgroundColor={backgroundAlt}
                borderRadius="0.75rem"
                sx={{ "&:hover": { cursor: "pointer" } }}
              >
                {/* IMAGE */}
                <Grid item xs={3}>
                  {section.imageUrl && (
                    <CardMedia
                      image={section.imageUrl}
                      loading="lazy"
                      style={{
                        height: 0,
                        paddingTop: '100%',
                      }}
                    />
                  )}
                </Grid>

                {/* SECTION NAME, TOTAL & AVERAGE RATING */}
                <Grid item xs={9}>
                  <Box>
                    <Typography variant="h3" fontWeight="500">
                      {section.name}
                    </Typography>
                    <Rating 
                      name="read-only"
                      precision={0.1}
                      value={(section.totalReviews > 0) ? (section.totalRatings * 1.0 / section.totalReviews) : 0}
                      readOnly 
                    />
                    <Typography>
                      {section.totalReviews + " Reviews"}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            ))
          }
        </Box>
      </Box>
    </Box>
  );
}
 
export default SectionPage;
