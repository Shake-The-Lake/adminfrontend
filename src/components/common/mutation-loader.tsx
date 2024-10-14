import React from 'react';
import {useIsMutating} from '@tanstack/react-query';
import LoadingSpinner from '../animations/loading';

const MutationLoader: React.FC = () => {
	const isMutating = useIsMutating();
	return <LoadingSpinner isLoading={isMutating > 0} />;
};

export default MutationLoader;
