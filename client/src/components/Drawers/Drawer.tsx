import { FC } from "react";

interface Props {
  component: React.ReactNode;
  drawerId: string;
  children: React.ReactNode;
}

const Drawer: FC<Props> = ({ component, drawerId, children }) => {
  return (
    <div className="drawer w-auto z-0">
      <input id={drawerId} type="checkbox" className="drawer-toggle absolute" />
      <div className="drawer-content">{component}</div>
      <div className="drawer-side">
        <label
          htmlFor={drawerId}
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Drawer;
