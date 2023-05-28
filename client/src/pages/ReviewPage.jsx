import { Box, Button, Grid, Typography, useTheme } from '@mui/material';
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

      <Grid
        container
        direction="column"
        width="100%"
        padding="1rem"
        textAlign="center"
        spacing={1}
      >
        {/* TYPE OF REVIEW (FROM SECTIONS) */}
        <Grid item>
          <Typography
            variant="h1b"
            padding="0.5rem"
            color="primary"
          >
            {currentSection.name}
          </Typography>
        </Grid>

        {/* ADD REVIEW BUTTON */}
        <Grid item>
          <Button
            variant="contained" 
            onClick={() => 
              (!user ? setSignInOpen(true) : setReviewFormOpen(true))
            }
            sx={{
              backgroundColor: palette.button.default,
              width: "325px",
              height: "45px",
              borderRadius: "0.25rem",
              "&:hover": {
                backgroundColor: palette.button.alt
              }
            }}
          >
            <Typography variant="h4b">
              Add Review
            </Typography>
          </Button>
        </Grid>

        {/* Form for Adding Sections */}
        <ReviewFormPage open={reviewFormOpen} setOpen={setReviewFormOpen} />

        {/* Warning Dialogs */}
        <Dialogs open={signInOpen} setOpen={setSignInOpen} type="not-signin" />
      </Grid>

      {/* LIST OF REVIEWS */}
      <Box
        width="100%"
        display={"flex"}
        justifyContent="space-between"
      >
        <Box m="auto" flexBasis="60%">
          <Typography
            variant="h1b"
            pt="1rem"
            color={palette.neutral.dark}
          >
            {"All " + currentSection.totalReviews + " reviews"}
          </Typography>
          <ReviewWidgets />
        </Box>
      </Box>
    </Box>
  )
}
 
export default ReviewPage;
