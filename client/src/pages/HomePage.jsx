import {
  Autocomplete,
  Box,
} from "@mui/material";
import { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSchool } from '../state/auth';

// Components
import Navbar from "../components/Navbar";
import SearchText from "../components/SearchText";
import FlexBetween from "../components/wrappers/FlexBetween";

const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // State of schools & Colors
  const [schools, setSchools] = useState([]);
  // Check if it is in local or production
  const isLocal = window.location.href.split("/")[2] === "localhost:3000";

  const getSchools = async () => {
    const response = await fetch(
      isLocal ? "http://localhost:4000/schools" : "https://api.ratemyexschool.com:8443/schools",
      {
        method: "GET",
      }
    );
    const data = await response.json();
    setSchools(data);
  };

  useEffect(() => {
    getSchools();
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
        <FlexBetween
          borderRadius="20px"
          gap="3rem"
          padding="0.1rem 1.5rem"
          m="auto"
        >
          {/* Search Bar */}
          <Autocomplete
            id="schools"
            onChange={(event, school) => {
              dispatch(setSchool({ school }));
              navigate("/school");
            }}
            options={schools}
            noOptionsText={"No School Found"}
            getOptionLabel={(schools) => `${schools.name} (${schools.shortName})`}
            isOptionEqualToValue={(option, value) => option.name === value.name}
            sx={{
              width: 750,
            }}
            renderOption={(props, schools) => (
              <Box component="li" {...props} key={schools._id}>
                {schools.name + " (" + schools.shortName + ")"}
              </Box>
            )}
            renderInput={(params) =>
              <SearchText
                {...params}
                label="Search for your school"
              />
            }
          />
        </FlexBetween>
      </Box>
    </Box>
  );
}
 
export default HomePage;
