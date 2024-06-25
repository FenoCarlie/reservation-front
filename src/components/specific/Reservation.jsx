import { useEffect, useRef, useState } from "react";
import ReservationStepper from "./ReservationStepper";
import Calendar from "../common/Calendar";
import { useLanguage } from "../../contexts/LanguageContext";
import { MdOutlineTableBar } from "react-icons/md";
import { FaRegCalendarAlt } from "react-icons/fa";
import { useNotificationContext } from "../../contexts/NotificationContext";

function Reservation(props) {
  const { translate, currentLanguage } = useLanguage();
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedPlace, setSelectedPlace] = useState(1);
  const currentDate = new Date();
  const { addNotification } = useNotificationContext();
  const [selectedValue, setSelectedValue] = useState(null);
  const tables = useState(10);

  const handleClick = (value) => {
    setSelectedValue(value);
  };

  const roundToNextQuarterHour = (date) => {
    const minutes = date.getMinutes();
    if (minutes > 0 && minutes <= 15) {
      date.setMinutes(15);
    } else if (minutes > 15 && minutes <= 30) {
      date.setMinutes(30);
    } else if (minutes > 30 && minutes <= 45) {
      date.setMinutes(45);
    } else if (minutes > 45) {
      date.setMinutes(0);
      date.setHours(date.getHours() + 1);
    }
    date.setSeconds(0);
    date.setMilliseconds(0);
    return date;
  };

  const initialDate = roundToNextQuarterHour(new Date(currentDate));
  const [selectedDate, setSelectedDate] = useState(initialDate);
  const [selectedTime, setSelectedTime] = useState(
    new Date(initialDate.getTime() + 3600000)
  );
  const field = useRef();
  const datesToExclude = [new Date(2024, 5, 20), new Date(2024, 5, 25)];

  const nextStep = () => {
    if (currentStep < 2) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const closeModal = props.closeModal;

  const book = async (event) => {
    event.preventDefault();

    const nameRegex = /^[a-zA-Zàáâãäåçèéêëìíîïñòóôõöùúûüýÿ\s]+$/; // only letters and spaces
    const phoneRegex = /^\d{10}$/; // exactly 10 digits
    const mailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; // basic email validation

    const payload = {
      name: field.current.name.value,
      phone: field.current.phone.value,
      mail: field.current.mail.value,
      date: selectedDate,
      time: selectedTime,
      message: field.current.message.value,
    };

    let hasPhone = phoneRegex.test(payload.phone);
    let hasMail = mailRegex.test(payload.mail);

    if (nameRegex.test(payload.name) && (hasPhone || hasMail)) {
      try {
        //const response = await axiosClient.post("", payload);
        addNotification(
          translate(`notification.reservation.succes`),
          "information"
        );
        closeModal();
      } catch (error) {
        const response = error.response;
        if (response && response.status === 422) {
          alert(response.data.message);
        }
      }
    } else {
      if (!nameRegex.test(payload.name))
        addNotification(
          translate(`notification.reservation.nameError`),
          "information"
        );
      if (!hasPhone && !hasMail)
        addNotification(
          translate(`notification.reservation.contactError`),
          "information"
        );
      if (!mailRegex)
        addNotification(
          translate(`notification.reservation.mailError`),
          "information"
        );
    }
  };

  const getLocale = () => {
    switch (currentLanguage) {
      case "Fr":
        return "fr-FR";
      case "En":
        return "en-US";
      default:
        return "en-US";
    }
  };

  return (
    <div className="w-full h-[550px] p-4 font-barlow">
      <ReservationStepper
        currentStep={currentStep}
        onNext={nextStep}
        onPrevious={prevStep}
      />
      <section className="w-full">
        {currentStep === 0 && (
          <div className="w-full">
            <Calendar
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              excludeDates={datesToExclude}
            />
          </div>
        )}
        {currentStep === 1 && (
          <div className="w-full">
            {Array.from({ tables }, (_, i) => (
              <span key={i + 1}>{i + 1}</span>
            ))}
          </div>
        )}
        {currentStep === 2 && (
          <div className="w-full">
            <section className="mb-10 p-3 border w-full flex flex-row justify-start">
              <span className="min-w-fit flex flex-row text-[#4e5b6d]">
                <FaRegCalendarAlt className="h-5 w-5" />:
                <label className="ml-2 mr-1">
                  {selectedDate?.toLocaleDateString(getLocale(), {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </label>
                {translate(`article.at`)}
                <label className="ml-1">
                  {selectedTime.toLocaleTimeString(getLocale(), {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </label>
              </span>
              <span className="min-w-fit ml-10 flex flex-row text-[#4e5b6d]">
                <MdOutlineTableBar className="h-5 w-5" />:
                <label className="ml-2">{selectedPlace}</label>
              </span>
            </section>
            <form
              ref={field}
              onSubmit={book}
              className=" w-full flex flex-col font-barlow"
            >
              <span className="w-full flex flex-row">
                {/* <label htmlFor="name" className="min-w-fit">
                  {translate(`information.name`)}:{" "}
                </label> */}
                <input
                  placeholder={translate(`information.name`)}
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="py px-2 mb-10 ml-3 border-b-[1px] border-[#4e5b6dbd] w-full"
                />
              </span>
              <span className="w-full flex flex-row">
                {/* <label htmlFor="phone" className="min-w-fit">
                  {translate(`information.phone`)}:{" "}
                </label> */}
                <input
                  placeholder={translate(`information.phone`)}
                  type="number"
                  id="phone"
                  name="phone"
                  maxLength={10}
                  className="py px-2 mb-10 ml-3 border-b-[1px] border-[#4e5b6dbd] w-full"
                />
              </span>
              <span className="w-full flex flex-row">
                {/* <label htmlFor="email" className="min-w-fit">
                  {translate(`information.mail`)}:{" "}
                </label> */}
                <input
                  placeholder={translate(`information.mail`)}
                  type="mail"
                  id="mail"
                  name="mail"
                  className="py px-2 mb-10 ml-3 border-b-[1px] border-[#4e5b6dbd] w-full"
                />
              </span>
              <span className="w-full flex flex-row">
                {/* <label htmlFor="message" className="min-w-fit">
                  {translate(`information.mail`)}:{" "}
                </label> */}
                <textarea
                  placeholder={translate(`information.message`)}
                  id="message"
                  name="message"
                  className="py px-2 ml-3 border-b-[1px] border-[#4e5b6dbd] w-full max-h-[75px] resize-none"
                />
              </span>
              <button
                type="submit"
                className="absolute bottom-10 right-10  text-lg py border-b-[1px] border-[#4e5b6dbd]"
              >
                {translate(`button.booking`)}
              </button>
            </form>
          </div>
        )}
      </section>
    </div>
  );
}

export default Reservation;
