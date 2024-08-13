import {type EventDto} from '../models/api/event.model';
import {
	QueryClient,
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
	detail: (id: number, expand?: string) => ['events', 'detail', {id, expand}],
};

export const eventsOptions = () => {
	return queryOptions({
		queryKey: keys.all(),
		queryFn: getAllEvents,
	});
};

export function useGetEvents() {
	return useQuery(eventsOptions());
}

export const eventDetailOptions = (id: number, expand = '') => {
	return queryOptions({
		queryKey: keys.detail(id, expand),
		queryFn: async () => getEventById(id, expand),
	});
};

export function useEventDetail(
	queryClient: QueryClient,
	id: number,
	expand = '',
) {
	return useQuery({
		...eventDetailOptions(id, expand),
		initialData: () => {
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
		onSuccess: () => {
			queryClient.invalidateQueries({queryKey: keys.all(), exact: true});
		},
	});
}

export function useUpdateEvent(id: number, event: EventDto) {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async () => updateEvent(id, event),
		onSuccess: () => {
			queryClient.invalidateQueries({queryKey: keys.all(), exact: true});
			queryClient.invalidateQueries({queryKey: keys.detail(id)});
		},
	});
}

export function useDeleteEvent() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: deleteEvent,
		onSuccess: () => {
			queryClient.invalidateQueries({queryKey: keys.all(), exact: true});
		},
	});
}
