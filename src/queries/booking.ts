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
import {createBooking, updateBooking} from '../services/booking-service';
import {type BookingDto} from '../models/api/booking.model';
import {eventBasedBaseQueryKey} from './event';
import {mutationKeyGenerator} from '../lib/utils';

const identifier = 'bookings';

const baseQueryKey = (eventId: number) =>
	[...eventBasedBaseQueryKey(eventId), identifier] as QueryKey;

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

export function useCreateBooking(eventId: number) {
	const queryClient = useQueryClient();
	return useMutation({
		mutationKey: bookingMutationKeys.create,
		mutationFn: createBooking,
		async onSuccess() {
			await queriesToInvalidateOnCrud(queryClient, eventId);
		},
		onError(error) {
			console.error('Error creating booking:', error);
		},
	});
}

export function useUpdateBooking(id: number, eventId: number) {
	const queryClient = useQueryClient();
	return useMutation({
		mutationKey: bookingMutationKeys.update,
		mutationFn: async (booking: BookingDto) => updateBooking(id, booking),
		async onSuccess() {
			await queriesToInvalidateOnCrud(queryClient, eventId);
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

// Todo! also invalidate timeslot query that is needed for schedule stuff
async function queriesToInvalidateOnCrud(
	queryClient: QueryClient,
	eventId: number,
	bookingId?: number,
) {
	await queryClient.invalidateQueries({queryKey: baseQueryKey(eventId)}); // Not exact to catch others as well
}
