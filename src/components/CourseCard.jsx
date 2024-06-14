/* eslint-disable react/prop-types */
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { MdTipsAndUpdates, MdDeleteOutline } from "react-icons/md";
import { useState } from "react";
import LoadingPage from "../pages/shared/LoadingPage";
import toast from "react-hot-toast";
import axios from "axios";

const CourseCard = ({ course, index, dashboard, onDelete }) => {
  const [customLoading, setCustomLoading] = useState(false);
  const [customError, setCustomError] = useState("");

  const MAX_DESCRIPTION_LENGTH = 110;

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
      },
    }),
    hover: { scale: 1.05, boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)" },
  };

  const handleDelete = async () => {
    const isAgree = window.confirm(
      "Are you sure you want to delete this course?"
    );

    if (!isAgree) {
      return;
    }

    try {
      setCustomLoading(true);
      setCustomError("");
      const token = localStorage.getItem("token");

      const response = await axios.delete(
        `${import.meta.env.VITE_server}/api/course/delete?courseId=${
          course._id
        }`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(response.data.message);
      onDelete(course._id);
    } catch (error) {
      setCustomError(error?.response?.data?.message);
    } finally {
      setCustomLoading(false);
    }
  };

  if (customLoading) {
    return <LoadingPage />;
  }

  if (customError) {
    toast.error(customError);
  }
  return (
    <motion.div
      className="border rounded-lg shadow-md"
      custom={index}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      variants={cardVariants}
    >
      <img src={course.bannerURL} alt={course.title} className="w-full mb-4" />
      <div className="px-6 py-4">
        {dashboard ? (
          <h1 className="text-2xl font-bold">{course.title}</h1>
        ) : (
          <Link
            to={`/details/${course._id}`}
            className="text-2xl font-bold hover:underline"
          >
            {course.title}
          </Link>
        )}

        <p className="text-gray-700 text-sm -tracking-wide mt-1">
          {course.description.length > MAX_DESCRIPTION_LENGTH
            ? `${course.description.slice(0, MAX_DESCRIPTION_LENGTH)}...`
            : course.description}
        </p>
        <div className="mt-6 flex flex-row justify-between text-sm text-gray-500">
          <p>{course.instructor}</p>
          <p>৳ {course.fee}</p>
        </div>
        {dashboard && (
          <div className="flex flex-row justify-end items-center mt-4 gap-1">
            <Link
              to={`update/${course._id}`}
              className="btn btn-sm btn-circle bg-yellow-500 text-white"
            >
              <MdTipsAndUpdates />
            </Link>
            <button
              onClick={handleDelete}
              className="btn btn-sm text-sm btn-circle bg-red-600 text-white"
              disabled={customLoading}
            >
              <MdDeleteOutline />
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default CourseCard;
