import toast from "react-hot-toast";
import LoadingPage from "./shared/LoadingPage";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebase.config";

const CourseDetails = () => {
  const navigate = useNavigate();
  const [userFromAuth] = useAuthState(auth);

  const { id } = useParams();
  const [customLoading, setCustomLoading] = useState(true);
  const [customError, setCustomError] = useState("");
  const [course, setCourse] = useState({});
  const [haveAccess, setHaveAccess] = useState(false);

  useEffect(() => {
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
  }, [id]);

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

  if (customLoading) {
    return <LoadingPage />;
  }

  if (customError && Object.keys(course).length < 0) {
    toast.error(customError);
  }

  const handleEnrollIn = async () => {
    if (!userFromAuth) {
      navigate("/login", { replace: true });
      return;
    }

    const data = {
      fee: course?.fee,
      courseId: course?._id,
    };

    const queryString = new URLSearchParams({
      data: JSON.stringify(data),
    }).toString();
    navigate(`/confirm-payment?${queryString}`, { replace: true });
  };

  const handleVideoPlay = (e) => {
    if (!userFromAuth) {
      e.preventDefault();
      e.target.pause();
      toast.error("Please log in to watch the video.");
      return;
    }

    if (useAuthState && !haveAccess) {
      e.preventDefault();
      e.target.pause();
      toast.error("Purchase course to watch the video.");
      return;
    }
  };

  return (
    <div className="min-h-screen container mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 px-6 py-12">
        <div className="lg:col-span-2 flex flex-col gap-4 ">
          <div>
            <h1 className="text-4xl font-bold text-center">{course?.title}</h1>
            <div className="mt-6 flex flex-row justify-between">
              <p>
                <span className="font-bold">Instructor: </span>{" "}
                {course?.instructor}
              </p>
              <p>
                <span className="font-bold">Already Enrolled: </span>{" "}
                {course?.enrollments}
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
          {!haveAccess && (
            <div className="bg-white py-12 px-6 rounded-lg">
              <h1 className="text-center font-bold text-xl mb-4">
                Course Details
              </h1>
              <p>
                Course Name: <span className="font-bold">{course.title}</span>
              </p>
              <p>
                Course Fee: <span className="font-bold">৳ {course.fee}</span>
              </p>

              <button
                onClick={handleEnrollIn}
                className="mt-4 btn btn-sm bg-neutral text-white"
              >
                Enroll In
              </button>
            </div>
          )}
          <div className="bg-white py-12 px-6 rounded-lg flex flex-col gap-6">
            <h1 className="text-center font-bold text-xl mb-4">Course Video</h1>
            {!customLoading && course.videoURL ? (
              <video className="w-full" controls onPlay={handleVideoPlay}>
                <source src={course?.videoURL} />
                Your browser does not support the video tag or the video format.
              </video>
            ) : (
              <p className="text-center text-gray-500">
                No video now available for this course.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
