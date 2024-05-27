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

export const getEventById = async (id: number): Promise<EventDto> => {
	const response = await axios.get<EventDto>(`${baseUrl}/event/${id}`);
	return response.data;
};

export const createEvent = async (event: EventDto): Promise<EventDto> => {
	const response = await axios.post<EventDto>(`${baseUrl}/event`, event);
	return response.data;
};

export const deleteEvent = async (id?: number): Promise<void> => {
	if (!id) return;
	await axios.delete(`${baseUrl}/event/${id}`);
};

export const updateEvent = async (
	id: number,
	event: TypeOf<
	ZodObject<
	{
		date: ZodString;
		customerOnlyTime: ZodString;
		description: ZodString;
		startedAt: ZodString;
		location: ZodString;
		title: ZodString;
	},
	'strip',
	ZodTypeAny,
	{
		[k in keyof objectUtil.addQuestionMarks<
		baseObjectOutputType<{
			date: ZodString;
			customerOnlyTime: ZodString;
			description: ZodString;
			startedAt: ZodString;
			location: ZodString;
			title: ZodString;
		}>,
		any
		>]: objectUtil.addQuestionMarks<
		baseObjectOutputType<{
			date: ZodString;
			customerOnlyTime: ZodString;
			description: ZodString;
			startedAt: ZodString;
			location: ZodString;
			title: ZodString;
		}>,
		any
		>[k];
	},
	{
		[k_1 in keyof baseObjectInputType<{
			date: ZodString;
			customerOnlyTime: ZodString;
			description: ZodString;
			startedAt: ZodString;
			location: ZodString;
			title: ZodString;
		}>]: baseObjectInputType<{
			date: ZodString;
			customerOnlyTime: ZodString;
			description: ZodString;
			startedAt: ZodString;
			location: ZodString;
			title: ZodString;
		}>[k_1];
	}
	>
	>,
): Promise<EventDto> => {
	const response = await axios.put<EventDto>(`${baseUrl}/event/${id}`, event);
	return response.data;
};
