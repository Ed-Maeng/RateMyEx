import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setReviews } from "../../state/auth";
import ReviewWidget from "./ReviewWidget";

const ReviewsWidget = ({ schoolId }) => {
  const dispatch = useDispatch();
  const reviews = useSelector((state) => state.reviews);
  const token = useSelector((state) => state.token);

  const getReviews = async () => {
    const response = await fetch(`http://localhost:4000/internship/${schoolId}`, {
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
      {reviews.map(
        ({
          _id,
          companyName, 
          role,
          location,
          rating,
          comment,
        }) => (
          <ReviewWidget
            key={_id}
            companyName={companyName}
            role={role}
            location={location}
            rating={rating}
            comment={comment}
          />
        )
      )}
    </>
  );
};

export default ReviewsWidget;
