import {type EventDto} from '../models/api/event.model';
import {type BoatDto} from '../models/api/boat.model';
import {
	type QueryClient,
	queryOptions,
	useMutation,
	useQuery,
	useQueryClient,
	type QueryKey,
} from '@tanstack/react-query';
import {createBoat, deleteBoat, getBoatById, getAllBoatsFromEvent, updateBoat} from '../services/boat-service';
import {eventKeys} from './event';

export const boatKeys = {
	all: (eventId: number) => ['boats', eventId] as QueryKey,
	detail: (id: number) => ['boats', 'detail', id] as QueryKey,
};

export const boatsOptions = (eventId: number, queryClient: QueryClient) => queryOptions({
	queryKey: boatKeys.all(eventId),
	queryFn: async () => getAllBoatsFromEvent(eventId),
	initialData() {
		const queryData: EventDto | undefined = queryClient.getQueryData(eventKeys.detail(eventId, true));
		return queryData?.boats;
	},
});

export function useGetBoats(eventId: number) {
	const queryClient = useQueryClient();
	return useQuery(boatsOptions(eventId, queryClient));
}

export const boatDetailOptions = (id: number) => queryOptions({
	queryKey: boatKeys.detail(id),
	queryFn: async () => getBoatById(id),
});

export function useBoatDetail(
	id: number,
	eventId: number,
) {
	const queryClient = useQueryClient();
	return useQuery({
		...boatDetailOptions(id),
		initialData() {
			const queryData: BoatDto[] | undefined = queryClient.getQueryData(
				boatKeys.all(eventId),
			);
			return queryData?.find((d) => d.id === eventId);
		},
	});
}

export function useCreateBoat(eventId: number) {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: createBoat,
		async onSuccess(data) {
			if (data) {
				queryClient.setQueryData(boatKeys.detail(data.id ?? 0), data);
			}

			await queryClient.invalidateQueries({queryKey: boatKeys.all(eventId), exact: true});
			await queryClient.invalidateQueries({queryKey: eventKeys.detail(eventId, true), exact: true});
		},
	});
}

export function useUpdateBoat(id: number) {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (boat: BoatDto) => updateBoat(id, boat),
		async onSuccess(data) {
			queryClient.setQueryData(boatKeys.detail(data?.id ?? 0), data);

			await queryClient.invalidateQueries({queryKey: boatKeys.all(data?.eventId ?? 0), exact: true});
			await queryClient.invalidateQueries({queryKey: eventKeys.detail(data?.eventId ?? 0, true), exact: true});
		},
	});
}

export function useDeleteBoat(eventId: number) {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: deleteBoat,
		async onSuccess() {
			await queryClient.invalidateQueries({queryKey: boatKeys.all(eventId), exact: true});
			await queryClient.invalidateQueries({queryKey: eventKeys.detail(eventId, true), exact: true});
		},
	});
}
