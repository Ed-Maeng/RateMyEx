import { Rating, Typography } from "@mui/material";
import FlexBetween from "../../components/FlexBetween";
import WidgetWrapper from "../../components/WidgetWrapper";

const DormWidget = ({
  location,
  rating,
  comment,
}) => {
  
  return (
    <WidgetWrapper m="1rem 0">
      {/* LOCATION */}
      <FlexBetween>
        <Typography variant="h4" fontWeight="500">
          {location}
        </Typography>
      </FlexBetween>
      
      {/* RATING */}
      <FlexBetween m="0.25rem 0">
        <Rating name="read-only" value={rating} readOnly />
      </FlexBetween>

      {/* COMMENT */}
      <Typography m="0.5rem 0">
        {comment}
      </Typography>
    </WidgetWrapper>
  );
};

export default DormWidget;
