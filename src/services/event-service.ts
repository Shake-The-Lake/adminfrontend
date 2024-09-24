import {type EventDto} from '../models/api/event.model';
import sortBy from 'lodash-es/sortBy';
import {getSortedActivityTypes} from './activity-type-service';
import {getBoatWithSortedProperties, getSortedBoats} from './boat-service';
import axiosInstance from './axiosInstance';

export const getEventWithSortedProperties = (event: EventDto) => {
	event.activityTypes = getSortedActivityTypes(event.activityTypes);
	event.boats = getSortedBoats(event.boats).map(getBoatWithSortedProperties);

	return event;
};

export const getAllEvents = async (): Promise<EventDto[]> => {
	const response = await axiosInstance.get<EventDto[]>('/event');
	const result = response.data?.map(e => getEventWithSortedProperties(e)) ?? [];

	return sortBy(result, 'date');
};

export const getEventById = async (
	id: number,
	expand = '',
): Promise<EventDto> => {
	const params = expand ? {expand} : {};
	const response = await axiosInstance.get<EventDto>(`/event/${id}`, {params});
	return getEventWithSortedProperties(response.data);
};

export const createEvent = async (event: EventDto): Promise<EventDto> => {
	const response = await axiosInstance.post<EventDto>('/event', event);
	return getEventWithSortedProperties(response.data);
};

export const deleteEvent = async (id: number): Promise<void> => {
	if (!id) return;
	await axiosInstance.delete(`/event/${id}`);
};

export const updateEvent = async (
	id: number,
	event: EventDto,
): Promise<EventDto> => {
	const response = await axiosInstance.put<EventDto>(`/event/${id}`, event);
	return getEventWithSortedProperties(response.data);
};
