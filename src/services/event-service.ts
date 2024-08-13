import axios from 'axios';
import {type EventDto} from '../models/api/event.model';
import {
	type baseObjectInputType,
	type baseObjectOutputType,
	type TypeOf,
	type ZodObject,
	type ZodString,
	type ZodTypeAny,
} from 'zod';

const baseUrl = import.meta.env.VITE_APP_BASE_URL as string;

export const getAllEvents = async (): Promise<EventDto[]> => {
	console.log(baseUrl);
	const response = await axios.get<EventDto[]>(`${baseUrl}/event`);
	return response.data;
};

export const getEventById = async (id: number, expand = ''): Promise<EventDto> => {
	const params = expand ? {expand} : {};
	const response = await axios.get<EventDto>(`${baseUrl}/event/${id}`, {params});
	return response.data;
};

export const createEvent = async (event: EventDto): Promise<EventDto> => {
	const response = await axios.post<EventDto>(`${baseUrl}/event`, event);
	return response.data;
};

export const deleteEvent = async (id: number): Promise<void> => {
	if (!id) return;
	await axios.delete(`${baseUrl}/event/${id}`);
};

export const updateEvent = async (
	id: number,
	event: EventDto,
): Promise<EventDto> => {
	const response = await axios.put<EventDto>(`${baseUrl}/event/${id}`, event);
	return response.data;
};
