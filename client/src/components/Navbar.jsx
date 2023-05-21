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
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { palette } = useTheme();

  // State of User & Boolean Authentication
  const user = useSelector((state) => state.user);
  const isAuth = Boolean(useSelector((state) => state.token));

  return (
    <FlexBetween padding="1rem 10%">
      <Grid container direction="row" alignItems="center">
        <Grid item>
          <Typography
            fontWeight="bold"
            fontSize="clamp(1rem, 1.5rem, 1.5rem)"
            color="primary"
            onClick={() => navigate("/")}
            sx={{
              "&:hover": {
                cursor: "pointer",
              },
            }}
          >
            ratemyex
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
                <Typography>{user.firstName}</Typography>
              </MenuItem>
              <MenuItem onClick={() => dispatch(setLogout())}>
                Log Out
              </MenuItem>
            </Select> 
          </FormControl>
          :
          <Button 
            href="/login"
            variant="contained" 
            sx={{
              backgroundColor: palette.primary.main,
              width: "150px",
              borderRadius: "0.25rem",
              p: "0.25rem 1rem",
              "&:hover": {
                backgroundColor: palette.primary.secondary,
              }
            }}
          >
            Sign In
          </Button>
        }
      </FlexBetween>
    </FlexBetween>
  );
};

export default Navbar;
