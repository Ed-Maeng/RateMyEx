import RateReviewIcon from '@mui/icons-material/RateReview';
import { Box, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ResetPasswordForm from "../components/forms/ResetPasswordForm";

const ResetPasswordPage = () => {
  const navigate = useNavigate();

  return (
    <Box pt="3rem">
      {/* LOGO */}
      <Grid container direction="row" alignItems="center" justifyContent="center">
        <Grid item>
          <Typography
            variant="h1b"
            color="primary"
            onClick={() => navigate("/")}
            sx={{
              "&:hover": {
                cursor: "pointer",
              },
            }}
          >
            Ratemyex
          </Typography>
        </Grid>
        <Grid item>
          <RateReviewIcon />
        </Grid>
      </Grid>
      
      {/* RESET PASSWORD FORM */}
      <Box m="2rem auto" width="50%">
        <ResetPasswordForm />
      </Box>
    </Box>
  );
};

export default ResetPasswordPage;
