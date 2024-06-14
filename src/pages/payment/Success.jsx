import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useLocation } from "react-router-dom";
import LoadingPage from "../shared/LoadingPage";

const Success = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const transactionId = query.get("transactionId");

  const [customLoading, setCustomLoading] = useState(false);
  const [customError, setCustomError] = useState("");
  const [transactionDetails, setTransactionDetails] = useState({});

  useEffect(() => {
    setCustomLoading(true);
    setCustomError("");
    const token = localStorage.getItem("token");
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_server
          }/api/payment/details?transactionId=${transactionId}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setTransactionDetails(response?.data?.data);
      } catch (error) {
        setCustomError(error?.response?.data?.message);
      } finally {
        setCustomLoading(false);
      }
    };

    fetchCourses();
  }, [transactionId]);

  if (customLoading) {
    return <LoadingPage />;
  }

  if (customError) {
    toast.error(customError);
  }

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Payment Successfull
        </h2>
        <div className="space-y-4">
          <div className="flex justify-between items-center border-b pb-2">
            <p className="text-gray-600 font-medium">Transaction ID:</p>
            <p className="text-gray-800">{transactionDetails?.transactionId}</p>
          </div>
          <div className="flex justify-between items-center border-b pb-2">
            <p className="text-gray-600 font-medium">Course Name:</p>
            <p className="text-gray-800">{transactionDetails?.title}</p>
          </div>
          <div className="flex justify-between items-center border-b pb-2">
            <p className="text-gray-600 font-medium">Email:</p>
            <p className="text-gray-800">{transactionDetails?.email}</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-gray-600 font-medium">Amount Paid:</p>
            <p className="text-green-600 font-semibold">
              ৳ {transactionDetails?.fee}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Success;
