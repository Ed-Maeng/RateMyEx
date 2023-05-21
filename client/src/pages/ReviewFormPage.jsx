import { Box, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import ReviewForm from "../components/Form/ReviewForm";

const ReviewFormPage = () => {
  const navigate = useNavigate();

  // Review Types
  const reviewType = useLocation().pathname.split("/")[2];

  return (
    <Box>
      <Box
        width="100%"
        padding="1rem 6%"
        textAlign="center"
        pt="3rem"
      >
        <Typography
          fontWeight="bold"
          fontSize="clamp(1rem, 1.5rem, 1.5rem)"
          color="primary"
          onClick={() => navigate(`/school/${reviewType}/reviews`)}
          sx={{
            "&:hover": {
              cursor: "pointer",
            },
          }}
        >
          Write Your Review
        </Typography>
      </Box>

      <Box m="auto" width="50%">
        <ReviewForm />
      </Box>
    </Box>
  );
};

export default ReviewFormPage;
