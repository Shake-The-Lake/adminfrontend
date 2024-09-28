import { motion } from "framer-motion";

const animations = {
  initial: { opacity: 0, x: -30 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 20 },
};

const AnimatedPage = ({ children }) => {
  return (
    <motion.div
      className="w-full h-full"
      variants={animations}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.8 }}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedPage;