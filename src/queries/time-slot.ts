import {type TimeSlotDto} from '../models/api/time-slot.model';
import {
	type QueryClient,
	queryOptions,
	useMutation,
	useQuery,
	useQueryClient,
	type QueryKey,
} from '@tanstack/react-query';
import {createTimeSlot, deleteTimeSlot, getTimeSlotById, updateTimeSlot, getAllTimeSlotsFromBoat, getAllTimeSlotsFromEvent} from '../services/time-slot-service';
import {boatKeys} from './boat';
import {type BoatDto} from '../models/api/boat.model';

export const timeSlotKeys = {
	forEvent: (eventId: number) => ['time-slots', eventId] as QueryKey,
	forBoat: (boatId: number) => ['time-slots', 'boat', boatId] as QueryKey,
	all: () => ['time-slots'] as QueryKey,
	detail: (id: number) => ['time-slots', 'boat', 'detail', id] as QueryKey,
};

export const timeslotsForEventOptions = (eventId: number) => queryOptions({
	queryKey: timeSlotKeys.forEvent(eventId),
	queryFn: async () => getAllTimeSlotsFromEvent(eventId),
});

export function useGetTimeSlotsForEvent(eventId: number) {
	return useQuery(timeslotsForEventOptions(eventId));
}

export const timeslotsForBoatOptions = (boatId: number, queryClient: QueryClient) => queryOptions({
	queryKey: timeSlotKeys.forBoat(boatId),
	queryFn: async () => getAllTimeSlotsFromBoat(boatId),
	initialData() {
		const queryData: BoatDto | undefined = queryClient.getQueryData(boatKeys.detail(boatId));
		return queryData?.timeSlots ? Array.from(queryData?.timeSlots) : [];
	},
});

export function useGetTimeSlotsForBoat(boatId: number) {
	const queryClient = useQueryClient();
	return useQuery(timeslotsForBoatOptions(boatId, queryClient));
}

export const timeslotDetailOptions = (id: number) => queryOptions({
	queryKey: timeSlotKeys.detail(id),
	queryFn: async () => getTimeSlotById(id),
});

export function useTimeSlotDetail(
	id: number,
) {
	return useQuery({
		...timeslotDetailOptions(id),
	});
}

export function useCreateTimeSlot(boatId: number) {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: createTimeSlot,
		async onSuccess(data) {
			if (data) {
				queryClient.setQueryData(timeSlotKeys.detail(data.id ?? 0), data);
			}

			await queryClient.invalidateQueries({queryKey: timeSlotKeys.forBoat(boatId), exact: true});
			await queryClient.invalidateQueries({queryKey: boatKeys.detail(boatId), exact: true});
		},
	});
}

export function useUpdateTimeSlot(id: number) {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (timeslot: TimeSlotDto) => updateTimeSlot(id, timeslot),
		async onSuccess(data) {
			queryClient.setQueryData(timeSlotKeys.detail(data?.id ?? 0), data);

			await queryClient.invalidateQueries({queryKey: timeSlotKeys.forBoat(data?.boatId ?? 0), exact: true});
			await queryClient.invalidateQueries({queryKey: boatKeys.detail(data?.boatId ?? 0), exact: true});
		},
	});
}

export function useDeleteTimeSlot(boatId: number) {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: deleteTimeSlot,
		async onSuccess() {
			await queryClient.invalidateQueries({queryKey: timeSlotKeys.forBoat(boatId), exact: true});
			await queryClient.invalidateQueries({queryKey: boatKeys.detail(boatId), exact: true});
		},
	});
}
