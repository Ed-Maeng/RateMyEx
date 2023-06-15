import {
  Autocomplete,
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSchool, setTab } from '../state/auth';
// Components
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import SearchText from "../components/SearchText";
import Dialogs from "../components/dialogs/Dialogs";
import Flexbetween from "../components/wrappers/FlexBetween";

const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // State of Schools
  const [schools, setSchools] = useState([]);
  // Check if it is in local or production
  const isLocal = window.location.href.split("/")[2] === "localhost:3000";
  // Types of Open Dialogs
  const [defaultOpen, setDefaultOpen] = useState(false);

  const getSchools = async () => {
    const response = await fetch(
      isLocal ? "http://localhost:4000/schools" : "https://api.ratemyexschool.com:8443/schools",
      {
        method: "GET",
      }
    );

    if (response.ok) {
      const data = await response.json();
      setSchools(data);
    } else {
      console.log("Response Issue in HomePage in getSchools");
      setDefaultOpen(true);
    }
  };

  useEffect(() => {
    dispatch(setTab({tab: false}));
    getSchools();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Box>
      <Navbar />
      <Grid container p="1rem" alignItems="center" justifyContent="center">
        {/* Search Bar */}
        <Autocomplete
          id="schools"
          onChange={(event, school) => {
            const schoolName = school.name.toLowerCase().replace(/[., ]+/g, "-");
            dispatch(setSchool({ school, schoolName }));
            navigate(`/${schoolName}`);
          }}
          options={schools}
          noOptionsText={"No School Found"}
          getOptionLabel={(schools) => `${schools.name} (${schools.abbreivation})`}
          isOptionEqualToValue={(option, value) => option.name === value.name}
          sx={{
            width: 750,
          }}
          renderOption={(props, schools) => (
            <Box component="li" {...props} key={schools._id}>
              {schools.name + " (" + schools.abbreivation + ")"}
            </Box>
          )}
          renderInput={(params) =>
            <SearchText
              {...params}
              label="Search for your school"
            />
          }
        />
      </Grid>
      
      <Grid
        container
        p="2rem"
        pt="8rem"
        direction="row"
        alignItems="center"
        justifyContent="center"
      >
        {schools.slice(0, 12)?.map((school) =>
          <Grid item key={school._id} p="0.75rem">
            <Card 
              onClick={async () => {
                const schoolName = school.name.toLowerCase().replace(/[., ]+/g, "-");
                dispatch(setSchool({ school, schoolName }));
                navigate(`/${schoolName}`);
              }}
              sx={{ width: 300 }}
            >
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="250"
                  image={process.env.PUBLIC_URL + `/assets/${school.abbreivation}.jpg`}
                  alt={school.name}
                />
                <CardContent>
                  <Typography pb="0.75rem" variant="h2b" component="div">
                    {school.abbreivation ? school.abbreivation : "Unknown"}
                  </Typography>
                  <Flexbetween>
                    <Typography variant="h6b">
                      {school.numberOfReviews + " reviews"}
                    </Typography>
                    <Typography variant="h6b">
                      {school.location}
                    </Typography>
                  </Flexbetween>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        )}
      </Grid>
      
      <Footer />

      {/* Warning Dialogs */}
      <Dialogs open={defaultOpen} setOpen={setDefaultOpen} type="default" />
    </Box>
  );
}
 
export default HomePage;
