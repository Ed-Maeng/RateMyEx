import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

// All Review Widgets
import LoadingComponent from "../../components/LoadingComponent";
import ClubWidget from "./ClubWidget";
import DormWidget from "./DormWidget";
import InternshipWidget from "./InternshipWidget";
import ProfessorWidget from "./ProfessorWidget";

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
      `http://localhost:4000/${reviewType}/reviews/${currentSection._id}`,
      {
        method: "GET",
      }
    );
    await new Promise(r => setTimeout(r, 500));

    const data = await response.json();
    setReviews(data);
    
    // After API call, set loading to false
    setLoading(false);
  };

  useEffect(() => {
    getReviews();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {/* LOADING */}
      {loading && <LoadingComponent />}
      
      {/* INTERNSHIP WIDGET */}
      {isInternship &&
        reviews?.map(
          ({
            _id,
            industry,
            jobTitle,
            term,
            employmentType,
            location,
            rating,
            comment,
            createdAt,
          }) => (
            <InternshipWidget
              key={_id}
              industry={industry}
              jobTitle={jobTitle}
              term={term}
              employmentType={employmentType}
              location={location}
              rating={rating}
              comment={comment}
              createdAt={createdAt}
            />
          )
        )
      }

      {/* DORM WIDGET */}
      {isDorm &&
        reviews?.map(
          ({
            _id,
            campus,
            rooms,
            rating,
            comment,
            imageUrls,
            createdAt,
          }) => (
            <DormWidget
              key={_id}
              campus={campus}
              rooms={rooms}
              rating={rating}
              comment={comment}
              imageUrls={imageUrls}
              createdAt={createdAt}
            />
          )
        )
      }

      {/* CLUB WIDGET */}
      {isClub &&
        reviews?.map(
          ({
            _id,
            category,
            term,
            rating,
            comment,
            imageUrls,
            createdAt,
          }) => (
            <ClubWidget
              key={_id}
              category={category}
              term={term}
              rating={rating}
              comment={comment}
              imageUrls={imageUrls}
              createdAt={createdAt}
            />
          )
        )
      }

      {/* PROFESSOR WIDGET */}
      {isProfessor &&
        reviews?.map(
          ({
            _id,
            className,
            term,
            rating,
            comment,
            imageUrls,
            createdAt,
          }) => (
            <ProfessorWidget
              key={_id}
              className={className}
              term={term}
              rating={rating}
              comment={comment}
              imageUrls={imageUrls}
              createdAt={createdAt}
            />
          )
        )
      }
    </>
  );
}

export default ReviewsWidget;
