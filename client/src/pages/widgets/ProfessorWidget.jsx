import {
  Avatar,
  Box,
  Button,
  Chip,
  Grid,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Rating,
  Typography
} from "@mui/material";
import moment from 'moment';
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

// Pages & Components
import { useTheme } from "@emotion/react";
import Dialogs from '../../components/Dialogs';
import WidgetWrapper from "../../components/WidgetWrapper";

const ProfessorWidget = (props) => {
  const { palette } = useTheme();
  const dateTimeAgo = moment(new Date(props.review.createdAt)).fromNow();
  // State of User & Show More & Open
  const user = useSelector((state) => state.user);
  const [showMore, setShowMore] = useState(false);
  const [reviewUser, setReviewUser] = useState(null);
  // Types of Open Dialogs
  const [signInOpen, setSignInOpen] = useState(false);
  const [hasReviewOpen, setHasReviewOpen] = useState(false);
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
        {/* RATING, USERNAME, TIME AGO */}
        <ListItemText
          primary={
            <Grid container direction="column">
              <Rating name="read-only" value={props.review.rating} size="small" readOnly />
              <Grid item>
                <Typography variant="h5b" sx={{ color: palette.neutral.main }}>{dateTimeAgo}</Typography>
              </Grid>
            </Grid>
          }
        />
      </ListItem>

      <Grid container direction="row" px="1.5rem" pt="0.4rem" alignItems="center" spacing={1.5}>
        {/* PROFESSOR NAME */}
        <Grid item>
          <Typography variant="h2b" sx={{ color: palette.button.default }}>
            {props.review.name}
          </Typography>
        </Grid>
        {/* CLASS NAME */}
        <Grid item>
          <Typography variant="h2b" sx={{ color: palette.button.default }}>
            {props.review.className}
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
      </Grid>

      <Box p="1.25rem">
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
    </WidgetWrapper>
  );
};

export default ProfessorWidget;
