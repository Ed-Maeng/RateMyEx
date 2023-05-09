import { Box, Button, Typography, useTheme } from '@mui/material';
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Navbar from '../components/Navbar';
import ReviewWidgets from './widgets/ReviewsWidget';

const ReviewPage = () => {
  // State of Current Section
  const currentSection = useSelector((state) => state.currentSection);

  // Types of Colors & Reviews
  const primaryMain = useTheme().palette.primary.main;
  const reviewType = useLocation().pathname.split("/")[1];

  return (
    <Box>
      <Navbar />

      <Box 
        width="100%"
        padding="0.75rem"
        display={"flex"}
        justifyContent="center"
      >
        <Typography variant="h2" fontWeight="500">
          {currentSection.name}
        </Typography>

        <Box>
          {/* BUTTON TO ADD INTERNSHIP REVIEW */}
          <Button
            href={`/${reviewType}/form`}
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
            Add Review
          </Button>

          {/* LIST OF REVIEWS */}
          <Box
            width="100%"
            padding="2rem 6%"
            display={"flex"}
            gap="0.5rem"
            justifyContent="space-between"
          >
            <Box m="auto" flexBasis={"50%"}>
              <ReviewWidgets />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
 
export default ReviewPage;
