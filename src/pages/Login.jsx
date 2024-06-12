import { Link } from "react-router-dom";

const Login = () => {
  const handleLogin = (e) => {
    e.preventDefault();
  };
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
        <form onSubmit={handleLogin} className="card-body">
          <h1 className="text-2xl my-4">Login</h1>

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
                {/* {customError
                  ? `${customError} `
                  : error
                  ? `${error?.message}`
                  : null} */}
              </h1>
            </label>
          </div>

          <label className="label flex justify-end">
            <h1 className="label-text-alt">
              New in Zento? <Link to="/register">Register Here</Link>
            </h1>
          </label>

          {/* <div className="form-control mt-6">
            <button
              className="btn btn-primary"
              disabled={load || customLoading}
            >
              {loading || customLoading ? "Loading" : "Login"}
            </button>
          </div> */}

          <div className="flex flex-col justify-center items-center label-text-alt mt-2">
            <p>Or use social option</p>
          </div>

          <div className="mt-2 form-control flex flex-row justify-center gap-x-4">
            {/* <GoogleLogin /> */}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
