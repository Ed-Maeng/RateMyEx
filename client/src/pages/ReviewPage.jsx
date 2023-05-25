import { Box, Button, Typography, useTheme } from '@mui/material';
import { useSelector } from "react-redux";

// Pages & Components
import { useState } from 'react';
import Dialogs from '../components/Dialogs';
import Navbar from '../components/Navbar';
import ReviewFormPage from './forms/ReviewFormPage';
import ReviewWidgets from './widgets/ReviewsWidget';

const ReviewPage = () => {
  const { palette } = useTheme();

  // State of Current Section & User & Open
  const currentSection = useSelector((state) => state.currentSection);
  const user = useSelector((state) => state.user);

  // Types of Open Dialogs
  const [reviewFormOpen, setReviewFormOpen] = useState(false);
  const [signInOpen, setSignInOpen] = useState(false);

  return (
    <Box>
      <Navbar />

      <Box
        width="100%"
        padding="1rem"
        textAlign="center"
      >
        {/* TYPE OF REVIEW (FROM SECTIONS) */}
        <Typography
          padding="0.5rem"
          fontWeight="bold"
          fontSize="clamp(1rem, 1.5rem, 1.5rem)"
          color="primary"
        >
          {currentSection.name}
        </Typography>

        {/* ADD REVIEW BUTTON */}
        <Button
          variant="contained" 
          onClick={() => 
            (!user ? setSignInOpen(true) : setReviewFormOpen(true))
          }
          sx={{
            backgroundColor: palette.button.default,
            width: "500px",
            height: "50px",
            borderRadius: "0.25rem",
            "&:hover": {
              backgroundColor: palette.button.alt
            }
          }}
        >
          Add Review Here!
        </Button>

        {/* Form for Adding Sections */}
        <ReviewFormPage open={reviewFormOpen} setOpen={setReviewFormOpen} />

        {/* Warning Dialogs */}
        <Dialogs open={signInOpen} setOpen={setSignInOpen} type="not-signin" />
      </Box>

      {/* LIST OF REVIEWS */}
      <Box
        width="100%"
        display={"flex"}
        justifyContent="space-between"
      >
        <Box m="auto" flexBasis="90%">
          <ReviewWidgets />
        </Box>
      </Box>
    </Box>
  )
}
 
export default ReviewPage;
