import { Box, Typography, useTheme } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import ReviewForm from "../components/Form/ReviewForm";

const ReviewFormPage = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  // Review Types
  const reviewType = useLocation().pathname.split("/")[2];

  return (
    <Box>
      <Box
        width="100%"
        backgroundColor={theme.palette.background.alt}
        p="1rem 6%"
        textAlign="center"
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
          Leave Your Review Here
        </Typography>
      </Box>

      <Box
        width="50%"
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
        backgroundColor={theme.palette.background.alt}
      >
        <ReviewForm />
      </Box>
    </Box>
  );
};

export default ReviewFormPage;
