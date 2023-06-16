import {
  Box,
  Chip,
  Grid,
  Typography,
  useTheme,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
// Icons
import StarIcon from '@mui/icons-material/Star';
import Dialogs from "./dialogs/Dialogs";

const OverallRating = () => {
  const { palette } = useTheme();
  // Types of Review Types
  const reviewType = window.location.pathname.split("/")[2];
  // State of Current Section & Overall Rating
  const currentSection = useSelector((state) => state.currentSection);
  const overallRating = (currentSection.totalReviews > 0) ? (currentSection.totalRatings * 1.0 / currentSection.totalReviews) : 0;
  // Check if it is in local or production
  const isLocal = window.location.href.split("/")[2] === "localhost:3000";
  // Ratings Data
  const [ratings, setRatings] = useState([]);
  // Types of Open Dialogs
  const [defaultOpen, setDefaultOpen] = useState(false);

  const getRatings = async () => {
    const response = await fetch(
      isLocal ? `http://localhost:4000/${reviewType}/reviewsData/${currentSection._id}` 
      : `https://api.ratemyexschool.com:8443/${reviewType}/reviewsData/${currentSection._id}`,
      {
        method: "GET",
      }
    );

    if (response.ok) {
      const data = await response.json();
      console.log(data)
      setRatings(data);
    } else {
      console.log("Response Issue in OverallRating in getReviewsData");
      setDefaultOpen(true);
    }
  };

  useEffect(() => {
    getRatings();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps


  return (
    <Box pl="4rem">
      {/* OVERAL RATTING */}
      <Typography variant="reviewTitle">Overall Rating</Typography>

      <Grid container pt="1rem" pb="2rem" alignItems="center" spacing={1}>
        <Grid item>
          <StarIcon sx={{ color: palette.star.default, width: 55, height: 55 }} />
        </Grid>
        <Grid item>
          <Typography variant="star">
            {overallRating.toFixed(1)}
          </Typography>
        </Grid>
      </Grid>

      {/* RATING DISTRIBUTION */}
      <Box pb="2rem">
        <Typography variant="h2b">Ratings</Typography>

        <Grid container py="1rem" direction="column" spacing={3}>
          {[5, 4, 3, 2, 1, 0].map((rating) => (
            <Grid item key={rating}>
              <Grid container justifyContent="space-between" spacing={2}>
                <Grid item>
                  <Chip label={rating} variant="outlined" color="primary" />
                </Grid>
                <Grid item>
                  <Typography variant="h4b">{ratings[0] ? ratings[0].count : 0}</Typography>
                </Grid>
              </Grid>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Warning Dialogs */}
      <Dialogs open={defaultOpen} setOpen={setDefaultOpen} type="default" />
    </Box>
  )
};

export default OverallRating;
