import {
  Avatar,
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import { googleLogout } from '@react-oauth/google';
import { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLogout } from "../state/auth";

// Components
import SupportDialog from './dialogs/SupportDialog';
import FlexBetween from "./wrappers/FlexBetween";

// Icons
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import Logout from '@mui/icons-material/Logout';
import RateReviewIcon from '@mui/icons-material/RateReview';
import Settings from '@mui/icons-material/Settings';

const Navbar = () => {
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // State of User & Boolean Authentication
  const user = useSelector((state) => state.user);
  const isAuth = Boolean(useSelector((state) => state.token));
  // Account Settings
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  // Support Feedback
  const [supportOpen, setSupportOpen] = useState(false);

  return (
    <FlexBetween padding="1rem 10%" pt="2rem">
      <Grid container direction="row" alignItems="center">
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

      {/* Sign In or Menus */}
      <FlexBetween>
        {/* SUPPORT FEEDBACK */}
        <Tooltip title="Help">
          <IconButton 
            onClick={() => setSupportOpen(true)}
            size="large"
          >
            <HelpOutlineIcon fontSize="inherit" />
          </IconButton>
        </Tooltip>
        {/* Sign In or Menus */}
        {isAuth 
          ?
          <Box>
            <Box display="flex" alignItems="center" textAlign="center">
              <Tooltip title="Account">
                <IconButton
                  onClick={handleClick}
                  size="small"
                  sx={{ ml: 2 }}
                  aria-controls={open ? 'account-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                >
                  <Avatar sx={{ width: 45, height: 45, bgcolor: user.color }}>{user.firstName[0]}</Avatar>
                </IconButton>
              </Tooltip>
            </Box>
            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: 'visible',
                  filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                  mt: 1.5,
                  '& .MuiAvatar-root': {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  '&:before': {
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: 'background.paper',
                    transform: 'translateY(-50%) rotate(45deg)',
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
              <MenuItem onClick={() => navigate("/profile")}>
                <ListItemIcon>
                  <AccountCircleIcon fontSize="small" />
                </ListItemIcon>
                Profile
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <Settings fontSize="small" />
                </ListItemIcon>
                Settings
              </MenuItem>
              <MenuItem onClick={() => {
                dispatch(setLogout());
                googleLogout();
                navigate("/");
              }}>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </Box>
          :
          <Button 
            href="/login"
            variant="contained" 
            sx={{
              backgroundColor: palette.button.signup,
              width: "110px",
              borderRadius: "0.25rem",
              p: "0.25rem 1rem",
              "&:hover": {
                backgroundColor: palette.button.alt,
              }
            }}
          >
            <Typography variant="h3b">Sign In</Typography>
          </Button>
        }
      </FlexBetween>

      {/* SUPPORT FEEDBACK */}
      <SupportDialog open={supportOpen} setOpen={setSupportOpen} />
    </FlexBetween>
  );
};

export default Navbar;
