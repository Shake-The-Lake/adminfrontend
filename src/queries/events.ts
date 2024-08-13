import {type EventDto} from '../models/api/event.model';
import {
	type QueryClient,
	queryOptions,
	useMutation,
	useQuery,
	useQueryClient,
} from '@tanstack/react-query';
import {
	getAllEvents,
	getEventById,
	createEvent,
	updateEvent,
	deleteEvent,
} from '../services/event-service';

export const keys = {
	all: () => ['events'],
	detail: (id: number, expanded: boolean) => ['events', 'detail', {id, expanded}],
};

export const eventsOptions = () => queryOptions({
	queryKey: keys.all(),
	queryFn: getAllEvents,
});

export function useGetEvents() {
	return useQuery(eventsOptions());
}

export const eventDetailOptions = (id: number, expanded = false) => queryOptions({
	queryKey: keys.detail(id, expanded),
	queryFn: async () => getEventById(id, expanded ? 'boats,activityTypes' : undefined),
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
				keys.all(),
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
				queryClient.setQueryData([keys.detail(data.id ?? 0, false)], data);
			}

			await queryClient.invalidateQueries({queryKey: keys.all(), exact: true});
		},
	});
}

export function useUpdateEvent(id: number) {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (event: EventDto) => updateEvent(id, event),
		async onSuccess(data) {
			const oldData: EventDto | undefined = queryClient.getQueryData(
				keys.detail(id, true),
			);

			const newData: EventDto = {
				...data,
				boats: oldData?.boats,
				boatIds: oldData?.boatIds,
				activityTypes: oldData?.activityTypes,
				activityTypeIds: oldData?.activityTypeIds,
			};
			queryClient.setQueryData([keys.detail(id, false)], newData);
			queryClient.setQueryData([keys.detail(id, true)], newData);

			await queryClient.invalidateQueries({queryKey: keys.all(), exact: true});
		},
	});
}

export function useDeleteEvent() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: deleteEvent,
		async onSuccess() {
			await queryClient.invalidateQueries({queryKey: keys.all(), exact: true});
		},
	});
}
