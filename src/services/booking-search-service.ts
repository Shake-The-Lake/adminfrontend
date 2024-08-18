import axios from 'axios';
import {type BookingSearchParams, type BookingSearchDto} from '../models/api/booking-search.model';
import {sortBy} from 'lodash-es';
import {cleanEmptyParams} from '../components/data-table/cleanEmptyParams';

const baseUrl = import.meta.env.VITE_APP_BASE_URL as string;

export const getDefaultSortedBoookings = (bookings?: BookingSearchDto[]) =>
	bookings ? sortBy(bookings, ['timeSlot.fromTime', 'boat.name', 'person.lastName', 'person.firstName']) : [];

export const getBookingsByEventId = async (
	eventId: number,
): Promise<BookingSearchDto[]> => {
	const response = await axios.get<BookingSearchDto[]>(
		`${baseUrl}/search/${eventId}`,
	);
	const result = response.data;
	
	return getDefaultSortedBoookings(result);
};

export const searchBookings = async (
	eventId: number,
	searchParams: BookingSearchParams,
): Promise<BookingSearchDto[]> => {
	const params = cleanEmptyParams({... searchParams,
	});
	const response = await axios.get<BookingSearchDto[]>(
		`${baseUrl}/search/${eventId}`, {params},
	);
	const result = response.data;
	
	return getDefaultSortedBoookings(result);
};
