import axios from 'axios';
import {type EventDto} from '../models/api/event.model';

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const baseUrl = import.meta.env.VITE_APP_BASE_URL;

export const getAllEvents = async (): Promise<EventDto[]> => {
	const response = await axios.get<EventDto[]>(`${baseUrl}/event`);
	return response.data;
};

export const getEventById = async (id: number): Promise<EventDto> => {
	const response = await axios.get<EventDto>(`${baseUrl}/event/${id}`);
	return response.data;
};

export const createEvent = async (event: EventDto): Promise<EventDto> => {
	const response = await axios.post<EventDto>(`${baseUrl}/event`, event);
	return response.data;
};

export const deleteEvent = async (id: number): Promise<void> => {
	await axios.delete(`${baseUrl}/event/${id}`);
};
