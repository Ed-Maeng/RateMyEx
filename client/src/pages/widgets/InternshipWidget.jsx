import { Rating, Typography } from "@mui/material";
import FlexBetween from "../../components/FlexBetween";
import WidgetWrapper from "../../components/WidgetWrapper";

const InternshipWidget = ({
  role,
  location,
  rating,
  comment,
}) => {
  
  return (
    <WidgetWrapper m="1rem 0">
      {/* ROLE, LOCATION */}
      <FlexBetween>
        <Typography variant="h4" fontWeight="500">
          {role}
        </Typography>
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

export default InternshipWidget;
