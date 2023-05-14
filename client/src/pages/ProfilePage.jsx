import { Typography, useTheme, Button, Modal, Avatar, Stack } from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { BoxProps } from "@mui/material/Box";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { isValidElement, useEffect, useState } from "react";

import Navbar from "../components/Navbar";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function ProfilePage() {
  const user = useSelector((state) => state.user);
  const currentSection = useSelector((state) => state.currentSection);
  const [userInfo, setUserInfo] = useState([]);

  const getUserInfo = async () => {
    const response = await fetch(
      `http://localhost:4000/users/${user._id}`,
      {
        method: "GET",
      }
    );
    
    const data = await response.json();
    setUserInfo(data);
  };

  useEffect(() => { getUserInfo(); }); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Navbar />
      <Grid container spacing={2} sx={{ width: "60%", margin: "5% 10% 10% 5%" }}>
        <Grid>
          <Item>
            <Avatar
              sx={{ width: "10em", height: "10em", margin: "auto" }}
              src="TODO: add profile picture"
            />
          </Item>
        </Grid>
        <Grid xs={10}>
          <Stack sapcing={2}>
            <Item>
              <Typography variant="h4" fontWeight="500">
                Name: {userInfo.firstName + " " + userInfo.lastName}
              </Typography>
            </Item>
            <Item>
              <Typography variant="h4" fontWeight="500">
                Email: {userInfo.email}
              </Typography>
            </Item>
            <Item>
              <Typography variant="h4" fontWeight="500">
                School: {userInfo.schoolName}
              </Typography>
            </Item>
          </Stack>
        </Grid>
        <Grid xs={4}>
          
        </Grid>
      </Grid>
    </Box>
  );
}