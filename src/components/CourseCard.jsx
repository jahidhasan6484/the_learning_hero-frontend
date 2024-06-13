/* eslint-disable react/prop-types */
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const CourseCard = ({ course, index }) => {
  const MAX_DESCRIPTION_LENGTH = 100;

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
        <Link to="" className="text-2xl font-bold hover:underline">
          {course.title}
        </Link>
        <p className="text-gray-700 text-sm -tracking-wide mt-1">
          {course.description.length > MAX_DESCRIPTION_LENGTH
            ? `${course.description.slice(0, MAX_DESCRIPTION_LENGTH)}...`
            : course.description}
        </p>
        <div className="mt-6 flex flex-row justify-between text-sm text-gray-500">
          <p>{course.instructor}</p>
          <p>{course.fee}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default CourseCard;
