import { FC, useState, FormEvent, ChangeEvent } from "react";
import { HiOutlineLogin } from "react-icons/hi";
import { z } from "zod";

// Define the Zod schema for validation
const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }),
});

interface LoginFormState {
  email: string;
  password: string;
}

const Login: FC = () => {
  const [formState, setFormState] = useState<LoginFormState>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );
  const [page, setPage] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = loginSchema.safeParse(formState);

    if (!result.success) {
      const errorMessages = result.error.flatten().fieldErrors;
      setErrors({
        email: errorMessages.email?.[0],
        password: errorMessages.password?.[0],
      });
    } else {
      setErrors({});
      console.log("Form submitted", formState);
    }
  };

  const handleForgotPassword = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  if (!page) {
    return (
      <div className="w-full bg-base-100">
        <div className="p-6">
          <h2 className="text-center text-2xl font-bold mb-4 uppercase ">
            Welcome!
          </h2>
          <form className="space-y-4" onSubmit={handleLogin}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="input input-bordered w-full"
                value={formState.email}
                onChange={handleChange}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
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
                value={formState.password}
                onChange={handleChange}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
              <label
                className="label-text-alt link link-hover mt-1 cursor-pointer"
                onClick={() => setPage(!page)}
              >
                Forgot password?
              </label>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary w-full">Login</button>
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
  } else {
    return (
      <div className="w-full bg-base-100">
        <button onClick={() => setPage(!page)}>
          <HiOutlineLogin />
        </button>
        <div className="p-6">
          <h2 className="text-center text-2xl font-bold mb-4 uppercase ">
            Forgot Password
          </h2>
          <form className="space-y-4" onSubmit={handleForgotPassword}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="input input-bordered w-full"
                value={formState.email}
                onChange={handleChange}
              />
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary w-full">Submit</button>
            </div>
          </form>
          <div className="divider"></div>
          <form>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Enter OTP</span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="input input-bordered w-full"
                value={formState.password}
                onChange={handleChange}
              />
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary w-full">Submit</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
};

export default Login;
