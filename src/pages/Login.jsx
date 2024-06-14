/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import GoogleLogin from "../auth/GoogleLogin";
// import FacebookLogin from "../auth/FacebookLogin";
// React Firebase Hooks
import {
  useAuthState,
  useSignInWithEmailAndPassword,
  useSignOut,
} from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebase.config";
import toast from "react-hot-toast";
import axios from "axios";
import LoadingPage from "./shared/LoadingPage";

const Login = () => {
  const navigate = useNavigate();
  const [userFromAuth, loadingFromAuth, errorFromAuth] = useAuthState(auth);

  const [customError, setCustomError] = useState("");
  const [customLoading, setCustomLoading] = useState(false);

  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);
  const [signOut] = useSignOut(auth);

  useEffect(() => {
    if (userFromAuth && !customLoading) {
      navigate("/", { replace: true });
    }
  }, [userFromAuth, navigate, customLoading]);

  const handleLogIn = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    if (password.length < 6) {
      setCustomError("Password should be 6 characters long");
      return;
    }

    setCustomError("");
    setCustomLoading(true);

    const data = {
      email,
    };

    try {
      const useData = await signInWithEmailAndPassword(email, password);
      if (useData) {
        const response = await axios.post(
          `${import.meta.env.VITE_server}/api/user/login`,
          data
        );

        const { token, message } = response.data;
        localStorage.setItem("token", token);
        toast.success(message);
      }
    } catch (error) {
      await signOut();
      setCustomError(error.message);
    } finally {
      setCustomLoading(false);
    }
  };

  if (loadingFromAuth) {
    return <LoadingPage />;
  }

  if (errorFromAuth) {
    toast.error(errorFromAuth.message);
    return;
  }

  return (
    <div className="hero h-screen flex items-center justify-center">
      <div className="w-full max-w-md bg-white p-6 rounded-lg">
        <form onSubmit={handleLogIn} className="card-body">
          <h1 className="text-2xl text-center my-4">Log in</h1>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="email"
              name="email"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password (minimum length 6) </span>
            </label>
            <input
              type="password"
              placeholder="password"
              name="password"
              className="input input-bordered"
              required
            />
            <label className="label">
              <h1 className="label-text-alt text-red-600 font-semibold">
                {customError || error?.message}
              </h1>
            </label>
          </div>

          <div className="form-control">
            <button
              className="btn btn-neutral"
              disabled={loading || customLoading}
            >
              {loading || customLoading ? "Logging in..." : "Log in"}
            </button>
          </div>

          <div className="flex flex-col justify-center items-center label-text-alt mt-2">
            <p>Or use social option</p>
          </div>

          <div className="mt-2 form-control flex flex-row justify-center gap-x-4">
            <GoogleLogin />
            {/* <FacebookLogin /> */}
          </div>

          <label className="label flex justify-center">
            <h1 className="label-text-alt">
              New in The Learning Hero?{" "}
              <Link to="/register">Register Here</Link>
            </h1>
          </label>
        </form>
      </div>
    </div>
  );
};

export default Login;
