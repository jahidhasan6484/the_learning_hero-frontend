import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import { auth } from "../../firebase/firebase.config";
import toast from "react-hot-toast";
import LoadingPage from "./LoadingPage";
import Logo from "./Logo";

const Navbar = () => {
  const [userFromAuth, loadingFromAuth, errorFromAuth] = useAuthState(auth);
  const [signOut, loading, error] = useSignOut(auth);

  // Handle loading state
  if (loadingFromAuth || loading) {
    return <LoadingPage />;
  }

  // Handle errors
  if (errorFromAuth || error) {
    toast.error(errorFromAuth?.message || error?.message);
    return null;
  }

  // Handle logout
  const handleLogOut = async () => {
    try {
      await signOut();

      toast.success("You have logged out successfully");
      localStorage.removeItem("token");
    } catch {
      toast.error("Failed to log out");
    }
  };

  return (
    <div className="bg-white sticky top-0 left-0 right-0 z-50">
      <div className="navbar container mx-auto">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <Link to="/latest-courses">Latest Courses</Link>
              </li>
              <li>
                <a>Item 3</a>
              </li>
            </ul>
          </div>
          <Logo />
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link to="/latest-courses">Latest Courses</Link>
            </li>

            {userFromAuth && (
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
            )}
          </ul>
        </div>
        <div className="navbar-end">
          {userFromAuth ? (
            <button
              className="btn btn-error btn-sm text-sm text-white"
              onClick={handleLogOut}
            >
              Log out
            </button>
          ) : (
            <Link
              to="/login"
              className="btn btn-neutral btn-sm text-sm text-white"
            >
              Login
            </Link>
          )}
        </div>{" "}
      </div>
    </div>
  );
};

export default Navbar;
