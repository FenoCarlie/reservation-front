import MenuTabs from "../../components/specific/MenuTabs";
import { useLanguage } from "../../contexts/LanguageContext";
import PhotoGrid from "../../components/specific/PhotoGrid";

function Menu() {
  const { translate } = useLanguage();
  return (
    <div
      id="menu"
      className="w-full mt-10 xl:px-28 lg:px-24 md:px-16 px-10 flex items-center flex-col h-auto target"
    >
      <h1 className="text-8xl font-northwell mb-6">
        {translate(`pages.menu`)}
      </h1>
      <span className="h-[1px] mb-5 bg-slate-500 w-[75vw]"></span>
      <div className="w-full lg:flex-row flex  flex-col h-full">
        <section className="lg:w-[45%] w-full">
          <PhotoGrid />
        </section>
        <section className="lg:w-[55%] w-full flex items-start">
          <MenuTabs />
        </section>
      </div>
    </div>
  );
}

export default Menu;
