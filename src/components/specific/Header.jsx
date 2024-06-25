import { useEffect, useState } from "react";
import LanguageSwitcher from "./LanguageSwitcher";
import NavBar from "./NavBar";
import { RiMenu2Fill, RiCloseLargeFill } from "react-icons/ri";
import { useLanguage } from "../../contexts/LanguageContext";

function Header() {
  const { currentLanguage } = useLanguage();
  const [selectLanguageIsOpen, setSelectLanguageIsOpen] = useState(false);
  const [sideMenuIsOpen, setSideMenuIsOpen] = useState(false);
  const phoneNumber = "+33745432031";

  // Function to open and close language switcher
  const selectLanguageAction = () => {
    if (sideMenuIsOpen) {
      setSideMenuIsOpen(false);
    }
    setSelectLanguageIsOpen(!selectLanguageIsOpen);
  };

  // Function to open and close side menu
  const sideMenuAction = () => {
    if (selectLanguageIsOpen) {
      setSelectLanguageIsOpen(false);
    }
    setSideMenuIsOpen(!sideMenuIsOpen);
  };

  useEffect(() => {
    let defaultLayout = document.getElementById("defaultLayout");
    let home = document.getElementById("home");
    let homeOffsetHeight = home.offsetHeight;
    let header = document.getElementById("header");
    let headerHeight = header.offsetHeight;
    let height = homeOffsetHeight - headerHeight;

    const handleScroll = () => {
      let defaultLayoutScrollTop = defaultLayout.scrollTop;
      if (headerHeight < defaultLayoutScrollTop) {
        header.classList.remove("headerOnTop");
        header.classList.add("headerOnScroll");
      } else {
        header.classList.remove("headerOnScroll");
        header.classList.add("headerOnTop");
      }
    };

    // Add the scroll event listener to the default layout
    defaultLayout.addEventListener("scroll", handleScroll);

    // Cleanup function to remove the scroll event listener
    return () => {
      defaultLayout.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      id="header"
      className="w-full h-14 xl:px-28 lg:px-24 md:px-16 px-10 flex flex-row justify-between items-center headerOnTop "
    >
      <span className="hidden lg:flex font-northwell text-4xl mt-4 ">
        Les Saveurs Enchantées
      </span>
      <button className="flex lg:hidden" onClick={sideMenuAction}>
        {!sideMenuIsOpen ? (
          <RiMenu2Fill className="w-8 h-8" />
        ) : (
          <RiCloseLargeFill className="w-8 h-8" />
        )}
      </button>
      <section className="lg:flex hidden">
        <NavBar />
      </section>
      <section className="flex flex-row items-center">
        <a
          href={`tel:${phoneNumber}`}
          className="hidden md:flex mr-3 font-barlow text-xl"
        >
          +33 7 45 43 20 31
        </a>
        <span className="w-[2px] bg-slate-500 h-[30px] mr-2 hidden md:flex"></span>
        <button
          className="font-barlow text-lg flex flex-row items-center"
          onClick={selectLanguageAction}
        >
          <span>{currentLanguage}</span>
        </button>
      </section>
      {selectLanguageIsOpen && (
        <div className="absolute z-10 h-screen bottom-0 pl-[40px] bg-white text-black right-0 top-14 w-full md:w-[25vw]">
          <LanguageSwitcher setSelectLanguageIsOpen={setSelectLanguageIsOpen} />
        </div>
      )}
      {sideMenuIsOpen && (
        <div className="absolute z-10 h-screen bottom-0  bg-white text-black left-0 top-14 w-full md:w-[25vw] md:hidden items-center flex flex-col">
          <span className="md:flex font-northwell text-4xl mt-4">
            Les Saveurs Enchantées
          </span>
          <span className="h-[1px] mt-2 bg-slate-500 w-[75vw]"></span>
          <section className="mt-10 pl-[40px] w-full">
            <NavBar setSideMenuIsOpen={setSideMenuIsOpen} />
          </section>
          <a
            href={`tel:${phoneNumber}`}
            className="mt-20 md:flex mr-3 font-barlow text-xl"
          >
            +33 7 45 43 20 31
          </a>
          <span className="h-[1px] mt-2 bg-slate-500 w-[75px]"></span>
        </div>
      )}
    </div>
  );
}

export default Header;
