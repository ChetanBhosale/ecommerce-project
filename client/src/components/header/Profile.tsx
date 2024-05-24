import { useNavigate } from "react-router";
import { useLogoutMutation } from "../../store/api/authApi";
import { useEffect } from "react";

const Profile = () => {
  const [logoutUser, { error, data, isSuccess }] = useLogoutMutation();

  const navigate = useNavigate();

  const logoutHandler = async () => {
    await logoutUser({});
  };

  useEffect(() => {
    if (isSuccess) {
      alert("logged out successfully!");
      navigate("/");
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        console.log("Error", errorData);
        alert(errorData.data.message);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, isSuccess, data]);

  return (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-circle btn-md avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS Navbar component"
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
          />
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
      >
        <li>
          <a className="justify-between">Profile</a>
        </li>
        <li>
          <a onClick={logoutHandler}>Logout</a>
        </li>
      </ul>
    </div>
  );
};

export default Profile;
