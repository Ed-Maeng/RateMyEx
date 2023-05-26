import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

// All Review Widgets
import ClubWidget from "./ClubWidget";
import DormWidget from "./DormWidget";
import InternshipWidget from "./InternshipWidget";
import ProfessorWidget from "./ProfessorWidget";
import LoadingComponent from "../../components/LoadingComponent";

const ReviewsWidget = () => {
  // State of Reviews & Current Section
  const currentSection = useSelector((state) => state.currentSection);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);

  // Types of Review Types
  const reviewType = useLocation().pathname.split("/")[2];
  const isInternship = reviewType === "internships";
  const isDorm = reviewType === "dorms";
  const isProfessor = reviewType === "professors";
  const isClub = reviewType === "clubs";

  const getReviews = async () => {
      // Before API call, set loading to true
    setLoading(true);
    const response = await fetch(
      `http://ratemyexschool.com:4000/${reviewType}/reviews/${currentSection._id}`,
      {
        method: "GET",
      }
    );
    await new Promise(r => setTimeout(r, 3000)); //TODO: For testing purposes - remove later

    const data = await response.json();
    console.log(data);
    setReviews(data);
    // After API call, set loading to false
    setLoading(false);
  };

  useEffect(() => {
    getReviews();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>{loading ? <LoadingComponent /> : <>
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
    </>}
    </>
  );
}

export default ReviewsWidget;
