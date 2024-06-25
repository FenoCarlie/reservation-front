import DatePicker, { registerLocale } from "react-datepicker";
import { useLanguage } from "../../contexts/LanguageContext";
import fr from "date-fns/locale/fr";
import en from "date-fns/locale/en-GB";
registerLocale("fr", fr);
registerLocale("en", en);

const Calendar = ({ selectedDate, setSelectedDate, excludeDates }) => {
  const { currentLanguage } = useLanguage();

  return (
    <DatePicker
      selected={selectedDate}
      onChange={(date) => setSelectedDate(date)}
      minDate={new Date()}
      excludeDates={excludeDates}
      inline
      calendarClassName="custom-datepicker"
      locale={currentLanguage == "Fr" ? "fr" : "en"}
    />
  );
};

export default Calendar;
