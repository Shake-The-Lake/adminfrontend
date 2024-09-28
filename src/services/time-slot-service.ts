import {type TimeSlotDto} from '../models/api/time-slot.model';
import sortBy from 'lodash-es/sortBy';
import axiosInstance from './axiosInstance';
import {getPersonById} from './person-service';
import {getTranslation} from '../lib/utils';
import {getI18n} from 'react-i18next';

const timeSlotUrl = '/timeslot';

export const getSortedTimeSlotsFromArray = (
	timeSlot: TimeSlotDto[] | undefined,
) => {
	const i18n = getI18n();

	return timeSlot
		? sortBy(timeSlot, [
				'fromTime',
				'untilTime',
				(t) =>
					getTranslation(i18n.language, t.activityType?.name).toLowerCase(),
			])
		: [];
};

export const getSortedTimeSlots = (timeSlot: Set<TimeSlotDto> | undefined) => {
	return timeSlot
		? new Set<TimeSlotDto>(getSortedTimeSlotsFromArray(Array.from(timeSlot)))
		: new Set<TimeSlotDto>();
};

export const getAllTimeSlotsFromEvent = async (
	eventId: number,
): Promise<TimeSlotDto[]> => {
	const expand = 'boat,activityType';
	const params = {expand, eventId};
	const response = await axiosInstance.get<TimeSlotDto[]>(timeSlotUrl, {
		params,
	});
	const result = response.data;

	return getSortedTimeSlotsFromArray(result);
};

// Todo! refactor usage to use expanded event instead
export const getAllTimeSlotsFromBoat = async (
	eventId: number,
	boatId: number,
): Promise<TimeSlotDto[]> => {
	const response = await getAllTimeSlotsFromEvent(eventId);
	const result = response.filter((timeSlot) => timeSlot.boatId === boatId);

	return result;
};

export const getTimeSlotById = async (id: number): Promise<TimeSlotDto> => {
	const response = await axiosInstance.get<TimeSlotDto>(
		`${timeSlotUrl}/${id}?expand=activityType,boat,bookings`,
	);
	const timeSlot = response.data;
	if (response?.data?.bookings) {
		// We don't expect more than 10 bookings per time slot, therefore these calls are acceptable
		timeSlot.bookings = await Promise.all(
			response.data.bookings.map(async (booking) => {
				const person = await getPersonById(booking.personId);
				return {...booking, person};
			}),
		);
	}

	return response.data;
};

export const createTimeSlot = async (
	TimeSlot: TimeSlotDto,
): Promise<TimeSlotDto> => {
	const response = await axiosInstance.post<TimeSlotDto>(
		`${timeSlotUrl}`,
		TimeSlot,
	);
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
