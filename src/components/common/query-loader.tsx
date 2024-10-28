import React from 'react';
import {useIsFetching, useIsMutating} from '@tanstack/react-query';
import LoadingSpinner from '../animations/loading';

const QueryLoader: React.FC = () => {
	const isFetching = useIsFetching();
	const isMutating = useIsMutating();

	return <LoadingSpinner isLoading={isFetching > 0 && isMutating === 0} />;
};

export default QueryLoader;
