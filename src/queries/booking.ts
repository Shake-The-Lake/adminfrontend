import {type BookingSearchParams} from '../models/api/booking-search.model';
import {
	type QueryClient,
	queryOptions,
	useQuery,
	useQueryClient,
	type QueryKey,
} from '@tanstack/react-query';
import {getBookingsByEventId, searchBookings} from '../services/booking-search-service';

export const keys = {
	all: (eventId: number) => ['bookings', eventId] as QueryKey,
	search: (eventId: number, params: BookingSearchParams) => ['bookings', 'search', eventId, params] as QueryKey,
};

export const bookingsOptions = (eventId: number) => queryOptions({
	queryKey: keys.all(eventId),
	queryFn: async () => getBookingsByEventId(eventId),
});

export const bookingsSearchOptions = (eventId: number, params: BookingSearchParams, queryClient: QueryClient) => queryOptions({
	queryKey: keys.search(eventId, params),
	queryFn: async () => searchBookings(eventId, params),
	initialData() {
		return queryClient.getQueryData(keys.all(eventId));
	},
});

export function useGetBookings(eventId: number) {
	return useQuery(bookingsOptions(eventId));
}

export function useSearchBookings(eventId: number, params: BookingSearchParams) {
	const queryClient = useQueryClient();
	return useQuery(bookingsSearchOptions(eventId, params, queryClient));
}