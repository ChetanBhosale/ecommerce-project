import { FC } from "react";
import SearchBar from "./header/SearchBar";
import NavBtn from "./header/NavBtn";
import { IoPersonCircleOutline } from "react-icons/io5";
import { IoMdLogIn } from "react-icons/io";
import ThemeProviderBtn from "./header/ThemeProviderBtn";
import Cart from "./header/Cart";
import ExModal from "./auth/ExModal";
import Login from "./auth/Login";
import Signup from "./auth/Signup";
import MobileHeader from "./auth/MobileHeader";
import AuthDrawer from "./auth/AuthDrawer";

type Props = object;

const MainHeader: FC<Props> = () => {
  return (
    <nav className="navbar shadow-sm px-12">
      <div className="navbar-start flex-1 gap-10">
        <h1 className="text-2xl font-head font-extrabold tracking-wider">
          EssyKart
        </h1>
        <SearchBar />
      </div>
      <div className="navbar-end gap-2 hidden 1000px:flex">
        <NavBtn
          icon={<IoPersonCircleOutline size={20} />}
          name="Login"
          modalId="loginId"
        />
        <NavBtn
          icon={<IoMdLogIn size={20} />}
          name="Sign up"
          modalId="signupId"
        />
        <Cart />
        <ThemeProviderBtn />
      </div>
      <MobileHeader />
      <ExModal modalId="loginId" ComponentWork={<Login />} />
      <ExModal modalId="signupId" ComponentWork={<Signup />} />
      <AuthDrawer drawerId="mobileHeaderDrawer" />
    </nav>
  );
};

export default MainHeader;
