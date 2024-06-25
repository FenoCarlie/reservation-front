import { useState, useEffect } from "react";
import reviewsData from "../../assets/data/review.json";
import StarRating from "../common/StarRating";

function ReviewAnimated() {
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0); // State to keep track of the current review index
  const [animationClass, setAnimationClass] = useState("fade-in"); // State to manage the animation class for fading effects

  useEffect(() => {
    // useEffect to handle the automatic switching of reviews
    const interval = setInterval(() => {
      setAnimationClass("fade-out"); // Set class to fade-out for the disappearing effect
      setTimeout(() => {
        // Wait for fade-out effect to complete before switching to the next review
        setCurrentReviewIndex(
          (prevIndex) => (prevIndex + 1) % reviewsData.length
        );
        setAnimationClass("fade-in"); // Set class to fade-in for the appearing effect
      }, 1000); // Duration of the fade-out effect
    }, 6000); // 5 seconds of visibility + 1 second of fade-out effect

    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, []);

  const currentReview = reviewsData[currentReviewIndex]; // Get the current review data based on the index

  // Function to render the star rating

  return (
    <div
      className={`review ${animationClass} text-2xl font-barlow text-[#c4c5c7]`}
    >
      <h3>{currentReview.name}</h3>
      <p>{currentReview.email}</p>
      <div className="pl-6 py-2">
        <StarRating stars={currentReview.stars} />
      </div>
      <p className="pl-6">{currentReview.review}</p>
    </div>
  );
}

export default ReviewAnimated;
