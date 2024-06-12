import { FaFacebookF } from "react-icons/fa";

const FacebookLogin = () => {
  const handleLoginWithFacebook = () => {};
  return (
    <button
      onClick={handleLoginWithFacebook}
      className="btn btn-circle bg-facebook"
    >
      <FaFacebookF className="text-white" />
    </button>
  );
};

export default FacebookLogin;
