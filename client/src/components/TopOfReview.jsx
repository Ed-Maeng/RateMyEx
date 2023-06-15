import {
  Avatar,
  Box,
  Grid,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Rating,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import moment from 'moment';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../state/auth";
// Pages & Components
import Dialogs from './dialogs/Dialogs';
import FlexBetween from "./wrappers/FlexBetween";
// Icons
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import ShareIcon from '@mui/icons-material/Share';

const SaveAndShare = (props) => {
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const dateTimeAgo = moment(new Date(props.review.createdAt)).fromNow();
  // State of User & Token
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  // State of Open
  const [reviewUser, setReviewUser] = useState(null);
  // Types of Open Dialogs
  const [signInOpen, setSignInOpen] = useState(false);
  const [reviewSaved, setReviewSaved] = useState(false);
  const [defaultOpen, setDefaultOpen] = useState(false);
  // Check if it is in local or production
  const isLocal = window.location.href.split("/")[2] === "localhost:3000";

  const getUser = async () => {
    const responseUser = await fetch(
      isLocal ? `http://localhost:4000/users/${props.review.userId}`
      : `https://api.ratemyexschool.com:8443/users/${props.review.userId}`,
      {
        method: "GET",
      }
    );
    const dataUser = await responseUser.json();
    setReviewUser(dataUser);
  };

  const saveReview = async () => {
    const responseUser = await fetch(
      isLocal ? `http://localhost:4000/users/${user._id}/internships/${props.review._id}`
      : `https://api.ratemyexschool.com:8443/users/${user._id}/internships/${props.review._id}`,
      {
        method: "POST",
        headers: { "Authorization": `Bearer ${token}` },
      }
    );

    if (responseUser.status === 200) {
      const dataUser = await responseUser.json();
      dispatch(setUser({ user: dataUser }));
      setReviewSaved(true);
    } else {
      setDefaultOpen(true);
    }
  };

  useEffect(() => {
    getUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <ListItem>
        {/* AVATAR */}
        {reviewUser && 
          <ListItemAvatar>
            <Avatar sx={{ bgcolor: reviewUser.color }}>{reviewUser.firstName[0]}</Avatar>
          </ListItemAvatar>
        }
        
        <ListItemText
          primary={
            <FlexBetween>
              {/* RATING, USERNAME, & TIME AGO */}
              <Grid container direction="column">
                <Rating name="read-only" value={props.review.rating} size="small" readOnly />
                <Grid item>
                  <Typography variant="h5b" sx={{ color: palette.neutral.main }}>{dateTimeAgo}</Typography>
                </Grid>
              </Grid>

              {/* SAVE & SHARE */}
              <Box display="flex">
                {props.review._id in user.savedReviews ?
                  <Tooltip title="Saved">
                    <IconButton sx={{ color: palette.neutral.main }}>
                      <BookmarkIcon fontSize="inherit" />
                    </IconButton>
                  </Tooltip>
                  :
                  <Tooltip title="Save">
                    <IconButton 
                      onClick={() => {
                        user ? saveReview() : setSignInOpen(true);
                      }}
                      sx={{ color: palette.neutral.main }}
                    >
                      <BookmarkBorderIcon fontSize="inherit" />
                    </IconButton>
                  </Tooltip>
                }
                <Tooltip title="Share">
                  <IconButton sx={{ color: palette.neutral.main }}>
                    <ShareIcon fontSize="inherit" />
                  </IconButton>
                </Tooltip>
              </Box>
            </FlexBetween>
          }
        />
      </ListItem>

      {/* Warning Dialogs */}
      <Dialogs open={signInOpen} setOpen={setSignInOpen} type="not-signin" />
      <Dialogs open={reviewSaved} setOpen={setReviewSaved} type="review-saved" />
      <Dialogs open={defaultOpen} setOpen={setDefaultOpen} type="default" />
    </>
  )
};

export default SaveAndShare;
