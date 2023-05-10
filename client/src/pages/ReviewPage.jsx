import { Box, Button, Typography, useTheme } from '@mui/material';
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

// Pages & Components
import Navbar from '../components/Navbar';
import ReviewWidgets from './widgets/ReviewsWidget';

const ReviewPage = () => {
  // State of Current Section
  const currentSection = useSelector((state) => state.currentSection);

  // Types of Colors & Reviews
  const primaryMain = useTheme().palette.primary.main;
  const backgroundAlt = useTheme().palette.background.alt;
  const reviewType = useLocation().pathname.split("/")[1];

  return (
    <Box>
      <Navbar />

      <Box
        width="100%"
        backgroundColor={backgroundAlt}
        p="1rem 6%"
        textAlign="center"
      >
        {/* TYPE OF REVIEW (FROM SECTIONS) */}
        <Typography
          fontWeight="bold"
          fontSize="clamp(1rem, 1.5rem, 1.5rem)"
          color="primary"
        >
          {currentSection.name}
        </Typography>

        {/* BUTTON TO ADD REVIEW */}
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
      </Box>

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
  )
}
 
export default ReviewPage;
