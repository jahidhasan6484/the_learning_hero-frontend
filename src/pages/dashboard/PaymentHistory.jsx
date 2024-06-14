import axios from "axios";
import { useEffect, useState } from "react";
import LoadingPage from "../shared/LoadingPage";
import toast from "react-hot-toast";
import { convertToLocalBDT } from "../../utils/ConvertTime";

const PaymentHistory = () => {
  const [customLoading, setCustomLoading] = useState(false);
  const [customError, setCustomError] = useState("");
  const [paymentHistory, setPaymentHistory] = useState([]);

  useEffect(() => {
    setCustomLoading(true);
    setCustomError("");
    const token = localStorage.getItem("token");
    const fetchPaymentHistory = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_server}/api/course/payment-history`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setPaymentHistory(response?.data?.data);
      } catch (error) {
        setCustomError(error?.response?.data?.message);
      } finally {
        setCustomLoading(false);
      }
    };

    fetchPaymentHistory();
  }, []);

  if (customLoading) {
    return <LoadingPage />;
  }

  if (customError && paymentHistory.length > 0) {
    toast.error(customError);
  }

  console.log(paymentHistory);

  return (
    <div className="min-h-screen container mx-auto overflow-x-auto px-4 py-8 flex flex-col">
      <h1 className="text-center pb-6 text-2xl font-bold">Payment History</h1>

      {paymentHistory.length < 1 ? (
        <div className="flex-grow flex justify-center items-center">
          <p className="text-center">No payment history found!</p>
        </div>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>Transaction ID</th>
              <th>Course Name</th>
              <th>Amount</th>
              <th>Pay At</th>
            </tr>
          </thead>
          {paymentHistory?.map((payment, index) => {
            const { title, transactionId, fee, createdAt } = payment;
            return (
              <tbody key={index}>
                <tr>
                  <th>1</th>
                  <td>{transactionId}</td>
                  <td>{title}</td>
                  <td>{fee}</td>
                  <td>{convertToLocalBDT(createdAt)}</td>
                </tr>
              </tbody>
            );
          })}
        </table>
      )}
    </div>
  );
};

export default PaymentHistory;
