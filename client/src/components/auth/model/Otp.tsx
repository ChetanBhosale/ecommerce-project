import { FC, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { changePage } from "../../../store/storage/authSlice";
import { useActiveUserMutation } from "../../../store/api/authApi";

interface Props {
  closeModal: () => void;
}

const Otp: FC<Props> = ({ closeModal }) => {
  const [otp, setOtp] = useState<string>();

  const [activeUser, { error, isLoading, isSuccess }] = useActiveUserMutation();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (otp !== undefined && otp.length !== 0) {
      await activeUser({ code: otp });
    } else {
      alert("Please Enter something");
    }
  }

  useEffect(() => {
    if (isSuccess) {
      alert("Account created successfully!");
      closeModal();
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        console.log("Error: ", errorData);
        alert(errorData.data.message);
      }
    }
  }, [isSuccess, error, closeModal]);

  const dispatch = useDispatch();
  return (
    <div className="w-full bg-base-100">
      <label htmlFor="" onClick={() => dispatch(changePage(2))}>
        back
      </label>
      <div className="p-6">
        <h2 className="text-center text-2xl font-bold mb-4 uppercase">
          Please Enter OTP
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="form-control">
            <label className="label">
              <span className="label-text">OTP</span>
            </label>
            <input
              type="text"
              name="otp"
              value={otp}
              placeholder="Enter OTP"
              className="input input-bordered w-full"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setOtp(e.target.value)
              }
            />
          </div>
          <div className="form-control mt-6">
            <button className="btn btn-primary w-full" disabled={isLoading}>
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Otp;
