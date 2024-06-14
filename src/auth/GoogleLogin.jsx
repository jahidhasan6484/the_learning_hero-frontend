import { useSignInWithGoogle, useSignOut } from "react-firebase-hooks/auth";
import axios from "axios";
import toast from "react-hot-toast";
import { RiGoogleFill } from "react-icons/ri";
import { auth } from "../firebase/firebase.config";

const GoogleLogin = () => {
  const [signInWithGoogle] = useSignInWithGoogle(auth);
  const [signOut] = useSignOut(auth);

  const handleLoginWithGoogle = async () => {
    const userData = await signInWithGoogle();

    if (userData) {
      const data = {
        email: userData?.user?.email,
        name: userData?.user?.displayName || "unknown",
      };

      try {
        const response = await axios.post(
          `${import.meta.env.VITE_server}/api/user/register`,
          data
        );

        const { token, message } = response.data;

        toast.success(message);
        localStorage.setItem("token", token);
      } catch {
        await signOut();
        toast.error("Something went wrong!");
      }
    }
  };

  return (
    <button
      onClick={handleLoginWithGoogle}
      className="btn btn-circle bg-google"
    >
      <RiGoogleFill className="text-white" />
    </button>
  );
};

export default GoogleLogin;
