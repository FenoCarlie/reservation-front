import React from "react";
import { useLanguage } from "../../contexts/LanguageContext";
import ReviewsComponent from "../../components/specific/ReviewsComponent";
import PostReview from "../../components/specific/PostReview";

function Reviews() {
  const { translate } = useLanguage();

  return (
    <div
      id="review"
      className="w-full flex flex-col items-center target h-auto"
    >
      <h1 className="text-8xl font-northwell mb-6">
        {translate(`pages.review`)}
      </h1>
      <span className="h-[1px] mb-5 bg-slate-500 w-[75vw]"></span>
      <section className="flex w-full flex-col md:flex-row">
        {" "}
        <ReviewsComponent />
        <PostReview />
      </section>
    </div>
  );
}

export default Reviews;
