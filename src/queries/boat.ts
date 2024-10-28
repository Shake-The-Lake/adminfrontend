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
import {
	createBoat,
	deleteBoat,
	getBoatById,
	getAllBoatsFromEvent,
	updateBoat,
} from '../services/boat-service';
import {eventQueryKeys} from './event';
import {
	getBaseQueryKey,
	invalidateAllQueriesOfEventFor,
	invalidateFromNavigationStructureRelevantQuery,
	invalidateFromSelectSearchParamsRelevantQuery,
	mutationKeyGenerator,
} from './shared';

const identifier = 'boats';

const baseQueryKey = (eventId: number) => getBaseQueryKey(eventId, identifier);

export const boatQueryKeys = {
	all: baseQueryKey,
	detail: (eventId: number, id: number) =>
		[...baseQueryKey(eventId), 'detail', id] as QueryKey,
};

export const boatMutationKeys = mutationKeyGenerator(identifier);

export const boatsOptions = (eventId: number, queryClient: QueryClient) =>
	queryOptions({
		queryKey: boatQueryKeys.all(eventId),
		queryFn: async () => getAllBoatsFromEvent(eventId),
		initialData() {
			const queryData: EventDto | undefined = queryClient.getQueryData(
				eventQueryKeys.detail(eventId, true),
			);
			return queryData?.boats;
		},
	});

export function useGetBoats(eventId: number) {
	const queryClient = useQueryClient();
	return useQuery(boatsOptions(eventId, queryClient));
}

export const boatDetailOptions = (eventId: number, id: number) =>
	queryOptions({
		queryKey: boatQueryKeys.detail(eventId, id),
		queryFn: async () => getBoatById(id),
	});

export function useBoatDetail(eventId: number, id: number) {
	const queryClient = useQueryClient();

	return useQuery({
		...boatDetailOptions(eventId, id),
		initialData() {
			const queryData: BoatDto[] | undefined = queryClient.getQueryData(
				boatQueryKeys.all(eventId),
			);
			return queryData?.find((d) => d.id === eventId);
		},
	});
}

export function useCreateBoat(eventId: number) {
	const queryClient = useQueryClient();
	return useMutation({
		mutationKey: boatMutationKeys.create,
		mutationFn: createBoat,
		async onSuccess(data) {
			await queriesToInvalidateOnCrud(
				queryClient,
				eventId,
				data?.id ?? 0,
				data,
			);
		},
	});
}

export function useUpdateBoat(eventId: number, id: number) {
	const queryClient = useQueryClient();
	return useMutation({
		mutationKey: boatMutationKeys.update,
		mutationFn: async (boat: BoatDto) => updateBoat(id, boat),
		async onSuccess(data) {
			await queriesToInvalidateOnCrud(queryClient, eventId, id, data);
		},
	});
}

export function useDeleteBoat(eventId: number) {
	const queryClient = useQueryClient();
	return useMutation({
		mutationKey: boatMutationKeys.delete,
		mutationFn: deleteBoat,
		async onSuccess() {
			await queriesToInvalidateOnCrud(queryClient, eventId);
		},
	});
}

async function queriesToInvalidateOnCrud(
	queryClient: QueryClient,
	eventId: number,
	boatId?: number,
	data?: BoatDto,
) {
	await invalidateAllQueriesOfEventFor(identifier, eventId, queryClient);

	// Todo! timeslot query;
	// todo! verify what happens on boat or timeslot deletion, especially if it already has bookings?!

	await invalidateFromNavigationStructureRelevantQuery(eventId, queryClient);

	await invalidateFromSelectSearchParamsRelevantQuery(eventId, queryClient);
}
