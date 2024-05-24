import { FC, useState } from "react";
import { useSelector } from "react-redux";
import Login from "./model/Login";
import Signup from "./model/Signup";
import ForgotPassword from "./model/ForgotPassword";
import Otp from "./model/Otp";
import { AuthState } from "./@types/Validation";

type Props = {
  modalId: string;
};

const ExModal: FC<Props> = ({ modalId }) => {
  const { page } = useSelector((state: AuthState) => state.auth);
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  };

  const renderModalContent = () => {
    switch (page) {
      case 1:
        return <Login closeModal={closeModal} />;
      case 2:
        return <Signup />;
      case 3:
        return <ForgotPassword />;
      default:
        return <Otp />;
    }
  };

  return (
    <>
      <input
        type="checkbox"
        id={modalId}
        className="modal-toggle"
        checked={isOpen}
        onChange={() => setIsOpen(!isOpen)}
      />
      <div className="modal">
        <div className="modal-box relative">{renderModalContent()}</div>
        <label className="modal-backdrop" htmlFor={modalId}></label>
      </div>
    </>
  );
};

export default ExModal;
