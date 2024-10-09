import {type QueryKey, type QueryClient, queryOptions, useQueryClient, useQuery} from '@tanstack/react-query';
import {type EventDto} from '../models/api/event.model';
import {getSearchParams} from '../services/search-service';
import {eventBasedBaseQueryKey, eventQueryKeys} from './event';

const identifier = 'search-params';

const baseQueryKey = (eventId: number) =>
	[...eventBasedBaseQueryKey(eventId), identifier] as QueryKey;

export const searchKeys = {
	all: baseQueryKey,
};

// Gets boats and activity types by event to use in selects
export const searchParamsOptions = (eventId: number, queryClient: QueryClient) => queryOptions({
	queryKey: searchKeys.all(eventId),
	queryFn: async () => getSearchParams(eventId),
	initialData() {
		const queryData: EventDto | undefined = queryClient.getQueryData(eventQueryKeys.detail(eventId, true));
		return (queryData?.boats && queryData?.activityTypes) && {boats: queryData?.boats, activityTypes: queryData?.activityTypes};
	},
});

export function useGetSearchParameters(eventId: number) {
	const queryClient = useQueryClient();
	return useQuery(searchParamsOptions(eventId, queryClient));
}
