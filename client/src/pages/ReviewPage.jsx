import { Avatar, Box, Button, Grid, Typography, useTheme } from '@mui/material';
import { useState } from 'react';
import { useSelector } from "react-redux";
// Pages & Components
import Navbar from '../components/Navbar';
import Dialogs from '../components/dialogs/Dialogs';
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
    <>
      <Navbar />

      <Box display="flex" pb="2rem" justifyContent="center">
        {/* TYPE OF REVIEW (FROM SECTIONS) */}
        <Box px="2rem">
          <Grid container direction="row" pb="1rem" alignItems="center" justifyContent="center" spacing={2}>
            <Grid item>
              <Typography variant="h1b">
                {currentSection.name}
              </Typography>
            </Grid>
            <Grid item>
              {currentSection.color 
                ?
                <Avatar sx={{ width: 65, height: 65, bgcolor: currentSection.color }}>
                  {currentSection.name[0].toUpperCase() + (currentSection.name.split(" ")[1] ? currentSection.name.split(" ")[1][0].toUpperCase() : "")}
                </Avatar>
                : 
                <Avatar alt={currentSection.name} src={currentSection.imageUrl} sx={{ width: 65, height: 65 }} /> 
              }
            </Grid>
          </Grid>
              
          {/* ADD REVIEW BUTTON */}
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
        </Box>
      

        {/* Form for Adding Sections */}
        <ReviewFormPage open={reviewFormOpen} setOpen={setReviewFormOpen} />

        {/* Warning Dialogs */}
        <Dialogs open={signInOpen} setOpen={setSignInOpen} type="not-signin" />
      </Box>

      <Box display="flex" justifyContent="center">
        <ReviewWidgets />
      </Box>
    </>
  )
}
 
export default ReviewPage;
