import { useState } from "react";
import Modal from "../components/common/Modal";
import Footer from "../components/specific/Footer";
import Header from "../components/specific/Header";
import { useLanguage } from "../contexts/LanguageContext";
import Home from "../pages/defaultLayout/Home";
import Menu from "../pages/defaultLayout/Menu";
import Reviews from "../pages/defaultLayout/Reviews";
import Reservation from "../components/specific/Reservation";
import Notification from "../components/common/Notification";
import { useNotificationContext } from "../contexts/NotificationContext";
import Blog from "../pages/defaultLayout/Blog";

function DefaultLayout() {
  const { translate } = useLanguage();
  const [showModal, setShowModal] = useState(false);
  const { notifications } = useNotificationContext();

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  return (
    <div id="defaultLayout" className="relative w-full h-screen mainScrollBar">
      <section className="fixed w-full top-0 z-10">
        <Header />
      </section>
      <button
        onClick={openModal}
        id="reservationButton"
        className="absolute z-0 md:bottom-80 bottom-56 xl:left-28 md:left-16 left-10 font-barlow text-2xl bg-[#9a2323] hover:bg-[#222d35] text-white px-6 py-3 rounded-xl"
      >
        {translate(`button.reservation`)}
      </button>
      <Home />
      <Menu />
      <Blog />
      <Reviews />
      <Footer />
      <Modal show={showModal} onClose={closeModal}>
        <Reservation closeModal={closeModal} />
      </Modal>
      <div className="fixed z-20 h-auto w-auto top-20 right-0 px-5">
        {notifications.map((notification) => (
          <Notification key={notification.id} notification={notification} />
        ))}
      </div>
    </div>
  );
}

export default DefaultLayout;
