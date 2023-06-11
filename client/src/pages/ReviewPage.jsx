import { Box, Button, Grid, Typography, useTheme } from '@mui/material';
import { useState } from 'react';
import { useSelector } from "react-redux";
// Pages & Components
import Navbar from '../components/Navbar';
import Dialogs from '../components/dialogs/Dialogs';
import WidgetWrapper from '../components/wrappers/WidgetWrapper';
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
              bgcolor: palette.button.default,
              width: "325px",
              height: "45px",
              borderRadius: "0.25rem",
              "&:hover": {
                bgcolor: palette.button.alt
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

      <Box display="flex" p="2rem">
        {/* OVERALL RATING */}
        <WidgetWrapper>
          <Typography>Overall Rating</Typography>
        </WidgetWrapper>

        {/* LIST OF REVIEWS */}
        <ReviewWidgets />
      </Box>
    </Box>
  )
}
 
export default ReviewPage;
