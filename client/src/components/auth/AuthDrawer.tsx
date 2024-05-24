import { FC } from "react";
import NavBtn from "../header/NavBtn";
import { IoMdLogIn } from "react-icons/io";
import { IoPersonCircleOutline } from "react-icons/io5";
import ThemeProviderBtn from "../header/ThemeProviderBtn";

type Props = {
  drawerId: string;
};

const AuthDrawer: FC<Props> = ({ drawerId }) => {
  return (
    <div className="drawer block 1000px:hidden w-0 relative ">
      <input id={drawerId} type="checkbox" className="drawer-toggle w-0" />
      <div className="drawer-side">
        <ul className="menu p-4 w-full flex gap-4 items-center h-screen bg-base-100 text-base-content">
          <li className="text-2xl  my-4 font-head font-extrabold tracking-wider">
            EssyKart
          </li>
          <li>
            <NavBtn
              icon={<IoPersonCircleOutline size={20} />}
              name="Login"
              modalId="loginId"
              number={1}
            />
          </li>
          <li>
            <NavBtn
              icon={<IoMdLogIn size={20} />}
              name="Sign up"
              modalId="signupId"
              number={2}
            />
          </li>
          <li className="w-full">
            <ThemeProviderBtn />
          </li>
          <label
            htmlFor={drawerId}
            aria-label="close sidebar"
            className="drawer-overlay btn btn-primary w-20 absolute bottom-5 right-5"
          >
            close
          </label>
        </ul>
      </div>
    </div>
  );
};

export default AuthDrawer;
