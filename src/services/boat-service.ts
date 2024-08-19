import axios from 'axios';
import {type BoatDto} from '../models/api/boat.model';
import sortBy from 'lodash-es/sortBy';
import {getSortedTimeSlots} from './time-slot-service';

const baseUrl = import.meta.env.VITE_APP_BASE_URL as string;

export const getSortedBoats = (boats?: BoatDto[]) =>
	boats ? sortBy(boats, ['name', 'availableFrom']) : [];

export const getBoatWithSortedProperties = (boat: BoatDto) => {
	boat.timeSlots = getSortedTimeSlots(boat.timeSlots);
	return boat;
};

// Todo! refactor usage to use expanded event instead
export const getAllBoatsFromEvent = async (eventId: number): Promise<BoatDto[]> => {
	const response = await axios.get<BoatDto[]>(`${baseUrl}/boat`);
	const result = response.data.filter(
		(boat) => boat.eventId === eventId,
	);


	return getSortedBoats(result);
};

export const getBoatById = async (id: number): Promise<BoatDto> => {
	const response = await axios.get<BoatDto>(`${baseUrl}/boat/${id}?expand=timeSlots`);
	return response.data;
};

export const createBoat = async (boat: BoatDto): Promise<BoatDto> => {
	const boatWithActivityType = {
		...boat,
		activityTypeId: 1,
	};
	const response = await axios.post<BoatDto>(`${baseUrl}/boat`, boatWithActivityType);
	return response.data;
};

export const updateBoat = async (
	id: number,
	boat: BoatDto,
): Promise<BoatDto> => {
	console.log('update boat', boat);
	const response = await axios.put<BoatDto>(`${baseUrl}/boat/${id}`, boat);
	return response.data;
};

export const deleteBoat = async (id: number): Promise<void> => {
	await axios.delete(`${baseUrl}/boat/${id}`);
};
