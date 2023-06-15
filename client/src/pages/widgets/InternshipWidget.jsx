import {
  Box,
  Button,
  Chip,
  Grid,
  Typography,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
// Pages & Components
import TopOfReview from "../../components/TopOfReview";
import Dialogs from '../../components/dialogs/Dialogs';
import WidgetWrapper from "../../components/wrappers/WidgetWrapper";
// Icons
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WorkIcon from '@mui/icons-material/Work';

const InternshipWidget = (props) => {
  const { palette } = useTheme();
  // State of User & Token
  const user = useSelector((state) => state.user);
  // State of Show More & Open
  const [showMore, setShowMore] = useState(false);
  // Types of Open Dialogs
  const [signInOpen, setSignInOpen] = useState(false);
  const [hasReviewOpen, setHasReviewOpen] = useState(false);

  return (
    <WidgetWrapper m="1rem 0">
      <TopOfReview review={props.review} />

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
            <WorkIcon fontSize="small" style={{position: "relative", bottom: "1px", right: "2px"}} />
            {props.review.industry}
          </Typography>
        </Grid>
        
        {/* LOCATION */}
        {props.review.location &&
          <Grid item>
            <Typography variant="h6b" sx={{ display: "flex", alignItems: "center", color: palette.neutral.main }}>
              <LocationOnIcon fontSize="small" />
              {props.review.location}
            </Typography>
          </Grid>
        }
      </Grid>

      <Grid px="1rem" pt="0.75rem" container direction="row" alignItems="center" spacing={1.5}>
        {/* TERM */}
        {props.review.term &&
          <Grid item>
            <Chip
              variant="outlined"
              label={props.review.term}
              style={{fontSize:"0.75rem"}}
            />
          </Grid>
        }
        {/* JOB TITLE */}
        <Grid item>
          <Chip
            variant="outlined"
            label={props.review.jobTitle} 
            style={{fontSize:"0.75rem"}}
          />
        </Grid>
        {/* EMPLOYMENT TYPE */}
        {props.review.employmentType &&
          <Grid item>
            <Chip
              variant="outlined"
              label={props.review.employmentType} 
              style={{fontSize:"0.75rem"}}
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

export default InternshipWidget;
