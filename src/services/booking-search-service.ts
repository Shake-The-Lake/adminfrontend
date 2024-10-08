import {
	type BookingSearchParams,
	type BookingSearchDto,
} from '../models/api/booking-search.model';
import {sortBy} from 'lodash-es';
import {cleanEmptyParams} from '../components/data-table/cleanEmptyParams';
import axiosInstance from './axiosInstance';

export const getDefaultSortedBoookings = (bookings?: BookingSearchDto[]) =>
	bookings
		? sortBy(bookings, [
			'timeSlot.fromTime',
			(b) => b.boat.name.toLowerCase(),
			(b) => b.person.lastName.toLowerCase(),
			(b) => b.person.firstName.toLowerCase(),
		])
		: [];

export const getBookingsByEventId = async (
	eventId: number,
): Promise<BookingSearchDto[]> => {
	const response = await axiosInstance.get<BookingSearchDto[]>(
		`/search/${eventId}`,
	);
	const result = response.data;

	return getDefaultSortedBoookings(result);
};

export const searchBookings = async (
	eventId: number,
	searchParams: BookingSearchParams,
): Promise<BookingSearchDto[]> => {
	const params = cleanEmptyParams(searchParams);
	const response = await axiosInstance.get<BookingSearchDto[]>(
		`/search/${eventId}`,
		{params},
	);
	const result = response.data;

	return getDefaultSortedBoookings(result);
};

export const deleteBooking = async (bookingId: number) => {
	if (!bookingId) return;
	await axiosInstance.delete(`/booking/${bookingId}`);
};
