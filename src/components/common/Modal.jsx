import { TfiClose } from "react-icons/tfi";
const Modal = ({ show, onClose, children }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-20 bg-black bg-opacity-60 flex justify-center items-center">
      <div className="bg-white p-6 rounded-md w-full max-w-lg relative">
        <button className="absolute top-3 right-3" onClick={onClose}>
          <TfiClose className="w-6 h-6" />
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
