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
	getBookingsByEventId,
	searchBookings,
} from '../services/booking-search-service';
import {createBooking} from '../services/booking-service';
import {BookingDto} from '../models/api/booking.model';

export const keys = {
	all: (eventId: number) => ['bookings', eventId] as QueryKey,
	search: (eventId: number, params: BookingSearchParams) =>
		['bookings', 'search', eventId, params] as QueryKey,
	detail: (id: number, expanded: boolean) =>
		['bookings', 'detail', id, expanded] as QueryKey,
};

export const bookingsOptions = (eventId: number) =>
	queryOptions({
		queryKey: keys.all(eventId),
		queryFn: async () => getBookingsByEventId(eventId),
	});

export const bookingsSearchOptions = (
	eventId: number,
	params: BookingSearchParams,
	queryClient: QueryClient,
) =>
	queryOptions({
		queryKey: keys.search(eventId, params),
		queryFn: async () => searchBookings(eventId, params),
		initialData() {
			return queryClient.getQueryData(keys.all(eventId));
		},
	});

export function useCreateBooking(eventId: number) {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: createBooking,
		onSuccess: (data) => {
			queryClient.setQueryData(
				['bookings', eventId],
				(oldData: BookingDto[] | undefined) =>
					oldData ? [...oldData, data] : [data],
			);
		},
		onError: (error) => {
			console.error('Error creating booking:', error);
		},
	});
}

export function useGetBookings(eventId: number) {
	return useQuery(bookingsOptions(eventId));
}

export function useSearchBookings(
	eventId: number,
	params: BookingSearchParams,
) {
	const queryClient = useQueryClient();
	return useQuery(bookingsSearchOptions(eventId, params, queryClient));
}
