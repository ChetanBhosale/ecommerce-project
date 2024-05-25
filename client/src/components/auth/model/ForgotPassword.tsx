import { FC } from "react";
import { useDispatch } from "react-redux";
import { changePage } from "../../../store/storage/authSlice";
interface Props {
  closeModal: () => void;
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ForgotPassword: FC<Props> = ({ closeModal }) => {
  const dispatch = useDispatch();
  return (
    <div className="w-full bg-base-100">
      <label htmlFor="" onClick={() => dispatch(changePage(1))}>
        back
      </label>
      <div className="p-6">
        <h2 className="text-center text-2xl font-bold mb-4 uppercase">
          Forgot Password
        </h2>
        <form className="space-y-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="input input-bordered w-full"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">OTP</span>
            </label>
            <input
              type="text"
              name="otp"
              placeholder="Enter OTP"
              className="input input-bordered w-full"
            />
          </div>
          <div className="form-control mt-6">
            <button className="btn btn-primary w-full">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
