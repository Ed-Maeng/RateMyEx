import {
  Avatar,
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Divider,
  Grid,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
// Components
import Navbar from "../components/Navbar";
import ResetPasswordDialog from "../components/dialogs/ResetPasswordDialog";
import FlexBetween from "../components/wrappers/FlexBetween";
import WidgetWrapper from "../components/wrappers/WidgetWrapper";
import ReviewWidgets from "../pages/widgets/ReviewsWidget";
// Icons
import BookmarkIcon from '@mui/icons-material/Bookmark';
import CheckIcon from '@mui/icons-material/Check';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PersonIcon from '@mui/icons-material/Person';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import SettingsIcon from '@mui/icons-material/Settings';
import ThumbsUpDownIcon from '@mui/icons-material/ThumbsUpDown';
import WorkOutlineOutlined from "@mui/icons-material/WorkOutline";
import SavedReviewsWidget from "./widgets/SavedReviewsWidget";

export default function ProfilePage() {
  const { palette } = useTheme();
  // State of User
  const user = useSelector((state) => state.user);
  // State of Reset Password & Button Navigation
  const [resetPassword, setResetPassword] = useState(false);
  const [value, setValue] = useState("profile");

  return (
    <Box>
      <Navbar />

      <Grid
        container
        direction="column"
        alignItems="center" 
        justifyContent="center"
      >
        <Grid item pb="2rem" sx={{ width: "50%" }}>
          <BottomNavigation
            showLabels
            value={value}
          >
            <BottomNavigationAction
              label="Profile"
              value="profile"
              icon={<PersonIcon />}
              onClick={() => setValue("profile")}
            />
            <BottomNavigationAction
              label="Settings"
              value="settings"
              icon={<SettingsIcon />}
              onClick={() => setValue("settings")}
            />
            <BottomNavigationAction
              label="My Ratings"
              value="ratings"
              icon={<ThumbsUpDownIcon />}
              onClick={() => setValue("ratings")}
            />
            <BottomNavigationAction
              label="Saved"
              value="saved"
              icon={<BookmarkIcon />}
              onClick={() => setValue("saved")}
            />
          </BottomNavigation>
          <Divider />
        </Grid>

        {/* PROFILE */}
        {(value === "profile") &&
          <Grid item>
            <WidgetWrapper>
              {/* TITLE */}
              <Box pb="1rem">
                <Typography variant="h2b">
                  My Profile
                </Typography>
              </Box>

              <Divider />

              {/* FIRST ROW: Name */}
              <FlexBetween gap="0.5rem" py="1rem">
                <FlexBetween gap="1rem">
                  <Avatar sx={{ bgcolor: user.color }}>{user.firstName[0]}</Avatar>
                  <Box>
                    <Typography
                      variant="h3b"
                    >
                      {user.firstName} {user.lastName}
                    </Typography>
                  </Box>
                </FlexBetween>
              </FlexBetween>

              {/* SECOND ROW: Info */}
              <Box>
                <Box display="flex" alignItems="center" gap="1rem" mb="1rem">
                  <SchoolOutlinedIcon fontSize="large" />
                  <Typography variant="h3b">{user.schoolName}</Typography>
                </Box>
                
                <Box display="flex" alignItems="center" gap="1rem" mb="1rem">
                  <WorkOutlineOutlined fontSize="large" />
                  <Typography variant="h3b">{"Student"}</Typography>
                </Box>

                {user.isVerified 
                  ?
                  <Box display="flex" alignItems="center" gap="1rem" mb="1rem">
                    <CheckIcon fontSize="large" />
                    <Typography variant="h3b">{"Verified"}</Typography>
                  </Box>
                  :
                  <Box display="flex" alignItems="center" gap="1rem" mb="1rem">
                    <CloseOutlinedIcon fontSize="large" />
                    <Typography variant="h3b">{"Not Verified"}</Typography>
                  </Box>
                }
              </Box>

              <Divider />

              {/* THIRD ROW: Number of User's Reviews */}
              <Box padding="1rem 0">
                <FlexBetween mb="0.5rem">
                  <Typography variant="h3b">Number of Reviews</Typography>
                  <Typography variant="h3b" fontWeight="500">
                    {user.numberOfReviews}
                  </Typography>
                </FlexBetween>
              </Box>
            </WidgetWrapper>
          </Grid>
        }
        
        {/* SETTINGS */}
        {(value === "settings") &&
          <Grid item>
            <WidgetWrapper>
              {/* TITLE */}
              <Box pb="2rem">
                <Typography variant="h2b">
                  Settings
                </Typography>
              </Box>

              <Box display="flex" alignItems="center" gap="1rem" mb="1rem">
                <MailOutlineIcon fontSize="large" />
                <TextField
                  label="Email"
                  defaultValue={user.email}
                  sx={{ width: 400 }}
                  InputProps={{
                    readOnly: true,
                  }}
                />                
              </Box>
              <Box display="flex" alignItems="center" gap="1rem" mb="1rem">
                <LockOutlinedIcon fontSize="large" />
                <TextField
                  label="Password"
                  defaultValue="••••••••"
                  sx={{ width: 400 }}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Box>

              <Grid container p="1rem" alignItems="center" justifyContent="center">
                <Typography
                  variant="h3b"
                  onClick={() => setResetPassword(true)}
                  sx={{
                    textDecoration: "underline",
                    color: palette.button.default,
                    "&:hover": {
                      cursor: "pointer",
                      color: palette.button.alt,
                    },
                  }}
                >
                  {"Reset Password Here"}
                </Typography>
              </Grid>
            </WidgetWrapper>
          </Grid>
        }

        {/* MY RATINGS */}
        {(value === "ratings") &&
          <>
            {user.numberOfReviews < 1 ?
              <Grid item>
                <Grid container direction="column" alignItems="center" justifyContent="center">
                  <Grid item pb="1rem">
                    <Typography variant="h1b">
                      You haven't wrote any reviews yet
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="h2b">
                      Find your own reviews here!
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              :
              <ReviewWidgets />
            }
          </>
        }

        {/* SAVED RATINGS */}
        {(value === "saved") &&
          <>
            {Object.keys(user.savedReviews).length < 1 ?
              <Grid item>
                <Grid container direction="column" alignItems="center" justifyContent="center">
                  <Grid item pb="1rem">
                    <Typography variant="h1b">
                      You haven't saved any reviews yet
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="h2b">
                      Find your favorite reviews and save them here!
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              :
              <SavedReviewsWidget />
            }
          </>
        }
      </Grid>

      {/* RESET PASSWORD */}
      <ResetPasswordDialog open={resetPassword} setOpen={setResetPassword} />
    </Box>
  );
}
