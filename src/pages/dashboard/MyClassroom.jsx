import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import LoadingPage from "../shared/LoadingPage";
import toast from "react-hot-toast";
import MyCourseCard from "./MyCourseCard";

const MyClassroom = () => {
  const [customLoading, setCustomLoading] = useState(false);
  const [customError, setCustomError] = useState("");
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    setCustomLoading(true);
    setCustomError("");
    const token = localStorage.getItem("token");
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_server}/api/course/my-classroom`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setCourses(response?.data?.data);
      } catch (error) {
        setCustomError(error?.response?.data?.message);
      } finally {
        setCustomLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (customLoading) {
    return <LoadingPage />;
  }

  if (customError && courses.length > 0) {
    toast.error(customError);
  }

  return (
    <div className="min-h-screen w-full px-4 py-8">
      <h1 className="text-center pb-6 text-2xl font-bold">My Classroom</h1>
      {courses?.length < 1 && (
        <div className="h-full flex justify-center items-center">
          <p className="text-red-600">There is no course found of you</p>
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {[...courses].reverse().map((course, index) => {
          return <MyCourseCard key={index} course={course} index={index} />;
        })}
      </div>
    </div>
  );
};

export default MyClassroom;
