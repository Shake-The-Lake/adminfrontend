import {motion} from 'framer-motion';

const animations = {
	initial: {y: 5, opacity: 0},
	animate: {y: 0, opacity: 1},
	exit: {y: -5, opacity: 0},
};

const PageTransitionFadeIn = ({children}) => {
	return (
		<motion.div
			className="w-full h-full"
			variants={animations}
			initial="initial"
			animate="animate"
			exit="exit"
			transition={{duration: 0.4}}>
			{children}
		</motion.div>
	);
};

export default PageTransitionFadeIn;
