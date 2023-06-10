import { Box, Button, Typography, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentSection, setUser } from "../../state/auth";
// All Review Widgets
import LoadingComponent from "../../components/LoadingComponent";
import FlexBetween from "../../components/wrappers/FlexBetween";
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
  // Types of Review Types
  const reviewType = window.location.pathname.split("/")[2];
  const isInternship = reviewType === "internships";
  const isDorm = reviewType === "dorms";
  const isProfessor = reviewType === "professors";
  const isClub = reviewType === "clubs";
  const isProfile = window.location.pathname.split("/")[1] === "profile";
  // Check if it is in local or production
  const isLocal = window.location.href.split("/")[2] === "localhost:3000";
  // Number of Show Reviews
  const [showReviews, setShowReviews] = useState((currentSection.totalReviews <= 10) ? currentSection.totalReviews : 10);
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
    const dataReviews = await responseReviews.json();
    setReviews(dataReviews);

    const responseCurrentSection = await fetch(
      isLocal ? `http://localhost:4000/${reviewType}/section/${currentSection._id}` 
      : `https://api.ratemyexschool.com:8443/${reviewType}/section/${currentSection._id}`,
      {
        method: "GET",
      }
    );
    const dataCurrentSection = await responseCurrentSection.json();
    dispatch(setCurrentSection({ currentSection: dataCurrentSection }));
  };

  const getUserReviews = async () => {
    const response = await fetch(
      isLocal ? `http://localhost:4000/users/reviews/${user._id}`
      : `https://api.ratemyexschool.com:8443/users/reviews/${user._id}`,
      {
        method: "GET",
      }
    );
    const data = await response.json();
    setReviews(data);

    const responseUser = await fetch(
      isLocal ? `http://localhost:4000/users/${user._id}` : `https://api.ratemyexschool.com:8443/users/${user._id}`,
      {
        method: "GET",
      }
    );
    const dataUser = await responseUser.json();
    dispatch(setUser({ user: dataUser }));
  };

  useEffect(() => {
    const fetchData = async () => {
      isProfile ? getUserReviews() : getReviews();
      setShowReviews((currentSection.totalReviews <= 10) ? currentSection.totalReviews : 10);
      await new Promise(r => setTimeout(r, 500));
      setLoading(false);
    };
    fetchData().catch(console.error);
  }, [currentSection.totalReviews]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
    {loading ? <LoadingComponent /> :
      <>
        <Box width="100%" display={"flex"}>
          <Box m="auto" flexBasis={"60%"}>
            {/* TOTAL NUMBER OF REVIEWS */}
            <Typography
              variant="h1b"
              pl="1rem"
              color={palette.neutral.dark}
            >
              {"All " + (isProfile ? reviews.length : currentSection.totalReviews) + " reviews"}
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
              reviews?.map((review) => {
                if (review.hasOwnProperty("internshipId")) {
                  return (<InternshipWidget key={review._id} review={review} />)
                } else if (review.hasOwnProperty("dormId")) {
                  return (<DormWidget key={review._id} review={review} />)
                } else if (review.hasOwnProperty("clubId")) {
                  return (<ClubWidget key={review._id} review={review} />)
                } else if (review.hasOwnProperty("professorId")) {
                  return (<ProfessorWidget key={review._id} review={review} />)
                } else {
                  /* TODO: Figure out a better way to handle error cases */
                  console.log("No ID Property in ReviewsWidget")
                  return null;
                }
              })
            }

            {/* Load Button */}
            {!isProfile && (showReviews > 0) &&
              <FlexBetween px="1rem" pt="0.5rem" pb="2rem">
                {/* NUMBER OF SHOWING REVIEWS */}
                <Typography
                  variant="h3b"
                  color={palette.neutral.dark}
                >
                  {"Showing " + showReviews + " of " + currentSection.totalReviews + " reviews"}
                </Typography>
                {/* LOADING BUTTON */}
                {(showReviews < currentSection.totalReviews) &&
                  <Button
                    variant="contained"
                    onClick={() => setShowReviews(
                      ((currentSection.totalReviews - showReviews) < 10) ? showReviews + currentSection.totalReviews - showReviews : showReviews + 10)
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
            }
          </Box>
        </Box>        
      </>
      }
    </>
  );
}

export default ReviewsWidget;
