import axios from 'axios';
import {type BookingDto} from '../models/api/booking.model';

const baseUrl = import.meta.env.VITE_APP_BASE_URL as string;

export const createBooking = async (
	booking: BookingDto,
): Promise<BookingDto> => {
	const response = await axios.post<BookingDto>(`${baseUrl}/booking`, booking);
	return response.data;
};

export const updateBooking = async (
	booking: BookingDto,
): Promise<BookingDto> => {
	const response = await axios.put<BookingDto>(`${baseUrl}/booking/${booking.id}`, booking);
	return response.data;
};
