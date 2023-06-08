import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentSection, setUser } from "../../state/auth";
// All Review Widgets
import LoadingComponent from "../../components/LoadingComponent";
import ClubWidget from "./ClubWidget";
import DormWidget from "./DormWidget";
import InternshipWidget from "./InternshipWidget";
import ProfessorWidget from "./ProfessorWidget";

const ReviewsWidget = () => {
  // State of Reviews & Current Section
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const currentSection = useSelector((state) => state.currentSection);
  const [reviews, setReviews] = useState([]);
  // Loading
  const [loading, setLoading] = useState(true);
  // Types of Review Types
  const reviewType = window.location.pathname.split("/")[2];
  const isInternship = reviewType === "internships";
  const isDorm = reviewType === "dorms";
  const isProfessor = reviewType === "professors";
  const isClub = reviewType === "clubs";
  const isProfile = window.location.pathname.split("/")[1] === "profile";
  // Check if it is in local or production
  const isLocal = window.location.href.split("/")[2] === "localhost:3000";

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
      await new Promise(r => setTimeout(r, 500));
      setLoading(false);
    };
    fetchData().catch(console.error);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>      
      {/* INTERNSHIP WIDGET */}
      {isInternship && (loading ? <LoadingComponent /> : reviews?.map((review) => <InternshipWidget key={review._id} review={review} />))}

      {/* DORM WIDGET */}
      {isDorm && (loading ? <LoadingComponent /> : reviews?.map((review) => <DormWidget key={review._id} review={review} />))}

      {/* CLUB WIDGET */}
      {isClub && (loading ? <LoadingComponent /> : reviews?.map((review) => <ClubWidget key={review._id} review={review} />))}

      {/* PROFESSOR WIDGET */}
      {isProfessor && (loading ? <LoadingComponent /> : reviews?.map((review) => <ProfessorWidget key={review._id} review={review} />))}

      {/* PROFILE WIDGET */}
      {isProfile && (loading ? <LoadingComponent /> : reviews?.map((review) => {
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
      }))}
    </>
  );
}

export default ReviewsWidget;
