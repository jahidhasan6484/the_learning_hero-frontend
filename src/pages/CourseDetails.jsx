import toast from "react-hot-toast";
import LoadingPage from "./shared/LoadingPage";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { IoIosPerson } from "react-icons/io";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebase.config";

const CourseDetails = () => {
  const navigate = useNavigate();
  const [userFromAuth] = useAuthState(auth);

  const { id } = useParams();
  const [customLoading, setCustomLoading] = useState(true);
  const [customError, setCustomError] = useState("");
  const [course, setCourse] = useState({});
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    setCustomLoading(true);
    setCustomError("");
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_server
          }/course/one-with-suggestion?courseId=${id}`
        );

        setCourse(response?.data?.data);
        setSuggestions(response?.data?.suggestions);
      } catch (error) {
        setCustomError(error?.response?.data?.message);
      } finally {
        setCustomLoading(false);
      }
    };

    fetchCourses();
  }, [id]);

  if (customLoading) {
    return <LoadingPage />;
  }

  if (customError && course.length > 0) {
    toast.error(customError);
  }

  const handlePayment = async () => {
    if (!userFromAuth) {
      navigate("/login", { replace: true });
    }

    const data = {
      fee: course?.fee,
      courseId: course?._id,
    };

    try {
      setCustomLoading(true);
      setCustomError("");
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${import.meta.env.VITE_server}/payment/pay-now`,
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

  return (
    <div className="min-h-screen container mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 py-12">
        <div className="lg:col-span-2 flex flex-col gap-4 ">
          <div>
            <h1 className="text-4xl font-bold text-center">{course?.title}</h1>
            <div className="mt-6">
              <p className="flex items-center justify-center gap-1">
                <IoIosPerson /> <span className="font-bold">Instructor: </span>{" "}
                {course?.instructor}
              </p>
            </div>
          </div>
          <div className="w-full">
            <img src={course.bannerURL} alt={course.title}></img>
          </div>
          <div>
            <p>{course.description}</p>
          </div>
        </div>
        <div className="flex flex-col gap-8">
          <div className="bg-white py-12 px-6 rounded-lg">
            <h1 className="text-center font-bold text-xl mb-4">Payment</h1>
            <p>
              Course Name: <span className="font-bold">{course.title}</span>
            </p>
            <p>
              Course Fee: <span className="font-bold">৳ {course.fee}</span>
            </p>

            <button
              onClick={handlePayment}
              className="mt-4 btn btn-sm bg-neutral text-white"
            >
              Pay Now
            </button>
          </div>
          <div className="bg-white py-12 px-6 rounded-lg flex flex-col gap-6">
            <h1 className="text-center font-bold text-xl mb-4">
              Popular Courses
            </h1>
            {suggestions?.map(({ bannerURL, title, _id }, index) => {
              return (
                <Link
                  to={`/details/${_id}`}
                  key={index}
                  className="flex justify-start items-center gap-4"
                >
                  <img src={bannerURL} alt={title} className="w-24 h-24"></img>
                  <h1>{title}</h1>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
