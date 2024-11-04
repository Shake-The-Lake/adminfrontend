import {type BookingSearchParams} from '../models/api/booking-search.model';
import {
	type QueryClient,
	type QueryKey,
	queryOptions,
	useMutation,
	useQuery,
	useQueryClient,
} from '@tanstack/react-query';
import {
	deleteBooking,
	getBookingsByEventId,
	searchBookings,
} from '../services/booking-search-service';
import {
	createBooking,
	getBookingById,
	updateBooking,
} from '../services/booking-service';
import {type BookingDto} from '../models/api/booking.model';
import {
	getBaseQueryKey,
	invalidateAllQueriesOfEventFor,
	mutationKeyGenerator,
} from './shared';
import {timeSlotQueryKeys} from './time-slot';

const identifier = 'bookings';

const baseQueryKey = (eventId: number) => getBaseQueryKey(eventId, identifier);

export const bookingQueryKeys = {
	all: baseQueryKey,
	search: (eventId: number, params: BookingSearchParams) =>
		[...baseQueryKey(eventId), 'search', params] as QueryKey,
	detail: (eventId: number, id: number, expanded: boolean) =>
		[...baseQueryKey(eventId), 'detail', id, expanded] as QueryKey,
};

export const bookingMutationKeys = mutationKeyGenerator(identifier);

export const bookingsOptions = (eventId: number) =>
	queryOptions({
		queryKey: bookingQueryKeys.all(eventId),
		queryFn: async () => getBookingsByEventId(eventId),
	});

export const bookingsSearchOptions = (
	eventId: number,
	params: BookingSearchParams,
	queryClient: QueryClient,
) =>
	queryOptions({
		queryKey: bookingQueryKeys.search(eventId, params),
		queryFn: async () => searchBookings(eventId, params),
		initialData() {
			return queryClient.getQueryData(bookingQueryKeys.all(eventId));
		},
	});

export function useSearchBookings(
	eventId: number,
	params: BookingSearchParams,
) {
	const queryClient = useQueryClient();
	return useQuery(bookingsSearchOptions(eventId, params, queryClient));
}

export const bookingDetailOptions = (eventId: number, id: number) =>
	queryOptions({
		queryKey: bookingQueryKeys.detail(eventId, id, true),
		queryFn: async () => getBookingById(id, 'person'),
	});

export function useBookingDetail(eventId: number, id: number) {
	return useQuery(bookingDetailOptions(eventId, id));
}

export function useCreateBooking(eventId: number) {
	const queryClient = useQueryClient();
	return useMutation({
		mutationKey: bookingMutationKeys.create,
		mutationFn: createBooking,
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

export function useUpdateBooking(eventId: number, id: number) {
	const queryClient = useQueryClient();
	return useMutation({
		mutationKey: bookingMutationKeys.update,
		mutationFn: async (booking: BookingDto) => updateBooking(id, booking),
		async onSuccess(data) {
			await queriesToInvalidateOnCrud(queryClient, eventId, id, data);
		},
	});
}

export function useDeleteBooking(eventId: number) {
	const queryClient = useQueryClient();
	return useMutation({
		mutationKey: bookingMutationKeys.delete,
		mutationFn: deleteBooking,
		async onSuccess() {
			await queriesToInvalidateOnCrud(queryClient, eventId);
		},
	});
}

async function queriesToInvalidateOnCrud(
	queryClient: QueryClient,
	eventId: number,
	bookingId?: number,
	data?: BookingDto,
) {
	await invalidateAllQueriesOfEventFor(identifier, eventId, queryClient);

	if (data?.timeSlotId) {
		// If a booking for a certain timeslot changes, update the schedule page
		await queryClient.invalidateQueries({
			queryKey: timeSlotQueryKeys.detail(eventId, data.timeSlotId),
		});
	}
}
