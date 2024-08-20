import {type EventDto} from '../models/api/event.model';
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
import {keys as boatKeys} from './boat';
import {type BoatDto} from '../models/api/boat.model';

export const keys = {
	forEvent: (eventId: number) => ['time-slots', eventId] as QueryKey,
	forBoat: (boatId: number) => ['time-slots', 'boat', boatId] as QueryKey,
	detail: (id: number) => ['time-slots', 'boat', 'detail', id] as QueryKey,
};

export const timeslotsForEventOptions = (eventId: number) => queryOptions({
	queryKey: keys.forEvent(eventId),
	queryFn: async () => getAllTimeSlotsFromEvent(eventId),
});

export function useGetTimeSlotsForEvent(eventId: number) {
	return useQuery(timeslotsForEventOptions(eventId));
}

export const timeslotsForBoatOptions = (boatId: number, queryClient: QueryClient) => queryOptions({
	queryKey: keys.forBoat(boatId),
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
	queryKey: keys.detail(id),
	queryFn: async () => getTimeSlotById(id),
});

export function useTimeSlotDetail(
	id: number,
	boatId: number,
) {
	const queryClient = useQueryClient();
	return useQuery({
		...timeslotDetailOptions(id),
		initialData() {
			const queryData: TimeSlotDto[] | undefined = queryClient.getQueryData(
				keys.forBoat(boatId),
			);
			return queryData?.find((d) => d.id === boatId);
		},
	});
}

export function useCreateTimeSlot(boatId: number) {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: createTimeSlot,
		async onSuccess(data) {
			if (data) {
				queryClient.setQueryData(keys.detail(data.id ?? 0), data);
			}

			await queryClient.invalidateQueries({queryKey: keys.forBoat(boatId), exact: true});
			await queryClient.invalidateQueries({queryKey: boatKeys.detail(boatId), exact: true});
		},
	});
}

export function useUpdateTimeSlot(id: number) {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (timeslot: TimeSlotDto) => updateTimeSlot(id, timeslot),
		async onSuccess(data) {
			queryClient.setQueryData(keys.detail(data?.id ?? 0), data);

			await queryClient.invalidateQueries({queryKey: keys.forBoat(data?.boatId ?? 0), exact: true});
			await queryClient.invalidateQueries({queryKey: boatKeys.detail(data?.boatId ?? 0), exact: true});
		},
	});
}

export function useDeleteTimeSlot(boatId: number) {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: deleteTimeSlot,
		async onSuccess() {
			await queryClient.invalidateQueries({queryKey: keys.forBoat(boatId), exact: true});
			await queryClient.invalidateQueries({queryKey: boatKeys.detail(boatId), exact: true});
		},
	});
}
