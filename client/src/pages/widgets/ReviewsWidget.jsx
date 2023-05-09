import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { setReviews } from "../../state/auth";

// All Review Widgets
import ClubWidget from "./ClubWidget";
import DormWidget from "./DormWidget";
import InternshipWidget from "./InternshipWidget";
import ProfessorWidget from "./ProfessorWidget";

const ReviewsWidget = () => {
  const reviews = useSelector((state) => state.reviews);
  const reviewSection = useSelector((state) => state.reviewSection);
  const token = useSelector((state) => state.token);
  const dispatch = useDispatch();
  const location = useLocation();

  // All Page Types
  const reviewType = location.pathname.split("/")[1]
  const isInternship = reviewType === "internships";
  const isDorm = reviewType === "dorms";
  const isProfessor = reviewType === "professors";
  const isClub = reviewType === "clubs";

  const getReviews = async () => {
    const response = await fetch(
      `http://localhost:4000/${reviewType}/reviews/${reviewSection._id}`, 
      {
        method: "GET",
      }
    );

    const data = await response.json();
    dispatch(setReviews({ reviews: data }));
  };

  useEffect(() => {
    getReviews();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {/* INTERNSHIP WIDGET */}
      {isInternship &&
        reviews.map(
          ({
            _id,
            role,
            location,
            rating,
            comment,
          }) => (
            <InternshipWidget
              key={_id}
              role={role}
              location={location}
              rating={rating}
              comment={comment}
            />
          )
        )
      }
      
      {/* DORM WIDGET */}
      {isDorm &&
        reviews.map(
          ({
            _id,
            location,
            rating,
            comment,
          }) => (
            <DormWidget
              key={_id}
              location={location}
              rating={rating}
              comment={comment}
            />
          )
        )
      }

      {/* PROFESSOR WIDGET */}
      {isProfessor &&
        reviews.map(
          ({
            _id,
            className,
            location,
            rating,
            comment,
          }) => (
            <ProfessorWidget
              key={_id}
              className={className}
              location={location}
              rating={rating}
              comment={comment}
            />
          )
        )
      }

      {/* CLUB WIDGET */}  
      {isClub &&
        reviews.map(
          ({
            _id,
            rating,
            comment,
          }) => (
            <ClubWidget
              key={_id}
              rating={rating}
              comment={comment}
            />
          )
        )
      } 
    </>
  );
}

export default ReviewsWidget;
