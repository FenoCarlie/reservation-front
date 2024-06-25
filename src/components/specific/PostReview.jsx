import { useRef, useState } from "react";
import { useLanguage } from "../../contexts/LanguageContext";
import InteractiveStarRating from "./InteractiveStarRating";

function PostReview() {
  const { translate } = useLanguage();
  const field = useRef();

  const [rating, setRating] = useState(0);

  const handleRatingChange = (value) => {
    setRating(value);
  };

  const postReview = async (event) => {
    event.preventDefault();

    const payload = {
      name: field.current.name.value,
      mail: field.current.mail.value,
      stars: rating,
      review: field.current.review.value,
    };
  };

  return (
    <form
      ref={field}
      onSubmit={postReview}
      className="relative w-full mt-10 xl:px-28 lg:px-24 md:px-16 px-10 items-center justify-center flex flex-col h-auto"
    >
      <section className="mb-6 h-auto flex flex-col md:flex-row w-full">
        <input
          placeholder={translate(`information.name`)}
          type="text"
          id="name"
          name="name"
          required
          className="py px-2 mb-6 md:mb-0 md:mr-3 border-b-[1px] border-[#4e5b6dbd] w-full"
        />

        <input
          placeholder={translate(`information.mail`)}
          type="mail"
          id="mail"
          name="mail"
          required
          className="py px-2 border-b-[1px] border-[#4e5b6dbd] w-full"
        />
      </section>
      <section className="mb-6 h-auto flex flex-col md:flex-row w-full">
        <InteractiveStarRating stars={rating} onChange={handleRatingChange} />
      </section>
      <section className="h-auto flex flex-col md:flex-row w-full mb-20">
        <textarea
          placeholder={translate(`information.review`)}
          id="review"
          name="review"
          className="py px-2 border-b-[1px] border-[#4e5b6dbd] w-full max-h-[75px] resize-none"
        />
      </section>
      <button
        type="submit"
        className="absolute bottom-0 xl:right-28 lg:right-24 md:right-16 right-10 text-lg py border-b-[1px] border-[#4e5b6dbd]"
      >
        {translate(`button.booking`)}
      </button>
    </form>
  );
}

export default PostReview;
