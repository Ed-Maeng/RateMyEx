import { Box, Button, useTheme } from '@mui/material';
import { useLocation } from "react-router-dom";
import Navbar from '../components/Navbar';
import ReviewWidgets from './widgets/ReviewsWidget';

const ReviewPage = () => {
  const theme = useTheme();
  const primaryMain = theme.palette.primary.main;
  const location = useLocation();
  const reviewType = location.pathname.split("/")[1]

  return (
    <Box>
      <Navbar />

      <Box
        width="100%"
        padding="2rem"
        display={"flex"}
        justifyContent="center"
      >
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
