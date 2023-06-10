import {
  Button,
  Grid,
  IconButton,
  Typography,
  useTheme
} from "@mui/material";
// Icons
import EmailIcon from '@mui/icons-material/Email';
import InstagramIcon from '@mui/icons-material/Instagram';
import RateReviewIcon from '@mui/icons-material/RateReview';
import YouTubeIcon from '@mui/icons-material/YouTube';

const Footer = () => {
  const { palette } = useTheme();

  return (
    <Grid 
      container 
      p="4rem"
      spacing={2}
      sx={{
        bgcolor: palette.background.footer,
      }}
    >
      {/* MAIN */}
      <Grid container direction="row" alignItems="center" justifyContent="center">
        {/* LOGO */}
        <Grid item>
          <Grid container direction="row" alignItems="center" justifyContent="center">
            <Grid item>
              <Typography
                variant="footer"
                color="primary"
              >
                Ratemyex
              </Typography>
            </Grid>
            <Grid item>
              <RateReviewIcon fontSize="large" />
            </Grid>
          </Grid>
        </Grid>
        <Grid item pl="1.5rem">
          <IconButton
            // onClick={() => }
            size="large"
            color="primary"
            sx={{
              height: "65px",
              width: "65px",
            }}
          >
            <InstagramIcon sx={{ height: "40px", width: "40px" }} />
          </IconButton>
        </Grid>
        <Grid item>
          <IconButton
            // onClick={() => }
            size="large"
            color="primary"
            sx={{
              height: "65px",
              width: "65px",
            }}
          >
            <EmailIcon sx={{ height: "45px", width: "45px" }} />
          </IconButton>
        </Grid>
        <Grid item>
          <IconButton
            // onClick={() => }
            size="large"
            color="primary"
            sx={{
              height: "65px",
              width: "65px",
            }}
          >
            <YouTubeIcon sx={{ height: "50px", width: "50px" }} />
          </IconButton>
        </Grid>
      </Grid>
      
      {/* ABOUT */}
      <Grid 
        container 
        direction="row" 
        py="1rem" 
        pt="2.5rem" 
        alignItems="center" 
        justifyContent="center" 
        spacing={3}>
        <Grid item>
          <Button
            variant="outlined"
            color="primary"
          >
            <Typography variant="h3b">
              About
            </Typography>
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="outlined"
            color="primary"
          >
            <Typography variant="h3b">
              Contact
            </Typography>
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="outlined"
            color="primary"
          >
            <Typography variant="h3b">
              Schools
            </Typography>
          </Button>
        </Grid>
      </Grid>
      
      {/* POLICY */}
      <Grid container direction="row" alignItems="center" justifyContent="center" spacing={3}>
        <Grid item>
          <Typography variant="h5b">
            Terms & Conditions • Privacy Policy • All Rights Reserved
            </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Footer;
