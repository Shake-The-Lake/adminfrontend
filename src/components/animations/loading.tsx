import React, { useEffect } from 'react';

type LoadingSpinnerProps = {
	isLoading: boolean;
};

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ isLoading }) => {

useEffect(() => {
		if (isLoading) {
			// Disable scroll by setting overflow to hidden
			document.body.style.overflow = 'hidden';
			document.body.style.height = '100%'; // Ensure body takes full height
		} else {
			// Re-enable scroll
			document.body.style.overflow = '';
			document.body.style.height = '';
		}
		
		// Cleanup function to revert changes when component unmounts
		return () => {
			document.body.style.overflow = '';
			document.body.style.height = '';
		};
	}, [isLoading]);
	
	if (!isLoading) {
		return null;
	}
	return (
		<div className="fixed inset-0 flex items-center justify-center z-50">
			<div className="absolute inset-0 backdrop-blur-sm z-40"></div>

			<div className="z-50 animate-spin rounded-full h-16 w-16 border-t-4 border-primary"></div>
		</div>
	);
};

export default LoadingSpinner;
