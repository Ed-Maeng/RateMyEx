import { Box, Button, Grid, Typography, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentSection, setUser } from "../../state/auth";
// Components
import LoadingComponent from "../../components/LoadingComponent";
import OverallRating from "../../components/OverallRating";
import FlexBetween from "../../components/wrappers/FlexBetween";
// All Review Widgets
import Dialogs from "../../components/dialogs/Dialogs";
import ClubWidget from "./ClubWidget";
import DormWidget from "./DormWidget";
import InternshipWidget from "./InternshipWidget";
import ProfessorWidget from "./ProfessorWidget";

const ReviewsWidget = () => {
  const { palette } = useTheme();
  const dispatch = useDispatch();
  // State of Reviews & Current Section
  const user = useSelector((state) => state.user);
  const currentSection = useSelector((state) => state.currentSection);
  const [reviews, setReviews] = useState([]);
  // Types of Review
  const reviewType = window.location.pathname.split("/")[2];
  const isInternship = reviewType === "internships";
  const isDorm = reviewType === "dorms";
  const isProfessor = reviewType === "professors";
  const isClub = reviewType === "clubs";
  const isProfile = window.location.pathname.split("/")[1] === "profile";
  // Check if it is in local or production
  const isLocal = window.location.href.split("/")[2] === "localhost:3000";
  // Number of Show & Total Reviews
  const [showReviews, setShowReviews] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);
  // Types of Open Dialogs
  const [defaultOpen, setDefaultOpen] = useState(false);
  // Loading & Display Width
  const [loading, setLoading] = useState(true);

  const getReviews = async () => {
    const responseReviews = await fetch(
      isLocal ? `http://localhost:4000/${reviewType}/reviews/${currentSection._id}` 
      : `https://api.ratemyexschool.com:8443/${reviewType}/reviews/${currentSection._id}`,
      {
        method: "GET",
      }
    );
    
    if (responseReviews.ok) {
      const dataReviews = await responseReviews.json();
      setReviews(dataReviews);
    } else {
      console.log("Response Issue in ReviewsWidget in getReviews");
      setDefaultOpen(true);
    }

    const responseCurrentSection = await fetch(
      isLocal ? `http://localhost:4000/${reviewType}/section/${currentSection._id}` 
      : `https://api.ratemyexschool.com:8443/${reviewType}/section/${currentSection._id}`,
      {
        method: "GET",
      }
    );
    
    if (responseCurrentSection.ok) {
      const dataCurrentSection = await responseCurrentSection.json();
      dispatch(setCurrentSection({ currentSection: dataCurrentSection }));
      setTotalReviews(dataCurrentSection.totalReviews);
    } else {
      console.log("Response Issue in ReviewsWidget in getReviews");
      setDefaultOpen(true);
    }
  };

  const getUserReviews = async () => {
    const response = await fetch(
      isLocal ? `http://localhost:4000/users/reviews/${user._id}`
      : `https://api.ratemyexschool.com:8443/users/reviews/${user._id}`,
      {
        method: "GET",
      }
    );
    
    if (response.ok) {
      const data = await response.json();
      setReviews(data);
    } else {
      console.log("Response Issue in ReviewsWidget in getUserReviews");
      setDefaultOpen(true);
    }

    const responseUser = await fetch(
      isLocal ? `http://localhost:4000/users/${user._id}` : `https://api.ratemyexschool.com:8443/users/${user._id}`,
      {
        method: "GET",
      }
    );
    
    if (responseUser.ok) {
      const dataUser = await responseUser.json();
      dispatch(setUser({ user: dataUser }));
      setTotalReviews(dataUser.numberOfReviews);
    } else {
      console.log("Response Issue in ReviewsWidget in getUserReviews");
      setDefaultOpen(true);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      isProfile ? getUserReviews() : getReviews();
      setShowReviews((totalReviews <= 10) ? totalReviews : 10);
      await new Promise(r => setTimeout(r, 500));
      setLoading(false);
    };
    fetchData().catch(console.error);
  }, [totalReviews]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {loading ? <LoadingComponent /> :
      <>
        {(showReviews < 1) ?
          <Grid container direction="column" pt="2rem" alignItems="center" justifyContent="center">
            <Grid item pb="1rem">
              <Typography variant="h1b">
                People haven't wrote any reviews yet
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="h2b">
                Be the first one to write a review!
              </Typography>
            </Grid>
          </Grid>
          :
          <>
            {/* OVERALL RATING */}
            {!isProfile && <OverallRating />}

            <Box display="flex" width="70%" justifyContent="center">
              <Box flexBasis="80%">
                {/* TOTAL NUMBER OF REVIEWS */}
                <Typography
                  variant="reviewTitle"
                  pl="1rem"
                >
                  {"Browse " + totalReviews + " Reviews"}
                </Typography>

                {/* INTERNSHIP WIDGET */}
                {isInternship && reviews.slice(0, showReviews)?.map((review) => <InternshipWidget key={review._id} review={review} />)}

                {/* DORM WIDGET */}
                {isDorm && reviews.slice(0, showReviews)?.map((review) => <DormWidget key={review._id} review={review} />)}

                {/* CLUB WIDGET */}
                {isClub && reviews.slice(0, showReviews)?.map((review) => <ClubWidget key={review._id} review={review} />)}

                {/* PROFESSOR WIDGET */}
                {isProfessor && reviews.slice(0, showReviews)?.map((review) => <ProfessorWidget key={review._id} review={review} />)}

                {/* PROFILE WIDGET */}
                {isProfile && 
                  reviews.slice(0, showReviews)?.map((review) => {
                    if (!review) {
                      setDefaultOpen(true);
                      console.log("No Review in ReviewsWidget");
                      return null;
                    } if (review.hasOwnProperty("internshipId")) {
                      return (<InternshipWidget key={review._id} review={review} />)
                    } else if (review.hasOwnProperty("dormId")) {
                      return (<DormWidget key={review._id} review={review} />)
                    } else if (review.hasOwnProperty("clubId")) {
                      return (<ClubWidget key={review._id} review={review} />)
                    } else if (review.hasOwnProperty("professorId")) {
                      return (<ProfessorWidget key={review._id} review={review} />)
                    } else {
                      setDefaultOpen(true);
                      console.log("No ID Property in ReviewsWidget");
                      return null;
                    }
                  })
                }

                {/* Load Button */}       
                <FlexBetween px="1rem" pt="0.5rem" pb="2rem">
                  {/* NUMBER OF SHOWING REVIEWS */}
                  <Typography
                    variant="h3b"
                    color={palette.neutral.dark}
                  >
                    {"Showing " + showReviews + " of " + totalReviews + " reviews"}
                  </Typography>
                  {/* LOADING BUTTON */}
                  {(showReviews < totalReviews) &&
                    <Button
                      variant="contained"
                      onClick={() => setShowReviews(
                        ((totalReviews - showReviews) < 10) ? showReviews + totalReviews - showReviews : showReviews + 10)
                      }
                      sx={{
                        bgcolor: palette.button.default,
                        width: "110px",
                        height: "35px",
                        "&:hover": {
                          bgcolor: palette.button.alt
                        }
                      }}
                    >
                      <Typography variant="h6b">
                        Load More
                      </Typography>
                    </Button>
                  }
                </FlexBetween>
              </Box>
            </Box>
          </>
        }
      </>
      }

      {/* Warning Dialogs */}
      <Dialogs open={defaultOpen} setOpen={setDefaultOpen} type="default" />
    </>
  );
}

export default ReviewsWidget;
