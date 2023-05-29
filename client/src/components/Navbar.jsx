import RateReviewIcon from '@mui/icons-material/RateReview';
import {
  Button,
  FormControl,
  Grid,
  InputBase,
  MenuItem,
  Select,
  Typography,
  useTheme,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLogout } from "../state/auth";
import FlexBetween from "./FlexBetween";

const Navbar = () => {
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // State of User & Boolean Authentication
  const user = useSelector((state) => state.user);
  const isAuth = Boolean(useSelector((state) => state.token));

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
      <FlexBetween gap="2rem">
        {isAuth 
          ?
          <FormControl variant="standard">
            <Select
              value={user.firstName}
              sx={{
                backgroundColor: palette.neutral.light,
                width: "150px",
                borderRadius: "0.25rem",
                p: "0.25rem 1rem",
                "& .MuiSvgIcon-root": {
                  pr: "0.25rem",
                  width: "3rem",
                },
                "& .MuiSelect-select:focus": {
                  backgroundColor: palette.neutral.light,
                },
              }}
              input={<InputBase />}
            >
              <MenuItem onClick={() => navigate("/profile")} value={user.firstName}>
                <Typography variant="h4b">{user.firstName}</Typography>
              </MenuItem>
              <MenuItem onClick={() => dispatch(setLogout())}>
              <Typography variant="h4b">Logout</Typography>
              </MenuItem>
            </Select> 
          </FormControl>
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
    </FlexBetween>
  );
};

export default Navbar;
