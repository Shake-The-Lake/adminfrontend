import {type EventDto} from '../models/api/event.model';
import {
	type QueryClient,
	type QueryKey,
	queryOptions,
	useMutation,
	useQuery,
	useQueryClient,
} from '@tanstack/react-query';
import {
	createEvent,
	deleteEvent,
	getAllEvents,
	getEventById,
	updateEvent,
} from '../services/event-service';

export const eventKeys = {
	all: () => ['events'] as QueryKey,
	detail: (id: number, expanded: boolean) =>
		['events', 'detail', id, expanded] as QueryKey,
};

export const eventsOptions = () =>
	queryOptions({
		queryKey: eventKeys.all(),
		queryFn: getAllEvents,
	});

export function useGetEvents() {
	return useQuery(eventsOptions());
}

export const eventDetailOptions = (id: number, expanded = false) =>
	queryOptions({
		queryKey: eventKeys.detail(id, expanded),
		queryFn: async () =>
			getEventById(id, expanded ? 'boats,activityTypes' : undefined),
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
				eventKeys.all(),
			);
			return queryData?.find((d) => d.id === id);
		},
	});
}

export function useCreateEvent() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: createEvent,
		async onSuccess(data) {
			if (data) {
				queryClient.setQueryData(eventKeys.detail(data.id ?? 0, false), data);
			}
			await queryClient.invalidateQueries({
				queryKey: eventKeys.all(),
				exact: true,
			});
		},
	});
}

export function useUpdateEvent(id: number) {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (event: EventDto) => updateEvent(id, event),
		async onSuccess(data) {
			const oldData: EventDto | undefined = queryClient.getQueryData(
				eventKeys.detail(id, true),
			);

			const newData: EventDto = {
				...data,
				boats: oldData?.boats,
				boatIds: oldData?.boatIds,
				activityTypes: oldData?.activityTypes,
				activityTypeIds: oldData?.activityTypeIds,
			};
			queryClient.setQueryData(eventKeys.detail(id, false), newData);
			queryClient.setQueryData(eventKeys.detail(id, true), newData);

			await queryClient.invalidateQueries({
				queryKey: eventKeys.all(),
				exact: true,
			});
		},
	});
}

export function useDeleteEvent() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: deleteEvent,
		async onSuccess() {
			await queryClient.invalidateQueries({
				queryKey: eventKeys.all(),
				exact: true,
			});
		},
	});
}
