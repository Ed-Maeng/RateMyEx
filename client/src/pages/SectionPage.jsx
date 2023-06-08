import AddCircleIcon from '@mui/icons-material/AddCircle';
import {
  Autocomplete,
  Avatar,
  Box,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Rating,
  Tooltip,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCurrentSection } from "../state/auth";
// Pages & Components
import { useTheme } from '@emotion/react';
import LoadingComponent from "../components/LoadingComponent";
import Navbar from "../components/Navbar";
import SearchText from "../components/SearchText";
import Dialogs from '../components/dialogs/Dialogs';
import SectionFormPage from "../pages/forms/SectionFormPage";

const SectionPage = () => {
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // State of School, User, & Sections 
  const school = useSelector((state) => state.school);
  const user = useSelector((state) => state.user);
  const [sections, setSections] = useState([]);
  // Review Types
  const reviewType = window.location.pathname.split("/")[2];
  // Types of Open Dialogs
  const [sectionFormOpen, setSectionFormOpen] = useState(false);
  const [signInOpen, setSignInOpen] = useState(false);
  // Check if it is in local or production
  const isLocal = window.location.href.split("/")[2] === "localhost:3000";
  // Loading
  const [loading, setLoading] = useState(true);

  const getSections = async () => {
    const response = await fetch(
      isLocal ? `http://localhost:4000/${reviewType}/${school._id}`
      : `https://api.ratemyexschool.com:8443/${reviewType}/${school._id}`,
      {
        method: "GET",
      }
    );
    const data = await response.json();
    setSections(data);
    await new Promise(r => setTimeout(r, 250));
    setLoading(false);
  };

  useEffect(() => {
    getSections();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Box>
      <Navbar />

      {loading ? <LoadingComponent /> :
        <Box
          display="flex"
          width="90%"
          padding="1rem"
          m="auto"
          justifyContent="center"
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

          {/* ADD SECTION BUTTON */}
          <Tooltip title={`Add ${reviewType}`}>
            <IconButton 
              onClick={() => 
                (!user ? setSignInOpen(true) : setSectionFormOpen(true))
              }
              style={{height: "50px"}}
            >
              <AddCircleIcon fontSize="large" />
            </IconButton>
          </Tooltip>

          {/* Form for Adding Sections */}
          <SectionFormPage open={sectionFormOpen} setOpen={setSectionFormOpen} />

          {/* Sections Recommendation */}
          <Box px="2rem">
            {
              sections?.map((section) => (
                <List
                  key={section.name}
                  onClick={() => {
                    dispatch(setCurrentSection({ currentSection: section }));
                    navigate(`/school/${reviewType}/reviews`);
                  }}
                  sx={{
                    "&:hover": { 
                      cursor: "pointer",
                      bgcolor: palette.background.alt,
                    },
                  }}
                >
                  <ListItem>
                    <ListItemAvatar>
                      {section.color 
                        ?
                        <Avatar sx={{ width: 65, height: 65, bgcolor: section.color }}>
                          {section.name[0].toUpperCase() + (section.name.split(" ")[1] ? section.name.split(" ")[1][0].toUpperCase() : "")}
                        </Avatar>
                        : 
                        <Avatar alt={section.name} src={section.imageUrl} sx={{ width: 65, height: 65 }} /> 
                      }
                    </ListItemAvatar>

                    <ListItemText
                      primary={
                        <Grid container direction="column" px="0.4rem">
                          <Grid item>
                            <Typography variant="h3b">
                              {section.name}
                            </Typography>
                          </Grid>
                          <Rating 
                            name="read-only"
                            precision={0.1}
                            value={(section.totalReviews > 0) ? (section.totalRatings * 1.0 / section.totalReviews) : 0}
                            size="small"
                            readOnly
                          />
                          <Grid item>
                            <Typography variant="h6b">
                              {section.totalReviews + " Reviews"}
                            </Typography>
                          </Grid>
                        </Grid>
                      }
                    />
                  </ListItem>
                  <Divider variant="inset" component="li" />
                </List>
              ))
            }
          </Box>
        </Box>
      }
      {/* Warning Dialogs */}
      <Dialogs open={signInOpen} setOpen={setSignInOpen} type="not-signin" />
    </Box>
  );
}
 
export default SectionPage;
