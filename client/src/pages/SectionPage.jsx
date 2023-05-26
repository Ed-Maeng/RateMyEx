import AddIcon from '@mui/icons-material/Add';
import {
  Autocomplete,
  Box,
  CardMedia,
  Grid,
  IconButton,
  Rating,
  Typography,
  useTheme
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { setCurrentSection } from "../state/auth";

// Pages & Components
import Navbar from "../components/Navbar";
import SearchText from "../components/SearchText";

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
      `https://ratemyexschool.com:4000/${reviewType}/${school._id}`,
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
        padding="2rem"
        display={"flex"}
        gap="0.5rem"
        justifyContent="space-between"
      >
        {/* Search Bar */}
        <Autocomplete
          id={`${reviewType}`}
          onChange={(event, section) => {
            dispatch(setCurrentSection({ currentSection: section }));
            navigate(`/school/${reviewType}/reviews`);
          }}
          options={sections}
          noOptionsText={`No ${reviewType} Found`}
          getOptionLabel={(sections) => `${sections.name}`}
          isOptionEqualToValue={(option, value) => option.name === value.name}
          sx={{
            width: 750,
          }}
          renderOption={(props, sections) => (
            <Box component="li" {...props} key={sections._id}>
              {sections.name}
            </Box>
          )}
          renderInput={(params) =>
            <SearchText
              {...params}
              label={`Search for ${reviewType}`}
            />
          }
        />
        {/* Add Section Button */}
        <IconButton p="1rem" color="primary" style={{maxHeight:'40px', backgroundColor: backgroundAlt}}>
          <AddIcon />
        </IconButton>

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
                padding="0.75rem 0.75rem 0.75rem 1.5rem"
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
