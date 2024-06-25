import React, { useRef } from "react";
import { useLanguage } from "../../contexts/LanguageContext";

function Message({ className }) {
  const { translate } = useLanguage();
  const field = useRef();

  const postMessage = async (event) => {};
  return (
    <form
      ref={field}
      onSubmit={postMessage}
      className={`relative mt-10 md:w-[60%] lg:w-[50%] xl:w-[40%] w-full items-center justify-center flex flex-col h-auto ${className}`}
    >
      <section className="mb-6 h-auto flex flex-col md:flex-row w-full">
        <input
          placeholder={translate(`information.name`)}
          type="text"
          id="name"
          name="name"
          required
          className="py px-2 mb-6 md:mb-0 md:mr-3 border-b-[1px] border-[#4e5b6dbd] w-full bg-transparent"
        />

        <input
          placeholder={translate(`information.mail`)}
          type="mail"
          id="mail"
          name="mail"
          required
          className="py px-2 border-b-[1px] border-[#4e5b6dbd] w-full bg-transparent"
        />
      </section>
      <section className="mb-6 h-auto flex flex-col md:flex-row w-full">
        <input
          placeholder={translate(`information.phone`)}
          type="number"
          id="contact"
          name="contact"
          maxLength={10}
          required
          className="py px-2 mb-6 md:mb-0 md:mr-3 border-b-[1px] border-[#4e5b6dbd] w-full bg-transparent"
        />

        <input
          placeholder={translate(`information.object`)}
          type="mail"
          id="object"
          name="object"
          required
          className="py px-2 border-b-[1px] border-[#4e5b6dbd] w-full bg-transparent"
        />
      </section>
      <section className="h-auto flex flex-col md:flex-row w-full mb-20">
        <textarea
          placeholder={translate(`information.message`)}
          id="message"
          name="message"
          required
          className="py px-2 border-b-[1px] border-[#4e5b6dbd] w-full h-[100px] resize-none bg-transparent"
        />
      </section>
      <button
        type="submit"
        className="absolute bottom-0 right-0 text-lg py border-b-[1px] border-[#4e5b6dbd]"
      >
        {translate(`button.send`)}
      </button>
    </form>
  );
}

export default Message;
