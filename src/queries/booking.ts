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

export const bookingKeys = {
	all: (eventId: number) => ['bookings', eventId] as QueryKey,
	search: (eventId: number, params: BookingSearchParams) =>
		['bookings', eventId, 'search', params] as QueryKey,
	detail: (id: number, expanded: boolean) =>
		['bookings', 'detail', id, expanded] as QueryKey,
};

export const bookingsOptions = (eventId: number) =>
	queryOptions({
		queryKey: bookingKeys.all(eventId),
		queryFn: async () => getBookingsByEventId(eventId),
	});

export const bookingsSearchOptions = (
	eventId: number,
	params: BookingSearchParams,
	queryClient: QueryClient,
) =>
	queryOptions({
		queryKey: bookingKeys.search(eventId, params),
		queryFn: async () => searchBookings(eventId, params),
		initialData() {
			return queryClient.getQueryData(bookingKeys.all(eventId));
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
		mutationFn: createBooking,
		async onSuccess() {			
			await queryClient.invalidateQueries({queryKey: bookingKeys.all(eventId)}); // Not exact to catch search as well
		},
		onError(error) {
			console.error('Error creating booking:', error);
		},
	});
}

export function useUpdateBooking(id: number, eventId: number) {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (booking: BookingDto) => updateBooking(id, booking),
		async onSuccess() {
			await queryClient.invalidateQueries({queryKey: bookingKeys.all(eventId)}); // Not exact to catch search as well
			await queryClient.invalidateQueries({queryKey: bookingKeys.detail(id, true), exact: true});
			await queryClient.invalidateQueries({queryKey: bookingKeys.detail(id, false), exact: true});
		},
	});
}

export function useDeleteBooking(eventId: number) {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: deleteBooking,
		async onSuccess() {
			await queryClient.invalidateQueries({queryKey: bookingKeys.all(eventId)}); // Not exact to catch search as well
		},
	});
}
