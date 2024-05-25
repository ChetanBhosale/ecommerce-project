import { FC } from "react";
import { useDispatch } from "react-redux";
import { changePage } from "../../store/storage/authSlice";

type Props = {
  name: string;
  icon?: React.ReactNode;
  modalId: string;
  number: number;
};

const NavBtn: FC<Props> = ({ icon, name, modalId, number }) => {
  const dispatch = useDispatch();

  return (
    <label
      htmlFor={modalId}
      className="btn btn-md font-head text-md font-normal uppercase btn-primary-content w-full 1000px:w-max 1000px:btn-ghost"
      onClick={() => {
        dispatch(changePage(number));
      }}
    >
      {icon}
      {name}
    </label>
  );
};

export default NavBtn;
