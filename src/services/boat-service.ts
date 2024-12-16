import {type BoatDto} from '../models/api/boat.model';
import sortBy from 'lodash-es/sortBy';
import {getSortedTimeSlots} from './time-slot-service';
import axiosInstance from './axiosInstance';

export const getSortedBoats = (boats?: BoatDto[]) =>
	boats ? sortBy(boats, [b => b.name.toLowerCase(), 'availableFrom']).map(b => getBoatWithSortedProperties(b)) : [];

export const getBoatWithSortedProperties = (boat: BoatDto) => {
	boat.timeSlots = getSortedTimeSlots(boat.timeSlots);
	return boat;
};

export const getAllBoatsFromEvent = async (eventId: number): Promise<BoatDto[]> => {
	const response = await axiosInstance.get<BoatDto[]>('/boat?expand=timeSlots');
	const result = response.data.filter(
		(boat) => boat.eventId === eventId,
	);

	return getSortedBoats(result);
};

export const getBoatById = async (id: number): Promise<BoatDto> => {
	const response = await axiosInstance.get<BoatDto>(`/boat/${id}`);
	return response.data;
};

export const createBoat = async (boat: BoatDto): Promise<BoatDto> => {
	const response = await axiosInstance.post<BoatDto>('/boat', boat);
	return response.data;
};

export const updateBoat = async (
	id: number,
	boat: BoatDto,
): Promise<BoatDto> => {
	const response = await axiosInstance.put<BoatDto>(`/boat/${id}`, boat);
	return response.data;
};

export const deleteBoat = async (id: number): Promise<void> => {
	if (!id) return;
	await axiosInstance.delete(`/boat/${id}`);
};
