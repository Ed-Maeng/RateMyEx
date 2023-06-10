import RateReviewIcon from '@mui/icons-material/RateReview';
import { Grid, Typography } from "@mui/material";
import { useNavigate } from 'react-router-dom';

const Logo = () => {
  const navigate = useNavigate();

  return (
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
  );
};

export default Logo;
