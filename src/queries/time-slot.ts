import {type TimeSlotDto} from '../models/api/time-slot.model';
import {
	type QueryClient,
	queryOptions,
	useMutation,
	useQuery,
	useQueryClient,
	type QueryKey,
} from '@tanstack/react-query';
import {createTimeSlot, deleteTimeSlot, getTimeSlotById, updateTimeSlot, getAllTimeSlotsFromEvent} from '../services/time-slot-service';
import {boatKeys} from './boat';

export const timeSlotKeys = {
	forEvent: (eventId: number) => ['time-slots', eventId] as QueryKey,
	forBoat: (eventId: number, boatId: number) => ['time-slots', eventId, 'boat', boatId] as QueryKey, // Todo! verify this gets invalidated at same time as above
	detail: (id: number) => ['time-slots', 'boat', 'detail', id] as QueryKey,
};

export const timeslotsForEventOptions = (eventId: number) => queryOptions({
	queryKey: timeSlotKeys.forEvent(eventId),
	queryFn: async () => getAllTimeSlotsFromEvent(eventId),
});

export function useGetTimeSlotsForEvent(eventId: number) {
	return useQuery(timeslotsForEventOptions(eventId));
}

export const timeslotsForBoatOptions = (eventId: number, boatId: number, queryClient: QueryClient) => queryOptions({
	queryKey: timeSlotKeys.forBoat(eventId, boatId),
	queryFn: async () => useGetTimeSlotsForEvent(eventId).data?.filter(t => t.boatId === boatId) ?? [],
	initialData() {
		const queryData: TimeSlotDto[] | undefined = queryClient.getQueryData(timeSlotKeys.forEvent(eventId));
		return queryData?.filter(t => t.boatId === boatId);
	},
});

export function useGetTimeSlotsForBoat(eventId: number, boatId: number) {
	const queryClient = useQueryClient();
	return useQuery(timeslotsForBoatOptions(eventId, boatId, queryClient));
}

export const timeslotDetailOptions = (id: number) => queryOptions({
	queryKey: timeSlotKeys.detail(id),
	queryFn: async () => getTimeSlotById(id),
});

export function useTimeSlotDetail(
	id: number,
	eventId: number,
) {
	const queryClient = useQueryClient();
	return useQuery({
		...timeslotDetailOptions(id),
		initialData() {
			const queryData: TimeSlotDto[] | undefined = queryClient.getQueryData(timeSlotKeys.forEvent(eventId));
			return queryData?.find(t => t.id === id);
		},
	});
}

export function useCreateTimeSlot(boatId: number, eventId: number) {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: createTimeSlot,
		async onSuccess(data) {
			if (data) {
				queryClient.setQueryData(timeSlotKeys.detail(data.id ?? 0), data);
			}

			await queryClient.invalidateQueries({queryKey: timeSlotKeys.forEvent(eventId)});
			await queryClient.invalidateQueries({queryKey: boatKeys.detail(boatId), exact: true});
		},
	});
}

export function useUpdateTimeSlot(id: number, eventId: number) {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (timeslot: TimeSlotDto) => updateTimeSlot(id, timeslot),
		async onSuccess(data) {
			queryClient.setQueryData(timeSlotKeys.detail(data?.id ?? 0), data);

			await queryClient.invalidateQueries({queryKey: timeSlotKeys.forEvent(eventId)});
			// Await queryClient.invalidateQueries({queryKey: timeSlotKeys.forBoat(data?.boatId ?? 0), exact: true}); // todo! check if ok without
			await queryClient.invalidateQueries({queryKey: boatKeys.detail(data?.boatId ?? 0), exact: true});
		},
	});
}

export function useDeleteTimeSlot(boatId: number, eventId: number) {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: deleteTimeSlot,
		async onSuccess() {
			await queryClient.invalidateQueries({queryKey: timeSlotKeys.forEvent(eventId)});
			// Await queryClient.invalidateQueries({queryKey: timeSlotKeys.forBoat(boatId), exact: true}); // todo! check if ok without
			await queryClient.invalidateQueries({queryKey: boatKeys.detail(boatId), exact: true});
		},
	});
}
