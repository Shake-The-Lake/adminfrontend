import { type TimeSlotDto } from '../models/api/time-slot.model';
import sortBy from 'lodash-es/sortBy';
import axiosInstance from './axiosInstance';
import { getPersonById } from './person-service';


const timeSlotUrl = '/timeslot';

const timeSlotSortBy = ['fromTime', 'activityType.name.en'];

export const getSortedTimeSlots = (timeSlot: Set<TimeSlotDto> | undefined) =>
	timeSlot
		? new Set(sortBy(Array.from(timeSlot), timeSlotSortBy))
		: new Set<TimeSlotDto>();

export const getAllTimeSlotsFromEvent = async (
	eventId: number,
): Promise<TimeSlotDto[]> => {
	const expand = 'boat,activitytype';
	const params = { expand, eventId };
	const response = await axiosInstance.get<TimeSlotDto[]>(timeSlotUrl, { params });
	const result = response.data;

	return sortBy(result, timeSlotSortBy);
};

// Todo! refactor usage to use expanded event instead
export const getAllTimeSlotsFromBoat = async (
	boatId: number,
): Promise<TimeSlotDto[]> => {
	const response = await axiosInstance.get<TimeSlotDto[]>(timeSlotUrl);
	const result = response.data.filter((timeSlot) => timeSlot.boatId === boatId);

	return sortBy(result, timeSlotSortBy);
};

export const getTimeSlotById = async (id: number): Promise<TimeSlotDto> => {
	const response = await axiosInstance.get<TimeSlotDto>(`${timeSlotUrl}/${id}?expand=activityType,boat,bookings`);
	const timeSlot = response.data;
	if (response?.data?.bookings) {
		timeSlot.bookings = await Promise.all(response.data.bookings.map(async (booking) => {
			const person = await getPersonById(booking.personId);
			return { ...booking, person };
		}));
	}

	return response.data;
};

export const createTimeSlot = async (
	TimeSlot: TimeSlotDto,
): Promise<TimeSlotDto> => {
	const response = await axiosInstance.post<TimeSlotDto>(`${timeSlotUrl}`, TimeSlot);
	return response.data;
};

export const updateTimeSlot = async (
	id: number,
	timeSlot: TimeSlotDto,
): Promise<TimeSlotDto> => {
	const response = await axiosInstance.put<TimeSlotDto>(
		`${timeSlotUrl}/${id}`,
		timeSlot,
	);
	return response.data;
};

export const deleteTimeSlot = async (id: number): Promise<void> => {
	await axiosInstance.delete(`${timeSlotUrl}/${id}`);
};

