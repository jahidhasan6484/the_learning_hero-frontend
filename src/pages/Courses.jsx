import { useEffect, useState } from "react";
import CourseCard from "../components/CourseCard";
import axios from "axios";
import LoadingPage from "./shared/LoadingPage";
import toast from "react-hot-toast";

const Courses = () => {
  const [customLoading, setCustomLoading] = useState(false);
  const [customError, setCustomError] = useState("");
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    setCustomLoading(true);
    setCustomError("");
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_server}/course/all`
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
    <div className="min-h-screen container mx-auto px-4 py-8">
      <h1 className="text-center pb-6 text-2xl font-bold">Latest Courses</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {[...courses].reverse().map((course, index) => {
          return (
            <CourseCard
              key={index}
              course={course}
              index={index}
              dashboard={false}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Courses;
