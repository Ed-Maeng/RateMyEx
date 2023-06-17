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
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const TopOfReview = (props) => {
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const dateTimeAgo = moment(new Date(props.review.createdAt)).fromNow();
  // State of User & Token
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  // Types of Review
  const reviewType = window.location.pathname.split("/")[2];
  const isProfile = window.location.pathname.split("/")[1] === "profile";
  // State of Number of Likes & Review's User
  const [numberOfLikes, setNumberOfLikes] = useState(props.review.numberOfLikes);
  const [reviewUser, setReviewUser] = useState(null);
  // Types of Open Dialogs
  const [signInOpen, setSignInOpen] = useState(false);
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

    if (responseUser.ok) {
      const dataUser = await responseUser.json();
      setReviewUser(dataUser);
    } else {
      console.log("Response Issue in TopOfReview in getUser");
      setDefaultOpen(true);
    }
  };

  const saveReview = async () => {
    const responseUser = await fetch(
      isLocal ? `http://localhost:4000/users/save/${user._id}/${reviewType}/${props.review._id}`
      : `https://api.ratemyexschool.com:8443/users/save/${user._id}/${reviewType}/${props.review._id}`,
      {
        method: "POST",
        headers: { "Authorization": `Bearer ${token}` },
      }
    );

    if (responseUser.ok) {
      const dataUser = await responseUser.json();
      dispatch(setUser({ user: dataUser }));
    } else {
      console.log("Response Issue in TopOfReview in saveReview");
      setDefaultOpen(true);
    }
  };

  const unsaveReview = async () => {
    const responseUser = await fetch(
      isLocal ? `http://localhost:4000/users/unsave/${user._id}/${props.review._id}`
      : `https://api.ratemyexschool.com:8443/users/unsave/${user._id}/${props.review._id}`,
      {
        method: "POST",
        headers: { "Authorization": `Bearer ${token}` },
      }
    );

    if (responseUser.ok) {
      const dataUser = await responseUser.json();
      dispatch(setUser({ user: dataUser }));
    } else {
      console.log("Response Issue in TopOfReview in unsaveReview");
      setDefaultOpen(true);
    }
  };

  const likeReview = async () => {
    const responseUser = await fetch(
      isLocal ? `http://localhost:4000/users/like/${user._id}/${reviewType}/${props.review._id}`
      : `https://api.ratemyexschool.com:8443/users/like/${user._id}/${reviewType}/${props.review._id}`,
      {
        method: "POST",
        headers: { "Authorization": `Bearer ${token}` },
      }
    );

    if (responseUser.ok) {
      const dataUser = await responseUser.json();
      dispatch(setUser({ user: dataUser }));
      setNumberOfLikes(numberOfLikes + 1);
    } else {
      console.log("Response Issue in TopOfReview in likeReview");
      setDefaultOpen(true);
    }
  };

  const unlikeReview = async () => {
    const responseUser = await fetch(
      isLocal ? `http://localhost:4000/users/unlike/${user._id}/${reviewType}/${props.review._id}`
      : `https://api.ratemyexschool.com:8443/users/unlike/${user._id}/${reviewType}/${props.review._id}`,
      {
        method: "POST",
        headers: { "Authorization": `Bearer ${token}` },
      }
    );

    if (responseUser.ok) {
      const dataUser = await responseUser.json();
      dispatch(setUser({ user: dataUser }));
      setNumberOfLikes(numberOfLikes - 1);
    } else {
      console.log("Response Issue in TopOfReview in unlikeReview");
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

              {/* LIKE & SAVE */}
              {!isProfile &&
                <Box display="flex">
                  {user.likedReviews.includes(props.review._id) ?
                      <>
                        <Typography variant="h3b" sx={{ color: palette.neutral.main }}>{numberOfLikes}</Typography>
                        <Tooltip title="Liked">
                          <IconButton 
                            onClick={() => {
                              user ? unlikeReview() : setSignInOpen(true);
                            }}
                            sx={{ color: palette.neutral.main }}
                          >                      
                            <FavoriteIcon fontSize="inherit" />
                          </IconButton>
                        </Tooltip>
                      </>
                    :
                      <>
                        <Typography variant="h3b" sx={{ color: palette.neutral.main }}>{numberOfLikes}</Typography>
                        <Tooltip title="Like">
                          <IconButton
                            onClick={() => {
                              user ? likeReview() : setSignInOpen(true);
                            }}
                            sx={{ color: palette.neutral.main }}
                          >                      
                            <FavoriteBorderIcon fontSize="inherit" />
                          </IconButton>
                        </Tooltip>
                      </>
                  }

                  {props.review._id in user.savedReviews ?
                    <Tooltip title="Saved">
                      <IconButton
                        onClick={() => {
                          user ? unsaveReview() : setSignInOpen(true);
                        }}
                        sx={{ color: palette.neutral.main }}
                      >
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
                </Box>
              }
            </FlexBetween>
          }
        />
      </ListItem>

      {/* Warning Dialogs */}
      <Dialogs open={signInOpen} setOpen={setSignInOpen} type="not-signin" />
      <Dialogs open={defaultOpen} setOpen={setDefaultOpen} type="default" />
    </>
  )
};

export default TopOfReview;
