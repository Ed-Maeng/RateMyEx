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
import { useState } from "react";
import { useSelector } from "react-redux";

// Icons
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WorkIcon from '@mui/icons-material/Work';

// Pages & Components
import { useTheme } from "@emotion/react";
import Dialogs from '../../components/Dialogs';
import WidgetWrapper from "../../components/WidgetWrapper";

const InternshipWidget = (props) => {
  const { palette } = useTheme();
  const dateTimeAgo = moment(new Date(props.review.createdAt)).fromNow();

  // State of Current Section & User & Show More & Open
  const currentSection = useSelector((state) => state.currentSection);
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
          <Avatar />
        </ListItemAvatar>
        {/* RATING, USERNAME, TIME AGO */}
        <ListItemText
          primary={
            <Grid container direction="column">
              <Rating name="read-only" value={props.review.rating} size="small" readOnly />
              <Grid item>
                <Typography variant="h5b" sx={{ color: palette.neutral.main }}>
                  {"username | " + dateTimeAgo}
                </Typography>
              </Grid>
            </Grid>
          }
        />
      </ListItem>

      <Grid container direction="row" px="1.5rem" pt="0.4rem" alignItems="center" spacing={1.5}>
        {/* COMPANY NAME */}
        <Grid item>
          <Typography variant="h2b" sx={{ color: palette.button.default }}>
            {props.review.name}
          </Typography>
        </Grid>

        {/* INDUSTRY */}
        <Grid item>
          <Typography variant="h6b" sx={{ display: "flex", alignItems: "center", color: palette.neutral.main }}>
            <WorkIcon fontSize="small" style={{position: 'relative', bottom: '1px', right: '2px'}} />
            {props.review.industry}
          </Typography>
        </Grid>
        
        {/* LOCATION */}
        <Grid item>
          <Typography variant="h6b" sx={{ display: "flex", alignItems: "center", color: palette.neutral.main }}>
            <LocationOnIcon fontSize="small" />
            {props.review.location}
          </Typography>
        </Grid>
      </Grid>

      <Grid px="1rem" pt="0.75rem" container direction="row" alignItems="center" spacing={1.5}>
        {/* TERM */}
        <Grid item>
          <Chip
            label={props.review.term}
            style={{fontSize: "0.75rem"}}
          />
        </Grid>
        {/* JOB TITLE */}
        <Grid item>
          <Chip
            label={props.review.jobTitle} 
            style={{fontSize: "0.75rem"}}
          />
        </Grid>
        {/* EMPLOYMENT TYPE */}
        <Grid item>
          <Chip 
            label={props.review.employmentType} 
            style={{fontSize: "0.75rem"}}
          />
        </Grid>
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

export default InternshipWidget;
