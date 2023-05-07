import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setReviews } from "../../state/auth";

// All Review Widgets
import ClubWidget from "./ClubWidget";
import DormWidget from "./DormWidget";
import InternshipWidget from "./InternshipWidget";
import ProfessorWidget from "./ProfessorWidget";

const ReviewsWidget = ({ schoolId, page }) => {
  const dispatch = useDispatch();
  const reviews = useSelector((state) => state.reviews);
  const token = useSelector((state) => state.token);

  // All Page Types
  const isInternship = page === "internship";
  const isDorm = page === "dorm";
  const isProfessor = page === "professor";
  const isClub = page === "club";

  const getReviews = async () => {
    const response = await fetch(`http://localhost:4000/${page}/${schoolId}`, {
      method: "GET",
    });

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
            name, 
            role,
            location,
            rating,
            comment,
          }) => (
            <InternshipWidget
              key={_id}
              name={name}
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
            name, 
            location,
            rating,
            comment,
          }) => (
            <DormWidget
              key={_id}
              name={name}
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
            name,
            className,
            location,
            rating,
            comment,
          }) => (
            <ProfessorWidget
              key={_id}
              name={name}
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
            name,
            rating,
            comment,
          }) => (
            <ClubWidget
              key={_id}
              name={name}
              rating={rating}
              comment={comment}
            />
          )
        )
      } 
    </>
  );
};

export default ReviewsWidget;
