import React from "react";
import { useLanguage } from "../../contexts/LanguageContext";
import { flag } from "../../assets/images/CountryFlag/CountryFlag";

const LanguageSwitcher = ({ setSelectLanguageIsOpen }) => {
  const { changeLanguage } = useLanguage();

  const handleChangeLanguage = (language) => {
    changeLanguage(language);
    setSelectLanguageIsOpen(false); // Close the language selection menu
  };

  return (
    <div className="font-barlow text-lg">
      <button
        className="flex flex-row items-center mb-2 py-3"
        onClick={() => handleChangeLanguage("En")}
      >
        <img alt="En" src={`${flag.Britain}`} className="w-6 h-6 mr-3" />
        <label>English</label>
      </button>
      <button
        onClick={() => handleChangeLanguage("Fr")}
        className="flex flex-row items-center mb-2 py-3"
      >
        <img alt="Fr" src={`${flag.Françe}`} className="w-6 h-6 mr-3" />
        <label>Français</label>
      </button>
    </div>
  );
};

export default LanguageSwitcher;
