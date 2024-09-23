import axios from 'axios';
import {type BookingDto} from '../models/api/booking.model';
import axiosInstance from './axiosInstance';

export const createBooking = async (
	booking: BookingDto,
): Promise<BookingDto> => {
	const response = await axiosInstance.post<BookingDto>('/booking', booking);
	return response.data;
};

export const updateBooking = async (
	booking: BookingDto,
): Promise<BookingDto> => {
	const response = await axios.put<BookingDto>(`${baseUrl}/booking/${booking.id}`, booking);
	return response.data;
};
