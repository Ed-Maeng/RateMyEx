import { Box, Button, useTheme } from '@mui/material';
import Navbar from '../../components/Navbar';
import ReviewWidgets from '../widgets/ReviewsWidget';

const InternshipPage = () => {
  const theme = useTheme();
  const primaryMain = theme.palette.primary.main;

  return (
    <Box>
      <Navbar />

      <Box
        width="100%"
        padding="2rem"
        display={"flex"}
        justifyContent="center"
      >
        {/* BUTTON TO ADD DORM REVIEW */}
        <Button
          href="/dorms/review"
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

      {/* LIST OF DORM REVIEWS */}
      <Box
        width="100%"
        padding="2rem 6%"
        display={"flex"}
        gap="0.5rem"
        justifyContent="space-between"
      >
        <Box m="auto" flexBasis={"50%"}>
          <ReviewWidgets schoolId={"64532269581c4972867914a9"} page="dorms" />
        </Box>
      </Box>
    </Box>
  )
}
 
export default InternshipPage;
