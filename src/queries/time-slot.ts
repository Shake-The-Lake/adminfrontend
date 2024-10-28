import {type TimeSlotDto} from '../models/api/time-slot.model';
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
import {boatQueryKeys} from './boat';
import {mutationKeyGenerator} from '../lib/utils';
import {eventBasedBaseQueryKey} from './event';

const identifier = 'time-slots';

const baseQueryKey = (eventId: number) =>
	[...eventBasedBaseQueryKey(eventId), identifier] as QueryKey;

export const timeSlotQueryKeys = {
	forEvent: baseQueryKey,
	forBoat: (eventId: number, boatId: number) =>
		[...baseQueryKey(eventId), 'boat', boatId] as QueryKey, // Todo! verify this gets invalidated at same time as above
	detail: (eventId: number, id: number) =>
		[...baseQueryKey(eventId), 'detail', id] as QueryKey,
};

export const timeSlotMutationKeys = mutationKeyGenerator(identifier);

export const timeslotsForEventOptions = (eventId: number) =>
	queryOptions({
		queryKey: timeSlotQueryKeys.forEvent(eventId),
		queryFn: async () => getAllTimeSlotsFromEvent(eventId),
	});

export function useGetTimeSlotsForEvent(eventId: number) {
	return useQuery(timeslotsForEventOptions(eventId));
}

export const timeslotsForBoatOptions = (eventId: number, boatId: number) =>
	queryOptions({
		queryKey: timeSlotQueryKeys.forBoat(eventId, boatId),
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

export function useTimeSlotDetail(
	queryClient: QueryClient,
	eventId: number,
	id: number,
) {
	return useQuery({
		...timeslotDetailOptions(eventId, id),
		initialData() {
			const queryData: TimeSlotDto[] | undefined = queryClient.getQueryData(
				timeSlotQueryKeys.forEvent(eventId),
			);
			return queryData?.find((t) => t.id === id);
		},
	});
}

export function useCreateTimeSlot(boatId: number, eventId: number) {
	const queryClient = useQueryClient();
	return useMutation({
		mutationKey: timeSlotMutationKeys.create,
		mutationFn: createTimeSlot,
		async onSuccess(data) {
			await queriesToInvalidateOnCrud(queryClient, eventId, boatId, data?.id ?? 0, data);
		},
	});
}

export function useUpdateTimeSlot(id: number, eventId: number) {
	const queryClient = useQueryClient();
	return useMutation({
		mutationKey: timeSlotMutationKeys.update,
		mutationFn: async (timeslot: TimeSlotDto) => updateTimeSlot(id, timeslot),
		async onSuccess(data) {
			await queriesToInvalidateOnCrud(queryClient, eventId, data?.boatId, id, data);
		},
	});
}

export function useDeleteTimeSlot(boatId: number, eventId: number) {
	const queryClient = useQueryClient();
	return useMutation({
		mutationKey: timeSlotMutationKeys.delete,
		mutationFn: deleteTimeSlot,
		async onSuccess() {
			await queriesToInvalidateOnCrud(queryClient, eventId, boatId);
		},
	});
}

// Todo! for below, invalidate all queries for schedule and bookings as well.
async function queriesToInvalidateOnCrud(
	queryClient: QueryClient,
	eventId: number,
	boatId?: number,
	timeSlotId?: number,
	data?: TimeSlotDto,
) {
	await queryClient.invalidateQueries({queryKey: baseQueryKey(eventId)}); // Not exact to catch forBoat as well
	await queryClient.invalidateQueries({
		queryKey: boatQueryKeys.detail(eventId, boatId ?? 0),
		exact: true,
	});
}
