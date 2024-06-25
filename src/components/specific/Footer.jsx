import { Link } from "react-router-dom";
import { useLanguage } from "../../contexts/LanguageContext";
import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import Message from "./Message";
import { FaFacebook, FaLinkedin, FaPhoneAlt } from "react-icons/fa";
import { FaXTwitter, FaInstagram } from "react-icons/fa6";
import { IoIosMail } from "react-icons/io";

function Footer() {
  const { translate } = useLanguage();
  const [hideField, setHideField] = useState(false);
  const phoneNumber = "+33745432031";

  const toggleHideField = () => {
    setHideField((prevState) => !prevState);
  };

  const socialNetwork = [
    {
      name: "Facebook",
      link: "#",
      icon: <FaFacebook className="w-6 h-6" />,
    },
    {
      name: "Twitter",
      link: "#",
      icon: <FaXTwitter className="w-6 h-6" />,
    },
    {
      name: "Linkedin",
      link: "#",
      icon: <FaLinkedin className="w-6 h-6" />,
    },
    {
      name: "Instagram",
      link: "#",
      icon: <FaInstagram className="w-6 h-6" />,
    },
  ];

  return (
    <div
      id="footer"
      className="w-full mt-10 flex items-center flex-col h-auto bg-[#1d1d1d] font-barlow"
    >
      <section className="flex flex-row mt-10">
        {socialNetwork.map((socialNetwork) => (
          <a
            key={socialNetwork.name}
            href={socialNetwork.link}
            className="p-2 rounded-full text-white "
          >
            {socialNetwork.icon}
          </a>
        ))}
      </section>
      <section className="flex  md:flex-row flex-col mt-10 text-white">
        <label className="flex flex-row items-center justify-center md:mr-10 md:mb-0 mb-2">
          <FaPhoneAlt className="md:w-6 md:h-6 w-4 h-4 mr-2" />
          <a href={`tel:${phoneNumber}`}>+33 7 45 43 20 31</a>
        </label>
        <label className="flex flex-row items-center justify-center">
          <IoIosMail className="md:w-7 md:h-7 w-5 h-5 mr-2" />
          <label>LesSaveursEnchantées@gmail.com</label>
        </label>
      </section>
      <section className="text-white mt-5 w-full flex flex-col xl:px-28 lg:px-24 md:px-16 px-10 py-10 items-center">
        <h1
          onClick={toggleHideField}
          className="text-lg py border-b-[1px] border-[#4e5b6dbd]"
        >
          {translate(`message`)}
        </h1>
        <label className="animate-bounce rounded-full p-2 cursor-pointer mt-2">
          <FaChevronDown className="w-6 h-6" />
        </label>
        {hideField && <Message className="slide-down" />}
      </section>
      <section className="w-full h-18 py-5 xl:px-28 lg:px-24 md:px-16 px-10 bg-[#bc1818] flex flex-row justify-between text-white ">
        <p>&copy; 2024 VNB-IT. All rights reserved.</p>
        <Link to="/auth/login">Admin access</Link>
      </section>
    </div>
  );
}

export default Footer;
