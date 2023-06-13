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

const OverallRating = () => {
  const { palette } = useTheme();
  // Types of Review Types
  const reviewType = window.location.pathname.split("/")[2];
  // State of Current Section & Overall Rating
  const currentSection = useSelector((state) => state.currentSection);
  const overallRating = (currentSection.totalReviews > 0) ? (currentSection.totalRatings * 1.0 / currentSection.totalReviews) : 0;
  // Check if it is in local or production
  const isLocal = window.location.href.split("/")[2] === "localhost:3000";
  // Review Data & Key
  const [reviewsDataKey, setReviewsDataKey] = useState([]);
  const [reviewsData, setReviewsData] = useState([]);

  const getReviewsData = async () => {
    const response = await fetch(
      isLocal ? `http://localhost:4000/${reviewType}/reviewsData/${currentSection._id}` 
      : `https://api.ratemyexschool.com:8443/${reviewType}/reviewsData/${currentSection._id}`,
      {
        method: "GET",
      }
    );
    const data = await response.json();
    setReviewsDataKey(Object.keys(data));
    setReviewsData(data);
  };

  useEffect(() => {
    getReviewsData();
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

      {/* REVIEWS DATA (PT 1) */}
      <Box pb="2rem">
        <Typography variant="h2b">{reviewsDataKey[0]}</Typography>

        <Grid container py="1rem" direction="column" spacing={3}>
          {reviewsData[reviewsDataKey[0]]?.map((data) => (
            <Grid item key={data._id}>
              <Grid container justifyContent="space-between" spacing={2}>
                <Grid item>
                  <Chip label={data._id} variant="outlined" color="primary" />
                </Grid>
                <Grid item>
                  <Typography variant="h4b">{data.count}</Typography>
                </Grid>
              </Grid>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* REVIEWS DATA (PT 2) */}
      <Box>
        <Typography variant="h2b">{reviewsDataKey[1]}</Typography>

        <Grid container py="1rem" direction="column" spacing={3}>
          {reviewsData[reviewsDataKey[1]]?.map((data) => (
            <Grid item key={data._id}>
              <Grid container justifyContent="space-between" spacing={2}>
                <Grid item>
                  <Chip label={data._id ? data._id : "Other"} variant="outlined" color="primary" />
                </Grid>
                <Grid item>
                  <Typography variant="h4b">{data.count}</Typography>
                </Grid>
              </Grid>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  )
};

export default OverallRating;
