import { FC } from "react";
import SearchBar from "./header/SearchBar";
import NavBtn from "./header/NavBtn";
import { IoPersonCircleOutline } from "react-icons/io5";
import { IoMdLogIn } from "react-icons/io";
import ThemeProviderBtn from "./header/ThemeProviderBtn";
import Cart from "./header/Cart";
import MobileHeader from "./auth/MobileHeader";
import AuthDrawer from "./auth/AuthDrawer";
import ExModal from "./auth/ExModal";
import Profile from "./header/Profile";
import { useSelector } from "react-redux";
import { authSlice } from "../@types/authSlice";

type Props = object;

const MainHeader: FC<Props> = () => {
  const { user } = useSelector((state: authSlice) => state.auth);

  return (
    <nav className="navbar shadow-sm px-12">
      <div className="navbar-start flex-1 gap-10">
        <h1 className="text-2xl font-head font-extrabold tracking-wider">
          EssyKart
        </h1>
        <SearchBar />
      </div>
      <div className="navbar-end gap-2 hidden 1000px:flex">
        {user === null && (
          <>
            <NavBtn
              icon={<IoPersonCircleOutline size={20} />}
              name="Login"
              modalId="ModalPage"
              number={1}
            />
            <NavBtn
              icon={<IoMdLogIn size={20} />}
              name="Sign up"
              modalId="ModalPage"
              number={2}
            />
          </>
        )}

        <Cart />
        <ThemeProviderBtn />
        {user !== null && <Profile />}
      </div>
      <MobileHeader />
      <AuthDrawer drawerId="mobileHeaderDrawer" />
      <ExModal modalId="ModalPage" />
    </nav>
  );
};

export default MainHeader;
