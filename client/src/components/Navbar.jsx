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
  Tab,
  Tabs,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import { googleLogout } from '@react-oauth/google';
import { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLogout, setTab } from "../state/auth";

// Components
import SupportDialog from './dialogs/SupportDialog';

// Icons
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import GroupsIcon from '@mui/icons-material/Groups';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import HomeIcon from '@mui/icons-material/Home';
import Logout from '@mui/icons-material/Logout';
import RateReviewIcon from '@mui/icons-material/RateReview';
import SchoolIcon from '@mui/icons-material/School';
import Settings from '@mui/icons-material/Settings';
import WorkIcon from '@mui/icons-material/Work';

const Navbar = () => {
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // State of User & Boolean Authentication
  const user = useSelector((state) => state.user);
  const isAuth = Boolean(useSelector((state) => state.token));
  // State of Tab
  const tab = useSelector((state) => state.tab);
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
    <Grid container p="2rem" pt="2rem" direction="row" alignItems="center" spacing={2}>
      {/* LOGO */}
      <Grid item xs={3}>
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
      </Grid>
      
      {/* TABS */}
      <Grid item xs={6}>
        <Grid container alignItems="center" justifyContent="center">
          {(window.location.pathname !== "/" && window.location.pathname !== "/profile") && 
            <Tabs value={tab} aria-label="tabs">
              {/* Internships Tab */}
              <Tab 
                icon={<WorkIcon />} 
                label="Internships" 
                onClick={() => {
                  dispatch(setTab({tab: 0}));
                  navigate("/school/internships");
                  window.location.reload(false);
                }}
              />
              {/* Dorms Tab */}
              <Tab 
                icon={<HomeIcon />} 
                label="Dorms" 
                onClick={() => {
                  dispatch(setTab({tab: 1}));
                  navigate("/school/dorms");
                  window.location.reload(false);
                }}
              />
              {/* Clubs Tab */}
              <Tab 
                icon={<GroupsIcon />} 
                label="Clubs" 
                onClick={() => {
                  dispatch(setTab({tab: 2}));
                  navigate("/school/clubs");
                  window.location.reload(false);
                }}
              />
              {/* Internships Tab */}
              <Tab 
                icon={<SchoolIcon />} 
                label="Professors" 
                onClick={() => {
                  dispatch(setTab({tab: 3}));
                  navigate("/school/professors");
                  window.location.reload(false);
                }}
              />
            </Tabs>
          }
        </Grid>
      </Grid>

      {/* SUPPORT & ACCOUNT */}
      <Grid item xs={3}>
        <Grid container direction="row" alignItems="center" justifyContent="center">
          {/* Support Feedback */}
          <Grid item>
            <Tooltip title="Help">
              <IconButton 
                onClick={() => setSupportOpen(true)}
                size="large"
              >
                <HelpOutlineIcon fontSize="inherit" />
              </IconButton>
            </Tooltip>
          </Grid>

          {/* Account */}
          <Grid item>
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
                href="/signin"
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
          </Grid>
        </Grid>
      </Grid>
      
      {/* SUPPORT FEEDBACK */}
      <SupportDialog open={supportOpen} setOpen={setSupportOpen} />
    </Grid>
  );
};

export default Navbar;
