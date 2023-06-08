import { Box, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setTab } from '../state/auth';
// Components
import { useEffect } from "react";
import Navbar from "../components/Navbar";

const SchoolPage = () => {
  const dispatch = useDispatch();

  // State of School & Color
  const school = useSelector((state) => state.school);

  useEffect(() => {
    dispatch(setTab({tab: false}));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Box>
      <Navbar />

      <Box padding="1rem" textAlign="center">
        <Typography
          variant="h1b"
          color="primary"
          padding="1rem"
        >
          {school.name}
        </Typography>
      </Box>
    </Box>
  );
}
 
export default SchoolPage;
