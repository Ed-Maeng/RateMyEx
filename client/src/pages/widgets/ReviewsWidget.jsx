import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

// All Review Widgets
import ClubWidget from "./ClubWidget";
import DormWidget from "./DormWidget";
import InternshipWidget from "./InternshipWidget";
import ProfessorWidget from "./ProfessorWidget";

const ReviewsWidget = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  // State of Token, Reviews & Current Section
  const token = useSelector((state) => state.token);
  const currentSection = useSelector((state) => state.currentSection);
  const [reviews, setReviews] = useState([]);

  // Types of Reviews
  const reviewType = location.pathname.split("/")[1]
  const isInternship = reviewType === "internships";
  const isDorm = reviewType === "dorms";
  const isProfessor = reviewType === "professors";
  const isClub = reviewType === "clubs";

  const getReviews = async () => {
    const response = await fetch(
      `http://localhost:4000/${reviewType}/reviews/${currentSection._id}`, 
      {
        method: "GET",
      }
    );

    const data = await response.json();
    setReviews(data);
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
