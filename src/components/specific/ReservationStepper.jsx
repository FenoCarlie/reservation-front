import React from "react";
import { MdOutlineTableBar } from "react-icons/md";
import { FaRegCalendarAlt } from "react-icons/fa";
import { GoPeople } from "react-icons/go";
import { MdArrowForwardIos, MdArrowBackIos } from "react-icons/md";
import { useLanguage } from "../../contexts/LanguageContext";

const ReservationStepper = ({ currentStep, onNext, onPrevious }) => {
  const { translate } = useLanguage();

  const steps = [
    {
      icon: <FaRegCalendarAlt className="w-5 h-5" />,
      label: `${translate("items.date")} ${translate("logic.and")} ${translate(
        "items.time"
      )}`,
    },
    {
      icon: <MdOutlineTableBar className="w-5 h-5" />,
      label: translate(`items.table`),
    },
    {
      icon: <GoPeople className="w-5 h-5" />,
      label: translate(`items.information`),
    },
  ];
  return (
    <div className="w-full h-auto p-4">
      <section className="w-full flex flex-row justify-between py-2">
        {steps.map((step, index) => (
          <div
            key={index}
            className={`flex flex-col items-center ${
              currentStep >= index ? "text-[#4e5b6d]" : "text-gray-400"
            }`}
          >
            {step.icon}
            <span className="text-xs mt-1 text-md">{step.label}</span>
            <div
              className={`w-full h-[1px] mt-1 ${
                currentStep >= index ? "bg-[#64748b]" : "bg-gray-300"
              }`}
            />
          </div>
        ))}
      </section>
      <button
        className="absolute top-[50%] left-1 items-center justify-center flex hover:bg-gray-200 text-gray-700 p-3 rounded-full disabled:opacity-50"
        onClick={onPrevious}
        disabled={currentStep === 0}
      >
        <MdArrowBackIos />
      </button>
      <button
        className="absolute top-[50%] items-center justify-center flex right-1 hover:bg-gray-200 text-gray-700 p-3 rounded-full disabled:opacity-50"
        onClick={onNext}
        disabled={currentStep === steps.length - 1}
      >
        <MdArrowForwardIos />
      </button>
    </div>
  );
};

export default ReservationStepper;
