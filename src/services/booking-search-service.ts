import axios from 'axios';
import {BookingSearchDto} from '../models/api/booking-search.model';

const baseUrl = import.meta.env.VITE_APP_BASE_URL as string;

export const getBookingsByEventId = async (
	eventId: number,
): Promise<BookingSearchDto[]> => {
	const response = await axios.get<BookingSearchDto[]>(
		`${baseUrl}/search/${eventId}`,
	);
	return response.data;
};

export const searchBookings = async (
	eventId: number,
	personName?: string,
	boatName?: string,
	from?: string,
	to?: string,
	activity?: number,
): Promise<BookingSearchDto[]> => {
	const params: Record<string, string | number | undefined> = {
		personName,
		boatName,
		from,
		to,
		activity,
	};

	Object.keys(params).forEach(
		(key) => params[key] === undefined && delete params[key],
	);

	const response = await axios.get<BookingSearchDto[]>(
		`${baseUrl}/search/${eventId}`,
		{
			params,
		},
	);
	return response.data;
};
