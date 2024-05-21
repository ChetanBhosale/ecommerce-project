import { FC, ReactNode } from "react";

type Props = {
  modalId: string;
  ComponentWork: ReactNode;
};

const ExModal: FC<Props> = ({ modalId, ComponentWork }) => {
  return (
    <>
      <input type="checkbox" id={modalId} className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">{ComponentWork}</div>
        <label className="modal-backdrop" htmlFor={modalId}></label>
      </div>
    </>
  );
};

export default ExModal;
