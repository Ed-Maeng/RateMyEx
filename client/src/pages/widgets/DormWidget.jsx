import {
  Avatar,
  Box,
  Button,
  CardMedia,
  Chip,
  Grid,
  ImageList,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Rating,
  Typography
} from "@mui/material";
import moment from 'moment';
import { useState } from "react";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";

// Pages & Components
import { useTheme } from "@emotion/react";
import Dialogs from '../../components/Dialogs';
import WidgetWrapper from "../../components/WidgetWrapper";

const DormWidget = (props) => {
  const { palette } = useTheme();
  const dateTimeAgo = moment(new Date(props.review.createdAt)).fromNow();

  // State of User & Show More & Open
  const user = useSelector((state) => state.user);
  const [showMore, setShowMore] = useState(false);

  // Types of Open Dialogs
  const [signInOpen, setSignInOpen] = useState(false);
  const [hasReviewOpen, setHasReviewOpen] = useState(false);

  return (
    <WidgetWrapper m="1rem 0">
      <ListItem>
        {/* AVATAR */}
        <ListItemAvatar>
          <Avatar sx={{ bgcolor: palette.button.signup }}>{user.firstName[0]}</Avatar>
        </ListItemAvatar>
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
        {/* DORM NAME */}
        <Grid item>
          <Typography variant="h2b" sx={{ color: palette.button.default }}>
            {props.review.name}
          </Typography>
        </Grid>
        {/* CAMPUS OPTION */}
        {props.review.campus &&
          <Grid item>
            <Chip
              variant="outlined"
              label={props.review.campus} 
              style={{fontSize: "0.75rem"}}
            />
          </Grid>
        }
        {/* ROOMS OPTION */}
        {props.review.rooms &&
          <Grid item>
            <Chip
              variant="outlined"
              label={props.review.rooms} 
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

export default DormWidget;
