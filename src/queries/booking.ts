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
import {createBooking} from '../services/booking-service';
import {type BookingDto} from '../models/api/booking.model';

export const bookingKeys = {
	all: (eventId: number) => ['bookings', eventId] as QueryKey,
	search: (eventId: number, params: BookingSearchParams) =>
		['bookings', 'search', eventId, params] as QueryKey,
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

export function useDeleteBooking(eventId: number) {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: deleteBooking,
		async onSuccess() {
			await queryClient.invalidateQueries({
				queryKey: bookingKeys.all(eventId),
				exact: true,
			});
		},
	});
}

export function useCreateBooking(eventId: number) {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (bookingData: BookingDto) => createBooking(bookingData),
		async onSuccess(data) {
			if (data) {
				queryClient.setQueryData(
					bookingKeys.all(eventId),
					(oldData: BookingDto[] | undefined) =>
						oldData ? [...oldData, data] : [data],
				);
			}
			await queryClient.invalidateQueries({
				queryKey: bookingKeys.all(eventId),
				exact: true,
			});
			await queryClient.invalidateQueries({
				queryKey: bookingKeys.detail(eventId, true),
				exact: true,
			});
			await queryClient.invalidateQueries({
				queryKey: bookingKeys.search(eventId, {}),
				exact: true,
			});
		},
		onError(error) {
			console.error('Error creating booking:', error);
		},
	});
}
