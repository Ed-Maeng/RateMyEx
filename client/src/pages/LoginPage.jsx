import RateReviewIcon from '@mui/icons-material/RateReview';
import { Box, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Form from "../components/Form/Form";

const LoginPage = () => {
  const navigate = useNavigate();

  return (
    <Box>
      <Box width="100%" pt="3rem">
        <Grid container direction="row" alignItems="center" justifyContent="center">
          <Grid item>
            <Typography
              fontWeight="bold"
              fontSize="clamp(1rem, 1.5rem, 1.5rem)"
              color="primary"
              onClick={() => navigate("/")}
              sx={{
                "&:hover": {
                  cursor: "pointer",
                },
              }}
            >
              ratemyex
            </Typography>
          </Grid>
          <Grid item>
            <RateReviewIcon />
          </Grid>
        </Grid>
      </Box>

      <Box
        width="50%"
        m="2rem auto"
        borderRadius="1.5rem"
      >
        <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }}>
          Hey, Welcome Back!
        </Typography>
        <Form />
      </Box>
    </Box>
  );
};

export default LoginPage;
