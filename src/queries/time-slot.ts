import {type TimeSlotDto} from '../models/api/time-slot.model';
import {
	type QueryClient,
	queryOptions,
	useMutation,
	useQuery,
	useQueryClient,
	type QueryKey,
} from '@tanstack/react-query';
import {createTimeSlot, deleteTimeSlot, getTimeSlotById, updateTimeSlot, getAllTimeSlotsFromEvent, getAllTimeSlotsFromBoat} from '../services/time-slot-service';
import {boatQueryKeys} from './boat';

export const timeSlotKeys = {
	forEvent: (eventId: number) => ['time-slots', eventId] as QueryKey,
	forBoat: (eventId: number, boatId: number) => ['time-slots', eventId, 'boat', boatId] as QueryKey, // Todo! verify this gets invalidated at same time as above
	detail: (id: number) => ['time-slots', 'detail', id] as QueryKey,
};

export const timeslotsForEventOptions = (eventId: number) => queryOptions({
	queryKey: timeSlotKeys.forEvent(eventId),
	queryFn: async () => getAllTimeSlotsFromEvent(eventId),
});

export function useGetTimeSlotsForEvent(eventId: number) {
	return useQuery(timeslotsForEventOptions(eventId));
}

export const timeslotsForBoatOptions = (eventId: number, boatId: number) => queryOptions({
	queryKey: timeSlotKeys.forBoat(eventId, boatId),
	queryFn: async () => getAllTimeSlotsFromBoat(eventId, boatId),
});

export function useGetTimeSlotsForBoat(eventId: number, boatId: number) {
	return useQuery(timeslotsForBoatOptions(eventId, boatId));
}

export const timeslotDetailOptions = (id: number) => queryOptions({
	queryKey: timeSlotKeys.detail(id),
	queryFn: async () => getTimeSlotById(id),
});

export function useTimeSlotDetail(
	queryClient: QueryClient,
	id: number,
	eventId: number,
) {
	return useQuery({
		...timeslotDetailOptions(id),
		initialData() {
			const queryData: TimeSlotDto[] | undefined = queryClient
				.getQueryData(timeSlotKeys.forEvent(eventId));
			return queryData?.find(t => t.id === id);
		},
	});
}

export function useCreateTimeSlot(boatId: number, eventId: number) {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: createTimeSlot,
		async onSuccess() {
			await queryClient.invalidateQueries({queryKey: timeSlotKeys.forEvent(eventId)}); // Not exact to catch forBoat as well
			await queryClient.invalidateQueries({queryKey: boatQueryKeys.detail(eventId, boatId), exact: true});
		},
	});
}

// Todo! for below, invalidate all queries for schedule and bookings as well. but make sure not too many, so the same data will get reloaded x times..
export function useUpdateTimeSlot(id: number, eventId: number) {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (timeslot: TimeSlotDto) => updateTimeSlot(id, timeslot),
		async onSuccess(data) {
			await queryClient.invalidateQueries({queryKey: timeSlotKeys.detail(id), exact: true});
			await queryClient.invalidateQueries({queryKey: timeSlotKeys.forEvent(eventId)}); // Not exact to catch forBoat as well
			await queryClient.invalidateQueries({queryKey: boatQueryKeys.detail(eventId, data?.boatId ?? 0), exact: true});
		},
	});
}

// Todo! for below, invalidate all queries for schedule and bookings as well.
export function useDeleteTimeSlot(boatId: number, eventId: number) {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: deleteTimeSlot,
		async onSuccess() {
			await queryClient.invalidateQueries({queryKey: timeSlotKeys.forEvent(eventId)}); // Not exact to catch forBoat as well
			await queryClient.invalidateQueries({queryKey: boatQueryKeys.detail(eventId, boatId), exact: true});
		},
	});
}
