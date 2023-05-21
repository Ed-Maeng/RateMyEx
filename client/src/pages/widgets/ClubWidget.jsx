import { Button, CardMedia, ImageList, Rating, Typography } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";

// Pages & Components
import { useTheme } from "@emotion/react";
import Dialogs from '../../components/Dialogs';
import FlexBetween from "../../components/FlexBetween";
import WidgetWrapper from "../../components/WidgetWrapper";

const ClubWidget = ({
  rating,
  comment,
  imageUrls,
}) => {
  const { palette } = useTheme();

  // State of User & Show More & Open
  const user = useSelector((state) => state.user);
  const [showMore, setShowMore] = useState(false);

  // Types of Open Dialogs
  const [signInOpen, setSignInOpen] = useState(false);
  const [hasReviewOpen, setHasReviewOpen] = useState(false);

  return (
    <WidgetWrapper m="1rem 0">
      {/* RATING */}
      <FlexBetween m="0.25rem 0">
        <Rating name="read-only" value={rating} readOnly />
      </FlexBetween>

      {/* COMMENT */}
      { (comment.length > 100) 
        ? 
        <Typography m="0.5rem 0">
          {showMore ? comment : `${comment.substring(0, 100)} ...`}
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
            {showMore ? "Show less" : "Show more"}
          </Button>
        </Typography> 
        :
        <Typography m="0.5rem 0">
          {comment}
        </Typography> 
      }

      {/* Warning Dialogs */}
      <Dialogs open={signInOpen} setOpen={setSignInOpen} type="not-signin" />
      <Dialogs open={hasReviewOpen} setOpen={setHasReviewOpen} type="no-review" />

      {/* IMAGES */}
      <ImageList sx={{ width: "auto", height: "auto" }} cols={3}>
        {imageUrls.map((imageUrl) => (
          <CardMedia
            key={uuidv4()}
            image={imageUrl}
            style={{
              height: 0,
              paddingTop: '50%',
            }}
          />  
        ))}
      </ImageList>
    </WidgetWrapper>
  );
};

export default ClubWidget;
