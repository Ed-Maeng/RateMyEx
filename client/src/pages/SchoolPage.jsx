import GroupsIcon from '@mui/icons-material/Groups';
import HomeIcon from '@mui/icons-material/Home';
import SchoolIcon from '@mui/icons-material/School';
import WorkIcon from '@mui/icons-material/Work';
import { Box, Chip, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// Components
import { useTheme } from '@emotion/react';
import FlexBetween from "../components/FlexBetween";
import Navbar from "../components/Navbar";


const SchoolPage = () => {
  const { palette } = useTheme();
  const navigate = useNavigate();

  // State of School & Color
  const school = useSelector((state) => state.school);

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

        <FlexBetween m="auto" padding="1rem" width="60%">
          {/* Internships Tab */}
          <Chip
            icon={<WorkIcon />} 
            label="Internships"
            style={{fontSize: '0.85rem' }}
            onClick={() => navigate("/school/internships")} 
          />
          {/* Dorms Tab */}
          <Chip 
            icon={<HomeIcon />} 
            label="Dorms" 
            style={{fontSize: '0.85rem'}}
            onClick={() => navigate("/school/dorms")} 
          />
          {/* Clubs Tab */}
          <Chip 
            icon={<GroupsIcon />} 
            label="Clubs" 
            style={{fontSize: '0.85rem'}}
            onClick={() => navigate("/school/clubs")} 
          />
          {/* Professors Tab */}
          <Chip 
            icon={<SchoolIcon />} 
            label="Professors"
            style={{fontSize: '0.85rem'}}
            onClick={() => navigate("/school/professors")} 
          />
        </FlexBetween>
      </Box>
    </Box>
  );
}
 
export default SchoolPage;
