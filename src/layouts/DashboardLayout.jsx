import { useSignOut } from "react-firebase-hooks/auth";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebase.config";
import toast from "react-hot-toast";
import { HiOutlineMenuAlt2 } from "react-icons/hi";

const DashboardLayout = () => {
  const navigate = useNavigate();
  const [signOut, loading, error] = useSignOut(auth);

  // Handle logout
  const handleLogOut = async () => {
    try {
      await signOut();

      toast.success("You have logged out successfully");
      localStorage.removeItem("token");
      navigate("/", { replace: true });
    } catch {
      toast.error("Failed to log out");
    }
  };

  if (error) {
    toast.error(error.message);
  }
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-start justify-start">
        <label htmlFor="my-drawer-2" className="p-4 drawer-button lg:hidden">
          <HiOutlineMenuAlt2 />
        </label>

        <Outlet />
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu p-4 w-48 h-screen flex flex-col justify-between bg-gradient-to-b from-sky-100 via-cyan-100 to-blue-100">
          <div>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="statistics">Statistics</Link>
            </li>
            <li>
              <Link to="courses">My Courses</Link>
            </li>
            <li>
              <Link to="add-course">Add Courses</Link>
            </li>
          </div>

          <button
            className="btn btn-error btn-sm text-sm text-white"
            onClick={handleLogOut}
            disabled={loading}
          >
            Log out
          </button>
        </ul>
      </div>
    </div>
  );
};

export default DashboardLayout;
