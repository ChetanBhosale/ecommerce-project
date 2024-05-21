import { FC } from "react";

type Props = {
  name: string;
  icon?: React.ReactNode;
  modalId: string;
};

const NavBtn: FC<Props> = ({ icon, name, modalId }) => {
  return (
    <label
      htmlFor={modalId}
      className="btn btn-md text-head btn-primary-content w-full 1000px:w-max 1000px:btn-ghost  tracking-wide"
    >
      {icon}
      {name}
    </label>
  );
};

export default NavBtn;
