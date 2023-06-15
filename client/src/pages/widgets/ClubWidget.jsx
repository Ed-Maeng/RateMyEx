import {
  Avatar,
  Box,
  Button,
  CardMedia,
  Chip,
  Grid,
  IconButton,
  ImageList,
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
import { v4 as uuidv4 } from "uuid";
import { setUser } from "../../state/auth";
// Pages & Components
import Dialogs from '../../components/dialogs/Dialogs';
import FlexBetween from "../../components/wrappers/FlexBetween";
import WidgetWrapper from "../../components/wrappers/WidgetWrapper";
// Icons
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import ShareIcon from '@mui/icons-material/Share';


const ClubWidget = (props) => {
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const dateTimeAgo = moment(new Date(props.review.createdAt)).fromNow();
  // State of User & Token
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  // State of Show More & Open
  const [showMore, setShowMore] = useState(false);
  const [reviewUser, setReviewUser] = useState(null);
  // Types of Open Dialogs
  const [signInOpen, setSignInOpen] = useState(false);
  const [hasReviewOpen, setHasReviewOpen] = useState(false);
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
      isLocal ? `http://localhost:4000/users/${user._id}/clubs/${props.review._id}`
      : `https://api.ratemyexschool.com:8443/users/${user._id}/clubs/${props.review._id}`,
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
    <WidgetWrapper m="1rem 0">
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
                {props.saved &&
                  <>
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
                  </>
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

      <Grid container direction="row" px="1.5rem" pt="0.4rem" alignItems="center" spacing={1.5}>
        {/* CLUB NAME */}
        <Grid item>
          <Typography variant="h2b" sx={{ color: palette.button.default }}>
            {props.review.name}
          </Typography>
        </Grid>
        {/* TERM */}
        {props.review.term &&
          <Grid item>
            <Chip
              variant="outlined"
              label={props.review.term} 
              style={{fontSize: "0.75rem"}}
            />
          </Grid>
        }
        {/* CLUB CATEGORY */}
        {props.review.term &&
          <Grid item>
            <Chip
              variant="outlined"
              label={props.review.category} 
              style={{fontSize: "0.75rem"}}
            />
          </Grid>
        }
      </Grid>

      <Box pt="1.25rem" px="1.25rem">
        {/* COMMENT */}
        {(props.review.comment.length > 100) 
          ? 
          <Typography variant="h3r" m="0.5rem 0">
            {showMore ? props.review.comment : `${props.review.comment.substring(0, 100)} ...`}
            <Button
              sx={{
                height: 30,
                color: palette.button.default,
              }}
              onClick={() =>
                !user ? setSignInOpen(true) :
                (user.numberOfReviews < 1) ? setHasReviewOpen(true) :
                setShowMore(!showMore)
              }
            >
              <Typography variant="h6b">
                {showMore ? "Show less" : "Show more"}
              </Typography>
            </Button>
          </Typography> 
          :
          <Typography variant="h3r" m="0.5rem 0">
            {props.review.comment}
          </Typography> 
        }
      </Box>

      {/* Warning Dialogs */}
      <Dialogs open={signInOpen} setOpen={setSignInOpen} type="not-signin" />
      <Dialogs open={hasReviewOpen} setOpen={setHasReviewOpen} type="no-review" />
      <Dialogs open={reviewSaved} setOpen={setReviewSaved} type="review-saved" />
      <Dialogs open={defaultOpen} setOpen={setDefaultOpen} type="default" />

      {/* IMAGES */}
      <ImageList cols={5}>
        {props.review.imageUrls.map((imageUrl) => (
          <CardMedia
            key={uuidv4()}
            image={imageUrl}
            component="img"
            sx={{ padding: "0.5rem", objectFit: "contain" }}
          />
        ))}
      </ImageList>
    </WidgetWrapper>
  );
};

export default ClubWidget;
