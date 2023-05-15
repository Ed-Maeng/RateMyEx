import {
  LocationOnOutlined,
  ManageAccountsOutlined,
  WorkOutlineOutlined,
} from "@mui/icons-material";
import CheckIcon from '@mui/icons-material/Check';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import {
  Avatar,
  Box,
  Divider,
  Typography,
  useTheme,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

// Components
import FlexBetween from "../components/FlexBetween";
import Navbar from "../components/Navbar";
import WidgetWrapper from "../components/WidgetWrapper";

export default function ProfilePage() {
  // State of User, Token & User Reviews
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const [userReviews, setUserReviews] = useState([]);

  // Theme & Colors
  const { palette } = useTheme();
  const main = palette.neutral.main;
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;

  const getUserReviews = async () => {
    const internshipResponse = await fetch(
      `http://localhost:4000/schools`,
      {
        method: "GET",
        "Authorization": `Bearer ${token}`,
      }
    );
    const dormResponse = await fetch(
      `http://localhost:4000/schools`,
      {
        method: "GET",
        "Authorization": `Bearer ${token}`,
      }
    );
    const clubResponse = await fetch(
      `http://localhost:4000/schools`,
      {
        method: "GET",
        "Authorization": `Bearer ${token}`,
      }
    );

    const internshipReviews = await internshipResponse.json();
    const dormReviews = await dormResponse.json();
    const clubReviews = await clubResponse.json();
    const reviews = Object.assign(internshipReviews, dormReviews, clubReviews);
    setUserReviews(reviews);
  };

  useEffect(() => {
    getUserReviews();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps


  return (
    <Box>
      <Navbar />

      <Box
        width="100%"
        padding="2rem 6%"
        display={"flex"}
        gap="0.5rem"
        justifyContent="space-between"
      >
        <WidgetWrapper>
          {/* FIRST ROW */}
          <FlexBetween
            gap="0.5rem"
            pb="1.1rem"
          >
            <FlexBetween gap="1rem">
              <Avatar />
              <Box>
                <Typography
                  variant="h4"
                  color={dark}
                  fontWeight="500"
                >
                  {user.firstName} {user.lastName}
                </Typography>
              </Box>
            </FlexBetween>
            <ManageAccountsOutlined />
          </FlexBetween>

          <Divider />

          {/* SECOND ROW */}
          <Box p="1rem 0">
            <Typography fontSize="1rem" color={main} fontWeight="500" mb="1rem">
              Profile
            </Typography>

            <Box display="flex" alignItems="center" gap="1rem" mb="1rem">
              <MailOutlineIcon fontSize="large" sx={{ color: main }} />
              <Typography color={main}>{user.email}</Typography>
            </Box>

            <Box display="flex" alignItems="center" gap="1rem" mb="1rem">
              <LocationOnOutlined fontSize="large" sx={{ color: main }} />
              <Typography color={main}>{user.schoolName}</Typography>
            </Box>
            
            <Box display="flex" alignItems="center" gap="1rem" mb="1rem">
              <WorkOutlineOutlined fontSize="large" sx={{ color: main }} />
              <Typography color={main}>{"Student"}</Typography>
            </Box>

            <Box display="flex" alignItems="center" gap="1rem" mb="1rem">
              <CheckIcon fontSize="large" sx={{ color: main }} />
              <Typography color={main}>{"Verified"}</Typography>
            </Box>
          </Box>

          <Divider />

          {/* THIRD ROW
              TODO: Add number of reviews and likes to User Schema */}
          <Box p="1rem 0">
            <FlexBetween mb="0.5rem">
              <Typography color={medium}>Number of Reviews</Typography>
              <Typography color={main} fontWeight="500">
                {0}
              </Typography>
            </FlexBetween>
            <FlexBetween>
              <Typography color={medium}>Number of Likes</Typography>
              <Typography color={main} fontWeight="500">
                {0}
              </Typography>
            </FlexBetween>
          </Box>
        </WidgetWrapper>

        {/* TODO: Write all User's reviews */}     
      </Box>
    </Box>
  );
}
