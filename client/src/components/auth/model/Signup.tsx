import { FC, useState } from "react";
import { useDispatch } from "react-redux";
import { changePage } from "../../../store/storage/authSlice";
import { ISignupData, TRegisterForm } from "../@types/Validation";

interface SignupProps {
  closeModal: () => void;
}

const Signup: FC<SignupProps> = ({ closeModal }) => {
  const dispatch = useDispatch();

  const [user, setUser] = useState<ISignupData>({
    email: "",
    password: "",
    user: "USER",
  });

  const [errors, setErrors] = useState<Partial<TRegisterForm>>({});
  
  return (
    <div className="w-full bg-base-100">
      <div className="p-6">
        <h2 className="text-center text-2xl font-bold mb-4 uppercase ">
          Sign Up
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
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="input input-bordered w-full"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">User Type</span>
            </label>
            <select name="userType" className="select select-bordered w-full">
              <option value="USER">USER</option>
              <option value="SELLER">SELLER</option>
            </select>
          </div>
          <div className="form-control mt-6">
            <button
              className="btn btn-primary w-full"
              onClick={() => dispatch(changePage(4))}
            >
              Sign Up
            </button>
          </div>
          <div className="divider">OR</div>
          <div className="form-control">
            <button
              className="btn btn-outline btn-secondary w-full"
              type="button"
            >
              Signup with Google
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
