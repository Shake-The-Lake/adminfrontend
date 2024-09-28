import React from 'react';
import {useIsMutating} from '@tanstack/react-query';
import LoadingSpinner from '../animations/loading';

const MutationLoader: React.FC = () => {
	const isMutating = useIsMutating() > 0;
	return <LoadingSpinner isLoading={isMutating} />;
};

export default MutationLoader;
