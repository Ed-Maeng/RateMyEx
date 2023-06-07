import RateReviewIcon from '@mui/icons-material/RateReview';
import { Box, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Form from "../../components/forms/Form";
import ResetPasswordForm from "../../components/forms/ResetPasswordForm";

const AccountFormPage = (props) => {
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
      
      {/* FORM */}
      <Box m="2rem auto" width="50%">
        {(props.page === "signin") ? <Form /> : <ResetPasswordForm/>}
      </Box>
    </Box>
  );
};

export default AccountFormPage;
