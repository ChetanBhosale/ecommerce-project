import { FC, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { changePage } from "../../../store/storage/authSlice";
import { ILogin, ISignupData, TRegisterForm } from "../@types/Validation";
import { useSignupUserMutation } from "../../../store/api/authApi";

const Signup: FC = () => {
  const dispatch = useDispatch();

  const [user, setUser] = useState<ISignupData>({
    email: "",
    password: "",
    user: "USER",
  });

  const [errors, setErrors] = useState<Partial<TRegisterForm>>({});
  const [signupUser, { error, isLoading, isSuccess }] = useSignupUserMutation();

  function handleChanges(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value }: any = e.target;
    setUser((prev: ISignupData) => {
      return { ...prev, [name]: value };
    });
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = ILogin.safeParse(user);
    if (!result.success) {
      const fieldErrors: any = {};
      result.error.errors.forEach((error) => {
        const fieldName = error.path[0];
        if (fieldName) {
          fieldErrors[fieldName] = error.message;
        }
      });
      setErrors(fieldErrors);
    } else {
      signupFunction();
      setErrors({});
    }
  };

  async function signupFunction() {
    await signupUser(user);
  }

  useEffect(() => {
    if (isSuccess) {
      console.log("success");
      alert("Verification Code sent to your email address");
      dispatch(changePage(4));
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        console.log("Error", errorData);
        alert(errorData.data.message);
      }
    }
  }, [error, isSuccess]);

  return (
    <div className="w-full bg-base-100">
      <div className="p-6">
        <h2 className="text-center text-2xl font-bold mb-4 uppercase ">
          Sign Up
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="input input-bordered w-full"
              onChange={handleChanges}
            />
            {errors.email && <p className="text-red-500">{errors.email}</p>}
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
              onChange={handleChanges}
            />
            {errors.password && (
              <p className="text-red-500">{errors.password}</p>
            )}
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">User Type</span>
            </label>
            <select
              name="user"
              onChange={handleChanges}
              className="select select-bordered w-full"
              defaultValue="USER"
            >
              <option value="USER">USER</option>
              <option value="SELLER">SELLER</option>
            </select>
          </div>
          <div className="form-control mt-6">
            <button
              type="submit"
              className={`btn btn-primary w-full ${
                isLoading && "btn-disabled"
              }`}
            >
              Sign Up
            </button>
          </div>
          <div className="divider">OR</div>
          <div className="form-control">
            <button
              className={`btn btn-outline w-full ${
                isLoading && "btn-disabled"
              }`}
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
