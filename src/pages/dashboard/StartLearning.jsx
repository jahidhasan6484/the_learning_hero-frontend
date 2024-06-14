import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/firebase.config";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import LoadingPage from "../shared/LoadingPage";
import toast from "react-hot-toast";
import { convertToLocalBDT } from "../../utils/ConvertTime";

const StartLearning = () => {
  const [userFromAuth] = useAuthState(auth);

  const { id } = useParams();
  const [customLoading, setCustomLoading] = useState(true);
  const [customError, setCustomError] = useState("");
  const [course, setCourse] = useState({});
  const [haveAccess, setHaveAccess] = useState(false);

  useEffect(() => {
    setCustomLoading(true);
    setCustomError("");
    const token = localStorage.getItem("token");
    const checkAccess = async () => {
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_server
          }/api/course/check-access?courseId=${id}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setHaveAccess(response?.data?.access);
      } catch (error) {
        setCustomError(error?.response?.data?.message);
      } finally {
        setCustomLoading(false);
      }
    };

    checkAccess();
  }, [userFromAuth, id]);

  useEffect(() => {
    if (!haveAccess) {
      return;
    }
    setCustomLoading(true);
    setCustomError("");
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_server}/api/course/one?courseId=${id}`
        );

        setCourse(response?.data?.data);
      } catch (error) {
        setCustomError(error?.response?.data?.message);
      } finally {
        setCustomLoading(false);
      }
    };

    fetchCourses();
  }, [id, haveAccess]);

  if (customLoading) {
    return <LoadingPage />;
  }

  if (customError && Object.keys(course).length < 0) {
    toast.error(customError);
  }

  return (
    <div className="min-h-screen w-full px-6 py-8">
      <h1 className="text-center pb-6 text-2xl font-bold">Start Learning</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 mt-6 gap-4">
        <div className="col-span-2">
          {course.videoURL ? (
            <video className="w-full h-full lg:h-1/4" controls>
              <source src={course?.videoURL} />
              Your browser does not support the video tag or the video format.
            </video>
          ) : (
            <p className="text-center text-gray-500">
              No video now available for this course.
            </p>
          )}
        </div>
        <div>
          <p className="font-bold text-2xl">{course?.title}</p>
          <p>Instructor: {course?.instructor}</p>
          <p>Last Update: {convertToLocalBDT(course?.updatedAt)}</p>

          <p className="mt-4 ">{course?.description}</p>
        </div>
      </div>
    </div>
  );
};

export default StartLearning;
