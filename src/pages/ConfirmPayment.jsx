import axios from "axios";
import { useState } from "react";
import LoadingPage from "./shared/LoadingPage";
import { useLocation } from "react-router-dom";

export const ConfirmPayment = () => {
  const [customLoading, setCustomLoading] = useState(false);
  const [customError, setCustomError] = useState("");

  const location = useLocation();
  const info = new URLSearchParams(location.search);
  const dataString = info.get("data");

  let data;
  try {
    data = JSON.parse(dataString);
    console.log("Parsed data:", data);
  } catch (error) {
    console.error("Error parsing data:", error);
    data = null;
  }

  if (!data) {
    return (
      <div className="flex justify-center items-center">
        Error: No data received
      </div>
    );
  }

  const handleMakePayment = async (e) => {
    e.preventDefault();

    const phone = e.target.phone.value;

    data.phone = phone;

    try {
      setCustomLoading(true);
      setCustomError("");
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${import.meta.env.VITE_server}/api/payment/pay-now`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      window.location.replace(response?.data?.url);
    } catch (error) {
      setCustomError(error?.response?.data?.message);
    } finally {
      setCustomLoading(false);
    }
  };

  if (customLoading) {
    return <LoadingPage />;
  }
  return (
    <div className="hero min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md md:max-w-2xl bg-white p-6 md:my-12 rounded-lg">
        <form onSubmit={handleMakePayment} className="card-body">
          <h1 className="text-2xl text-center md:my-4">Confirm Payment</h1>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Phone Number</span>
            </label>
            <input
              type="number"
              placeholder="your phone number"
              name="phone"
              className="input input-bordered"
              required
            />
          </div>

          <div className="form-control md:flex-1">
            <label className="label">
              <span className="label-text">Course Fee</span>
            </label>
            <input
              type="number"
              placeholder="course fee (BDT)"
              name="fee"
              defaultValue={data.fee}
              readOnly
              className="input input-bordered"
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <h1 className="label-text-alt text-red-600 font-semibold">
                {customError}
              </h1>
            </label>
          </div>
          <div className="form-control">
            <button className="btn btn-neutral" disabled={customLoading}>
              {customLoading ? "Paying..." : "Pay Now"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
