import React, { useState } from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const InteractiveStarRating = ({ stars, onChange }) => {
  const [rating, setRating] = useState(stars);

  const handleRating = (value) => {
    setRating(value);
    onChange(value);
  };

  return (
    <div className="flex flex-row">
      {[1, 2, 3, 4, 5].map((value) => (
        <span
          key={value}
          className="cursor-pointer"
          onClick={() => handleRating(value)}
          onMouseEnter={() => setRating(value)}
          onMouseLeave={() => setRating(stars)}
        >
          {rating >= value ? (
            <FaStar />
          ) : rating >= value - 0.5 ? (
            <FaStarHalfAlt />
          ) : (
            <FaRegStar />
          )}
        </span>
      ))}
    </div>
  );
};

export default InteractiveStarRating;
