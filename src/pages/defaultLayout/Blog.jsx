import React from "react";
import { useLanguage } from "../../contexts/LanguageContext";

function Blog() {
  const { translate } = useLanguage();
  return (
    <div
      id="blog"
      className="w-full mt-10 xl:px-28 lg:px-24 md:px-16 px-10 flex items-center flex-col h-auto target"
    >
      <h1 className="text-8xl font-northwell mb-6">
        {translate(`pages.blog`)}
      </h1>
      <span className="h-[1px] mb-5 bg-slate-500 w-[75vw]"></span>
      <section className="w-full"></section>
    </div>
  );
}

export default Blog;
