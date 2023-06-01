import {
  Avatar,
  Box,
  Divider,
  Grid,
  Typography,
  useTheme,
} from "@mui/material";
import { useSelector } from "react-redux";

// Icons
import CheckIcon from '@mui/icons-material/Check';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import WorkOutlineOutlined from "@mui/icons-material/WorkOutline";

// Components
import FlexBetween from "../components/FlexBetween";
import Navbar from "../components/Navbar";
import WidgetWrapper from "../components/WidgetWrapper";
import ReviewWidgets from "../pages/widgets/ReviewsWidget";

export default function ProfilePage() {
  // State of User, Token & User Reviews
  const user = useSelector((state) => state.user);

  // Theme & Colors
  const { palette } = useTheme();
  const main = palette.neutral.main;
  const dark = palette.neutral.dark;

  return (
    <Box>
      <Navbar />

      <Grid
        container
        padding="1rem 6%"
        gap="2rem"
      >
        <Grid item xs={4}>
          <WidgetWrapper>
            {/* FIRST ROW */}
            <FlexBetween
              gap="0.5rem"
              pb="1.1rem"
            >
              <FlexBetween gap="1rem">
                <Avatar sx={{ bgcolor: palette.button.signup }}>{user.firstName[0]}</Avatar>
                <Box>
                  <Typography
                    variant="h3b"
                    color={dark}
                    fontWeight="500"
                  >
                    {user.firstName} {user.lastName}
                  </Typography>
                </Box>
              </FlexBetween>
            </FlexBetween>

            <Divider />

            {/* SECOND ROW */}
            <Box padding="1rem 0">
              <Typography fontSize="1rem" color={main} fontWeight="500" mb="1rem">
                Profile
              </Typography>

              <Box display="flex" alignItems="center" gap="1rem" mb="1rem">
                <MailOutlineIcon fontSize="large" sx={{ color: main }} />
                <Typography variant="h3b" color={main}>{user.email}</Typography>
              </Box>

              <Box display="flex" alignItems="center" gap="1rem" mb="1rem">
                <SchoolOutlinedIcon fontSize="large" sx={{ color: main }} />
                <Typography variant="h3b" color={main}>{user.schoolName}</Typography>
              </Box>
              
              <Box display="flex" alignItems="center" gap="1rem" mb="1rem">
                <WorkOutlineOutlined fontSize="large" sx={{ color: main }} />
                <Typography variant="h3b" color={main}>{"Student"}</Typography>
              </Box>

              {user.isVerified 
                ?
                <Box display="flex" alignItems="center" gap="1rem" mb="1rem">
                  <CheckIcon fontSize="large" sx={{ color: main }} />
                  <Typography variant="h3b" color={main}>{"Verified"}</Typography>
                </Box>
                :
                <Box display="flex" alignItems="center" gap="1rem" mb="1rem">
                  <CloseOutlinedIcon fontSize="large" sx={{ color: main }} />
                  <Typography variant="h3b" color={main}>{"Not Verified"}</Typography>
                </Box>
              }
            </Box>

            <Divider />

            {/* THIRD ROW: Number of User's Reviews */}
            <Box padding="1rem 0">
              <FlexBetween mb="0.5rem">
                <Typography variant="h3b" color={main}>Number of Reviews</Typography>
                <Typography variant="h3b" color={main} fontWeight="500">
                  {user.numberOfReviews}
                </Typography>
              </FlexBetween>
            </Box>
          </WidgetWrapper>
        </Grid>

        <Grid item xs={7}>
          <WidgetWrapper>
            <Box m="auto" flexBasis="85%">
              <Typography
                variant="h1b"
                pt="1rem"
                color={palette.neutral.dark}
              >
                {"My Reviews"}
              </Typography>
              <ReviewWidgets />
            </Box>
          </WidgetWrapper>
        </Grid>
      </Grid>
    </Box>
  );
}
