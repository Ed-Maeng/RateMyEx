import {
  Box,
  Button,
  CardMedia,
  Chip,
  Grid,
  ImageList,
  Typography,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
// Pages & Components
import TopOfReview from "../../components/TopOfReview";
import Dialogs from '../../components/dialogs/Dialogs';
import WidgetWrapper from "../../components/wrappers/WidgetWrapper";

const ClubWidget = (props) => {
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
