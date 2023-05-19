import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

// All Review Widgets
import ClubWidget from "./ClubWidget";
import DormWidget from "./DormWidget";
import InternshipWidget from "./InternshipWidget";
import ProfessorWidget from "./ProfessorWidget";

const ReviewsWidget = () => {
  // State of Reviews & Current Section
  const currentSection = useSelector((state) => state.currentSection);
  const [reviews, setReviews] = useState([]);

  // Types of Review Types
  const reviewType = useLocation().pathname.split("/")[2];
  const isInternship = reviewType === "internships";
  const isDorm = reviewType === "dorms";
  const isProfessor = reviewType === "professors";
  const isClub = reviewType === "clubs";

  const getReviews = async () => {
    const response = await fetch(
      `http://ec2-3-239-251-252.compute-1.amazonaws.com:4000/${reviewType}/reviews/${currentSection._id}`, 
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
            imageUrls,
          }) => (
            <InternshipWidget
              key={_id}
              role={role}
              location={location}
              rating={rating}
              comment={comment}
              imageUrls={imageUrls}
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
            imageUrls,
          }) => (
            <DormWidget
              key={_id}
              location={location}
              rating={rating}
              comment={comment}
              imageUrls={imageUrls}
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
            imageUrls
          }) => (
            <ProfessorWidget
              key={_id}
              className={className}
              location={location}
              rating={rating}
              comment={comment}
              imageUrls={imageUrls}
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
            imageUrls,
          }) => (
            <ClubWidget
              key={_id}
              rating={rating}
              comment={comment}
              imageUrls={imageUrls}
            />
          )
        )
      } 
    </>
  );
}

export default ReviewsWidget;
