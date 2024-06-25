import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const StarRating = ({ stars }) => {
  const fullStars = Math.floor(stars); // Number of full stars
  const halfStar = stars % 1 !== 0; // Check if there is a half star
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0); // Number of empty stars

  // Generate an array of star components with unique keys
  const starComponents = Array.from({ length: fullStars }, (_, index) => (
    <FaStar key={`full-${index}`} />
  ));
  if (halfStar) {
    starComponents.push(<FaStarHalfAlt key={`half`} />); // Add half star if applicable
  }
  starComponents.push(
    ...Array.from({ length: emptyStars }, (_, index) => (
      <FaRegStar key={`empty-${index}`} />
    ))
  );

  return <div className="flex flex-row">{starComponents}</div>;
};

export default StarRating;
