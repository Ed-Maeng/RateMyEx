import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../state/auth";
// Components
import LoadingComponent from "../../components/LoadingComponent";
// All Review Widgets
import ClubWidget from "./ClubWidget";
import DormWidget from "./DormWidget";
import InternshipWidget from "./InternshipWidget";
import ProfessorWidget from "./ProfessorWidget";

const SavedReviewsWidget = () => {
  const dispatch = useDispatch();
  // State of User & Saved Reviews
  const user = useSelector((state) => state.user);
  const [reviews, setReviews] = useState([]);
  // Check if it is in local or production
  const isLocal = window.location.href.split("/")[2] === "localhost:3000";
  // Number of Show & Total Reviews
  // Loading & Display Width
  const [loading, setLoading] = useState(true);

  const getReview = async (_id, reviewType) => {
    const response = await fetch(
      isLocal ? `http://localhost:4000/${reviewType}/review/${_id}` : `https://api.ratemyexschool.com:8443/${reviewType}/review/${_id}`,
      {
        method: "GET",
      }
    );
    const data = await response.json();
    return data;
  };

  const getSavedReviews = async () => {
    const responseUser = await fetch(
      isLocal ? `http://localhost:4000/users/${user._id}` : `https://api.ratemyexschool.com:8443/users/${user._id}`,
      {
        method: "GET",
      }
    );
    const dataUser = await responseUser.json();
    dispatch(setUser({ user: dataUser }));

    Object.entries(user.savedReviews)?.map(async ([key, value]) => {
      const review = await getReview(key, value);
      setReviews(savedReviews => [...savedReviews, review]);
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      getSavedReviews();
      await new Promise(r => setTimeout(r, 500));
      setLoading(false);
    };
    fetchData().catch(console.error);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {loading ? <LoadingComponent /> :
      <>
        <Box display="flex" width="70%" justifyContent="center">
          <Box flexBasis="80%">
            {/* TOTAL NUMBER OF REVIEWS */}
            <Typography
              variant="reviewTitle"
              pl="1rem"
            >
              {"Browse " + reviews.length + " Reviews"}
            </Typography>

            {/* SAVED REVIEWS */}
            {reviews?.map((review) => {
              if (!review) {
                console.log("No Review in SavedReviewsWidget");
                return null;
              } else if (review.hasOwnProperty("internshipId")) {
                return (<InternshipWidget key={review._id} review={review} />)
              } else if (review.hasOwnProperty("dormId")) {
                return (<DormWidget key={review._id} review={review} />)
              } else if (review.hasOwnProperty("clubId")) {
                return (<ClubWidget key={review._id} review={review} />)
              } else if (review.hasOwnProperty("professorId")) {
                return (<ProfessorWidget key={review._id} review={review} />)
              } else {
                /* TODO: Figure out a better way to handle error cases */
                console.log("No ID Property in SavedReviewsWidget");
                return null;
              }})
            }
          </Box>
        </Box>
      </>
    }
    </>
  )
}

export default SavedReviewsWidget;
