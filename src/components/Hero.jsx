import Lottie from "react-lottie";
import { motion } from "framer-motion";
import animationData from "../../animation.json";

const Hero = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 1 } },
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="w-full max-w-md">
        <Lottie options={defaultOptions} isresponsive={true} />
      </div>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        className="flex flex-col justify-center items-center mt-4 gap-2"
      >
        <h1 className="text-2xl md:text-4xl font-bold">The Learning Hero</h1>
        <p className="text-sm md:text-md">
          Asia&apos;s Learning Nexus - Bridging Knowledge and Success
        </p>
      </motion.div>
    </div>
  );
};

export default Hero;
