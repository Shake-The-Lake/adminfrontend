import {type EventDto} from '../models/api/event.model';
import {
	type QueryClient,
	queryOptions,
	useMutation,
	useQuery,
	useQueryClient,
	type QueryKey,
} from '@tanstack/react-query';
import {
	getAllEvents,
	getEventById,
	createEvent,
	updateEvent,
	deleteEvent,
} from '../services/event-service';
import { mutationKeyGenerator } from '../lib/utils';

const identifier = 'events';
const baseQueryKey = [identifier] as QueryKey;
export const eventBasedBaseQueryKey = (eventId: number) => [identifier, eventId] as QueryKey;

export const eventQueryKeys = {
	all: () => baseQueryKey,
	detail: (id: number, expanded: boolean) =>
		[...eventBasedBaseQueryKey(id), 'detail', expanded] as QueryKey,
};

export const eventMutationKeys = mutationKeyGenerator(identifier);

export const eventsOptions = () => queryOptions({
	queryKey: eventQueryKeys.all(),
	queryFn: getAllEvents,
});

export function useGetEvents() {
	return useQuery(eventsOptions());
}

export const eventDetailOptions = (id: number, expanded = false) => queryOptions({
	queryKey: eventQueryKeys.detail(id, expanded),
	queryFn: async () => getEventById(id, expanded ? 'boats,boats.timeSlots,activityTypes' : undefined),
});

export function useEventDetail(
	queryClient: QueryClient,
	id: number,
	expanded: boolean,
) {
	return useQuery({
		...eventDetailOptions(id, expanded),
		initialData() {
			const queryData: EventDto[] | undefined = queryClient.getQueryData(
				eventQueryKeys.all(),
			);
			return queryData?.find((d) => d.id === id);
		},
	});
}

export function useCreateEvent() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationKey: eventMutationKeys.create,
		mutationFn: createEvent,
		async onSuccess() {
			await queryClient.invalidateQueries({queryKey: eventQueryKeys.all(), exact: true});
		},
	});
}

export function useUpdateEvent(id: number) {
	const queryClient = useQueryClient();
	return useMutation({
		mutationKey: eventMutationKeys.update,
		mutationFn: async (event: EventDto) => updateEvent(id, event),
		async onSuccess() {
			await queryClient.invalidateQueries({queryKey: eventQueryKeys.all(), exact: true});
			await queryClient.invalidateQueries({queryKey: eventBasedBaseQueryKey(id)});
		},
	});
}

export function useDeleteEvent() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationKey: eventMutationKeys.delete,
		mutationFn: deleteEvent,
		async onSuccess() {
			// deleting an entire event is enough of a change to justify reloading all queries
			await queryClient.invalidateQueries();  
		},
	});
}
