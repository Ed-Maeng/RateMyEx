import { CardMedia, ImageList, Rating, Typography } from "@mui/material";
import { v4 as uuidv4 } from 'uuid';
import FlexBetween from "../../components/FlexBetween";
import WidgetWrapper from "../../components/WidgetWrapper";

const DormWidget = ({
  location,
  rating,
  comment,
  imageUrls,
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

export default DormWidget;
