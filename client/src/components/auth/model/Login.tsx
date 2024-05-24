import { useDispatch } from "react-redux";
import { changePage } from "../../../store/storage/authSlice";
import React, { useEffect, useState } from "react";
import { ILoginData, TLoginForm, ILogin } from "../@types/Validation";
import { useLoginUserMutation } from "../../../store/api/authApi";

interface LoginProps {
  closeModal: () => void;
}

const Login: React.FC<LoginProps> = ({ closeModal }) => {
  const dispatch = useDispatch();
  const [user, setUser] = useState<ILoginData>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<Partial<TLoginForm>>({});
  const [loginUser, { error, isLoading, isSuccess }] = useLoginUserMutation();

  const handleChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value }: any = e.target;

    setUser((prev: ILoginData) => {
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate form data with Zod
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
      loginFunction();
      setErrors({});
    }
  };

  async function loginFunction() {
    const data = await loginUser(user);
    console.log(data);
  }

  useEffect(() => {
    if (isSuccess) {
      closeModal(); // Close the modal on successful login
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        console.log("Error: ", errorData);
        alert(errorData.data.message);
      }
    }
  }, [error, isSuccess, closeModal]);

  return (
    <div className="w-full bg-base-100">
      <div className="p-6">
        <h2 className="text-center text-2xl font-bold mb-4 uppercase ">
          Welcome!
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
              value={user.email}
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
              value={user.password}
              onChange={handleChanges}
            />
            {errors.password && (
              <p className="text-red-500">{errors.password}</p>
            )}
            <label
              className={`label-text-alt link link-hover mt-1 cursor-pointer ${
                isLoading && "btn-disabled"
              }`}
              onClick={() => {
                dispatch(changePage(3));
              }}
            >
              Forgot password?
            </label>
          </div>
          <div className="form-control mt-6">
            <button
              type="submit"
              className={`btn btn-primary w-full ${
                isLoading && "btn-disabled"
              }`}
            >
              Login
            </button>
          </div>
          <div className="divider">OR</div>
          <div className="form-control">
            <button
              className={`btn btn-outline btn-secondary w-full ${
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

export default Login;
