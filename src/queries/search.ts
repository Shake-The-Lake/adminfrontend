import {type QueryKey, type QueryClient, queryOptions, useQueryClient, useQuery} from '@tanstack/react-query';
import {type EventDto} from '../models/api/event.model';
import {getSearchParams} from '../services/search-service';
import {eventKeys} from './event';


export const searchKeys = {
	all: (eventId: number) => ['search-params', eventId] as QueryKey,
};

// Gets boats and activity types by event to use in selects
export const searchParamsOptions = (eventId: number, queryClient: QueryClient) => queryOptions({
	queryKey: searchKeys.all(eventId),
	queryFn: async () => getSearchParams(eventId),
	initialData() {
		const queryData: EventDto | undefined = queryClient.getQueryData(eventKeys.detail(eventId, true));
		return (queryData?.boats && queryData?.activityTypes) && {boats: queryData?.boats, activityTypes: queryData?.activityTypes};
	},
});

export function useGetSearchParameters(eventId: number) {
	const queryClient = useQueryClient();
	return useQuery(searchParamsOptions(eventId, queryClient));
}
