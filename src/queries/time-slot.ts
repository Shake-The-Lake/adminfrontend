import { type TimeSlotDto } from '../models/api/time-slot.model';
import {
	type QueryClient,
	queryOptions,
	useMutation,
	useQuery,
	useQueryClient,
	type QueryKey,
} from '@tanstack/react-query';
import {
	createTimeSlot,
	deleteTimeSlot,
	getTimeSlotById,
	updateTimeSlot,
	getAllTimeSlotsFromEvent,
	getAllTimeSlotsFromBoat,
} from '../services/time-slot-service';
import { boatQueryKeys } from './boat';
import {
	getBaseQueryKey,
	invalidateFromBookingMetaDataRelevantQuery,
	mutationKeyGenerator,
} from './shared';

const identifier = 'time-slots';

const baseQueryKey = (eventId: number) => getBaseQueryKey(eventId, identifier);

export const timeSlotQueryKeys = {
	all: baseQueryKey,
	boatDetail: (eventId: number, boatId: number) =>
		[...baseQueryKey(eventId), 'boat-detail', boatId] as QueryKey,
	detail: (eventId: number, id: number) =>
		[...baseQueryKey(eventId), 'detail', id] as QueryKey,
};

export const timeSlotMutationKeys = mutationKeyGenerator(identifier);

export const timeslotsForEventOptions = (eventId: number) =>
	queryOptions({
		queryKey: timeSlotQueryKeys.all(eventId),
		queryFn: async () => getAllTimeSlotsFromEvent(eventId),
	});

export function useGetTimeSlotsForEvent(eventId: number) {
	return useQuery(timeslotsForEventOptions(eventId));
}

export const timeslotsForBoatOptions = (eventId: number, boatId: number) =>
	queryOptions({
		queryKey: timeSlotQueryKeys.boatDetail(eventId, boatId),
		queryFn: async () => getAllTimeSlotsFromBoat(eventId, boatId),
	});

export function useGetTimeSlotsForBoat(eventId: number, boatId: number) {
	return useQuery(timeslotsForBoatOptions(eventId, boatId));
}

export const timeslotDetailOptions = (eventId: number, id: number) =>
	queryOptions({
		queryKey: timeSlotQueryKeys.detail(eventId, id),
		queryFn: async () => getTimeSlotById(id),
	});

export function useTimeSlotDetail(eventId: number, id: number) {
	const queryClient = useQueryClient();

	return useQuery({
		...timeslotDetailOptions(eventId, id),
		initialData() {
			const queryData: TimeSlotDto[] | undefined = queryClient.getQueryData(
				timeSlotQueryKeys.all(eventId),
			);
			return queryData?.find((t) => t.id === id);
		},
	});
}

export function useCreateTimeSlot(eventId: number, boatId: number) {
	const queryClient = useQueryClient();
	return useMutation({
		mutationKey: timeSlotMutationKeys.create,
		mutationFn: createTimeSlot,
		async onSuccess(data) {
			await queriesToInvalidateOnCrud(
				queryClient,
				eventId,
				boatId,
				data?.id ?? 0,
				data,
			);
		},
	});
}

export function useUpdateTimeSlot(eventId: number, id: number) {
	const queryClient = useQueryClient();
	return useMutation({
		mutationKey: timeSlotMutationKeys.update,
		mutationFn: async (timeslot: TimeSlotDto) => updateTimeSlot(id, timeslot),
		async onSuccess(data) {
			await queriesToInvalidateOnCrud(
				queryClient,
				eventId,
				data?.boatId,
				id,
				data,
			);
		},
	});
}

export function useDeleteTimeSlot(eventId: number, boatId: number) {
	const queryClient = useQueryClient();
	return useMutation({
		mutationKey: timeSlotMutationKeys.delete,
		mutationFn: deleteTimeSlot,
		async onSuccess() {
			await queriesToInvalidateOnCrud(queryClient, eventId, boatId);
		},
	});
}

async function queriesToInvalidateOnCrud(
	queryClient: QueryClient,
	eventId: number,
	boatId?: number,
	timeSlotId?: number,
	data?: TimeSlotDto,
) {
	await invalidateFromBookingMetaDataRelevantQuery(queryClient, eventId); // Own invalidation is contained

	await queryClient.invalidateQueries({
		queryKey: boatQueryKeys.detail(eventId, boatId ?? 0),
		exact: true,
	});
}
