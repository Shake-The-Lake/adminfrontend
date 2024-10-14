import React, {type ReactNode} from 'react';
import {motion} from 'framer-motion';

const animations = {
	initial: {y: 5, opacity: 0},
	animate: {y: 0, opacity: 1},
	exit: {y: -5, opacity: 0},
};

export type PageTransitionFadeInProps = {
	children: ReactNode;
	className?: string;
};

const PageTransitionFadeIn: React.FC<PageTransitionFadeInProps> = ({
	children,
	className,
}) => (
	<motion.div
		className={`w-full h-full ${className}`}
		variants={animations}
		initial="initial"
		animate="animate"
		exit="exit"
		transition={{duration: 0.4}}>
		{children}
	</motion.div>
);

export default PageTransitionFadeIn;
