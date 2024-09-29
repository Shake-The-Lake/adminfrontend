import {type BookingDto} from '../models/api/booking.model';
import axiosInstance from './axiosInstance';

export const createBooking = async (
	booking: BookingDto,
): Promise<BookingDto> => {
	const response = await axiosInstance.post<BookingDto>('/booking', booking);
	return response.data;
};

export const getBookingById = async (id: number): Promise<BookingDto> => {
	const response = await axiosInstance.get<BookingDto>(`/booking/${id}`);
	return response.data;
};

export const updateBooking = async (
	bookingId: number,
	updatedBooking: BookingDto,
): Promise<BookingDto> => {
	const response = await axiosInstance.put<BookingDto>(
		`/booking/${bookingId}`,
		updatedBooking,
	);
	return response.data;
};
