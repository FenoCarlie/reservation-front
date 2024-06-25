import React, { useState, useEffect, useRef } from "react";
import moment from "moment";
import "moment/locale/fr";
import "moment/locale/en-gb";
import { useLanguage } from "../../contexts/LanguageContext";
import reviews from "../../assets/data/review.json";
import StarRating from "../common/StarRating";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

function ReviewsComponent() {
  const { currentLanguage } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef();

  const startAutoSlide = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      handleNext();
    }, 5000);
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : reviews.length - 1
    );
    startAutoSlide();
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex < reviews.length - 1 ? prevIndex + 1 : 0
    );
    startAutoSlide();
  };

  useEffect(() => {
    startAutoSlide();
    return () => clearInterval(intervalRef.current);
  }, []);

  const image =
    "./src/assets/images/homme-medecine-chirurgie-esthetique-dr-benouaiche-paris.jpg";

  const currentReview = reviews[currentIndex];

  return (
    <div className="relative w-full flex justify-center items-center h-[250px] xl:pl-28 lg:pl-24 md:pl-16 px-10">
      <section className="text-md w-full p-5 rounded font-barlow flex text-black flex-row">
        <img alt="" src={image} className="w-20 h-20 mr-3" />
        <span className="w-flex">
          <h3>{currentReview.name}</h3>
          <p>{currentReview.email}</p>
          <label className="stars flex flex-row my-2">
            <StarRating stars={currentReview.stars} />
          </label>
          <p className="pl-6">{currentReview.review}</p>
        </span>
      </section>
      <section className="flex absolute sm:w-auto w-full sm:flex-col flex-row right-0 p-2 top-[50%] -translate-y-[50%] h-24 justify-between">
        <button
          onClick={handlePrevious}
          className="bg-[#dc8977] mb-2 text-white xl:w-12 xl:h-11 md:w-10 md:h-9 w-8 h-7 rounded hover:bg-[#d87e6a] p-2 md:p-3"
        >
          <FaArrowLeft className="w-full h-full" />
        </button>
        <button
          onClick={handleNext}
          className="bg-[#4a4949] text-white xl:w-12 xl:h-11 md:w-10 md:h-9 w-8 h-7 rounded hover:bg-[#3d3d3d] p-2 md:p-3"
        >
          <FaArrowRight className="w-full h-full" />
        </button>
      </section>
    </div>
  );
}

export default ReviewsComponent;
