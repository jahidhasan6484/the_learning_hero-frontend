/* eslint-disable react/prop-types */
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { VscDebugStart } from "react-icons/vsc";

const MyCourseCard = ({ course, index }) => {
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
        <h1 className="text-2xl font-bold">{course.title}</h1>

        <div className="mt-6 flex flex-row justify-between items-center text-sm ">
          <p className="text-gray-500">{course.instructor}</p>
          <Link
            to={`start-learning/${course._id}`}
            className="btn btn-sm btn-neutral text-white"
          >
            <VscDebugStart />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default MyCourseCard;
