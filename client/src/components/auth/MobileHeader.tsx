import { FC } from "react";
import Drawer from "../Drawers/Drawer";
import Profile from "../header/Profile";
import MobileSwaper from "../Swap/MobileSwaper";
import MobileOption from "../Drawers/MobileOption";

type Props = object;

const MobileHeader: FC<Props> = () => {
  return (
    <div className="navbar-end gap-1 flex flex-row-reverse 1000px:hidden">
      <Profile />
      <Drawer
        component={<MobileSwaper drawerId="mobileId" />}
        drawerId="mobileId"
      >
        <MobileOption />
      </Drawer>
    </div>
  );
};

export default MobileHeader;
