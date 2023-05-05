import { Box, Typography, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ReviewForm from "../components/ReviewForm";

const ReviewPage = () => {
  const navigate = useNavigate();
  const theme = useTheme();

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
            onClick={() => navigate("/internships")}
            sx={{
              "&:hover": {
                cursor: "pointer",
              },
            }}
          >
            Review Internship
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

export default ReviewPage;
