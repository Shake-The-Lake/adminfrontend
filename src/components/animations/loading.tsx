import React from 'react';

type LoadingSpinnerProps = {
	isLoading: boolean;
};

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({isLoading}) => {
	if (!isLoading) {
		return null;
	}

	return (
		<div className="fixed inset-0 flex items-center justify-center z-50">
			<div className="animate-spin rounded-full h-16 w-16 border-t-4 border-primary"></div>
		</div>
	);
};

export default LoadingSpinner;
