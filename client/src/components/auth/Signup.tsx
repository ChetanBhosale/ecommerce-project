import { FC, useState } from "react";

interface SignupFormState {
  email: string;
  password: string;
  userType: string;
}

const Signup: FC = () => {
  const [formState, setFormState] = useState<SignupFormState>({
    email: "",
    password: "",
    userType: "User",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="w-full bg-base-100">
      <div className="p-6">
        <h2 className="text-center text-2xl font-bold mb-4">Sign Up</h2>
        <form className="space-y-3">
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
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                className="input input-bordered w-full"
                value={formState.password}
                onChange={handleChange}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                onClick={toggleShowPassword}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">User Type</span>
            </label>
            <select
              name="userType"
              className="select select-bordered w-full"
              value={formState.userType}
              onChange={handleChange}
            >
              <option value="User">User</option>
              <option value="Seller">Seller</option>
            </select>
          </div>
          <div className="form-control mt-6">
            <button className="btn btn-primary w-full">Sign Up</button>
          </div>
          <div className="divider">OR</div>
          <div className="form-control">
            <button className="btn btn-outline btn-secondary w-full">
              Signup with Google
            </button>
          </div>
        </form>
        <div className="text-center mt-4">
          <a href="#" className="link link-hover">
            Login instead
          </a>
        </div>
      </div>
    </div>
  );
};

export default Signup;
