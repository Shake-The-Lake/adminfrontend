import axios from 'axios';
import {type TimeSlotDto} from '../models/api/time-slot.model';
import sortBy from 'lodash-es/sortBy';

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const baseUrl = import.meta.env.VITE_APP_BASE_URL;
const timeSlotUrl = `${baseUrl}/timeslot`;

const timeSlotSortBy = ['fromTime', 'activityType.name.en'];

export const getSortedTimeSlots = (timeSlot: Set<TimeSlotDto> | undefined) =>
	timeSlot
		? new Set(sortBy(Array.from(timeSlot), timeSlotSortBy))
		: new Set<TimeSlotDto>();

// Todo! actually make filterable by event once implemented in backend
export const getAllTimeSlotsFromEvent = async (
	eventId?: number,
): Promise<TimeSlotDto[]> => {
	const expand = 'boat,activityType';
	const params = {expand};
	const response = await axios.get<TimeSlotDto[]>(timeSlotUrl, {params});
	const result = response.data.filter(
		(timeSlot) =>
			timeSlot.activityType?.eventId === eventId ||
			timeSlot.boat?.eventId === eventId,
	);

	return sortBy(result, timeSlotSortBy);
};

// Todo! refactor usage to use expanded event instead
export const getAllTimeSlotsFromBoat = async (
	boatId: number,
): Promise<TimeSlotDto[]> => {
	const response = await axios.get<TimeSlotDto[]>(timeSlotUrl);
	const result = response.data.filter((timeSlot) => timeSlot.boatId === boatId);

	return sortBy(result, timeSlotSortBy);
};

export const getTimeSlotById = async (id: number): Promise<TimeSlotDto> => {
	const response = await axios.get<TimeSlotDto>(`${timeSlotUrl}/${id}`);
	return response.data;
};

export const createTimeSlot = async (
	TimeSlot: TimeSlotDto,
): Promise<TimeSlotDto> => {
	const response = await axios.post<TimeSlotDto>(`${timeSlotUrl}`, TimeSlot);
	return response.data;
};

export const updateTimeSlot = async (
	id: number,
	timeSlot: TimeSlotDto,
): Promise<TimeSlotDto> => {
	const response = await axios.put<TimeSlotDto>(
		`${timeSlotUrl}/${id}`,
		timeSlot,
	);
	return response.data;
};

export const deleteTimeSlot = async (id: number): Promise<void> => {
	await axios.delete(`${timeSlotUrl}/${id}`);
};
