import axios from 'axios';
import {type TimeSlotDto} from '../models/api/time-slot.model';

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const baseUrl = import.meta.env.VITE_APP_BASE_URL;
const timeSlotUrl = `${baseUrl}/timeslot`;

export const getAllTimeSlots = async (boatId?: string): Promise<TimeSlotDto[]> => {
	const response = await axios.get<TimeSlotDto[]>(
		`${timeSlotUrl}`,
	);
	return response.data;
};

export const getTimeSlotById = async (
	id: number,
): Promise<TimeSlotDto> => {
	const response = await axios.get<TimeSlotDto>(
		`${timeSlotUrl}/${id}`,
	);
	return response.data;
};

export const createTimeSlot = async (
	TimeSlot: TimeSlotDto,
): Promise<TimeSlotDto> => {
	const response = await axios.post<TimeSlotDto>(
		`${timeSlotUrl}`,
		TimeSlot,
	);
	return response.data;
};

export const updateTimeSlot = async (
	id: string,
	TimeSlot: TimeSlotDto,
): Promise<TimeSlotDto> => {
	const response = await axios.put<TimeSlotDto>(
		`${timeSlotUrl}/${id}`,
		TimeSlot,
	);
	return response.data;
};

export const deleteTimeSlot = async (id: number): Promise<void> => {
	await axios.delete(`${timeSlotUrl}/${id}`);
};
